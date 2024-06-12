const Product = require("../../models/vendor/product");
const Wishlist = require("../../models/customer/wishlist");
const Vendor = require("../../models/vendor/addShop");
const mongoose = require('mongoose'); // Import mongoose
const Review = require("../../models/customer/review");

// PRODUCTS FILTER

// exports.productsFilterByOptions = async (req, res) => {
//   const { price, brand, discount, type } = req.query;

//   const filter = {};
//   if (price && type === 'less') {
//     filter.selling_price = { $lt: parseInt(price) }
//   } else if (price && type === 'greater') {
//     filter.selling_price = { $gt: parseInt(price) }
//   }
//   console.log('filter', filter);
//   const products = await Product.find(filter).exec();

//   // console.log('products', products);

//   // let filteredProducts = products;

//   // if (price) {
//   //     filteredProducts = filteredProducts.filter(product => product.selling_price >= parseInt(price));
//   // }
//   res.status(200).send({ status: true, length: products.length, data: products, message: 'Fiter Products' })
// };

exports.productsFilterByOptions = async (req, res) => {
  try {
    const { price, brand, discount, type,sort = 'selling_price',limit = 10, page = 1, } = req.query;  //limit = 10, page = 1, 
 
    // Initialize the filter object
    const filter = {};

    // Add price filter based on type
    if (price) {
      const parsedPrice = parseInt(price);
      if (type === 'less') {
        filter.selling_price = { $lt: parsedPrice };
      } else if (type === 'greater') {
        filter.selling_price = { $gt: parsedPrice };
      } else {
        return res.status(400).send({ status: false, message: 'Invalid type parameter. Use "less" or "greater".' });
      }
    }

    // Add brand filter
    if (brand) {
      filter.brand = brand;
    }

    // Add discount filter
    if (discount) {
      filter.discount = { $gt: parseFloat(discount) }; // Assuming discount is a minimum percentage
    }

    // Pagination
    const limitValue = parseInt(limit);
    const skipValue = (parseInt(page) - 1) * limitValue;
    // Fetch products from the database with the constructed filter
    const products = await Product.find(filter)
      //.limit(limitValue)
      //.skip(skipValue)
      //.sort(sort)
      .exec();

    // Send the response
    res.status(200).send({ status: true, length: products.length, data: products, message: 'Filtered Products' });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send({ status: false, message: 'An error occurred while fetching products.' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, origin, brand, minRating, inStock, sort = 'selling_price', limit = 10, page = 1 } = req.query;

    // Initialize the filter object
    const filter = {};

    // Add search filters
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (origin) {
      filter.origin = { $regex: origin, $options: 'i' };
    }

    if (minPrice) {
      filter.selling_price = { ...filter.selling_price, $gte: parseInt(minPrice) };
    }

    if (maxPrice) {
      filter.selling_price = { ...filter.selling_price, $lte: parseInt(maxPrice) };
    }

    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }

    if (minRating) {
      filter.rating = { $gte: parseInt(minRating) };
    }

    if (inStock !== undefined) {
      filter.inStock = inStock === 'true';
    }

    // Pagination
    const limitValue = parseInt(limit);
    const skipValue = (parseInt(page) - 1) * limitValue;

    // Fetch products from the database with the constructed filter
    const products = await Product.find(filter)
      .limit(limitValue)
      .skip(skipValue)
      .sort(sort)
      .exec();

    // Send the response
    res.status(200).send({ status: true, length: products.length, data: products, message: 'Searched Products' });
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).send({ status: false, message: 'An error occurred while searching for products.' });
  }
};


exports.allProductsWithWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const shopId = req.params.id;
    const { product_status, price, type, discount, search } = req.query;

    // Define the initial filter based on product_status
    const filter = { product_status: product_status, status: 1 };

    // Apply additional filters based on price and type
    if (price && type === 'less') {
      filter.selling_price = { $lt: parseInt(price) };
    } else if (price && type === 'greater') {
      filter.selling_price = { $gt: parseInt(price) };
    }

    // Apply discount range filter if discount is defined
    if (discount !== undefined) {
      const [minDiscount, maxDiscount] = discount.split('-').map(parseFloat);

      if (!isNaN(minDiscount) && !isNaN(maxDiscount)) {
        filter.discount_perc = { $gte: minDiscount, $lte: maxDiscount };
      }
    }

    const allReviews = await Review.find().populate('user', 'userName email');

    // Group reviews by productId
    const reviewMap = new Map();
    allReviews.forEach(review => {
      const productIdString = review?.product?.toString();
      if (!reviewMap.has(productIdString)) {
        reviewMap.set(productIdString, []);
      }
      reviewMap.get(productIdString).push(review);
    })


    // Fetch wishlist items for the user
    const wishlistItems = await Wishlist.find({ user: userId });

    // Fetch products based on the constructed filter and search query
    let products;
    if (search) {
      const regexQuery = new RegExp(search, 'i');
      products = await Product.find({
        $and: [
          filter,
          {
            $or: [
              { name: { $regex: regexQuery } },
              { description: { $regex: regexQuery } }
            ]
          }
        ]
      }).limit(10).exec();
    } else {
      products = await Product.find(filter).limit(10).exec();
    }

    // Create a Set of wishlist item IDs for quick lookups
    const wishlistItemIds = new Set(wishlistItems.map(item => item.product.toString()));

    // Map products to include complete review details for products in the reviewItems array
    const productsWithReviews = products.map(product => {
      const productIdString = product._id.toString();

      return {
        ...product.toObject(),
        isInWishlist: wishlistItemIds.has(productIdString),
        reviews: reviewMap.get(productIdString) || [],
      };
    });

    // Fetch additional information about the shop if shopId is provided
    let shopData = null;
    if (mongoose.Types.ObjectId.isValid(shopId)) {
      shopData = await Vendor.findOne({ _id: shopId });
    }

    res.status(200).send({
      status: true,
      message: 'Products with Wishlist retrieved',
      data: productsWithReviews,
      shopData: shopData
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: false, message: 'Server Error' });
  }
};