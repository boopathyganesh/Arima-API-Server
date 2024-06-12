const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


//app.use('/uploads', express.static('uploads'));

const server = app.listen(8014, (req, res) => {
    console.log('Api started at 8014');
});

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Socket Connected.');
    socket.on('disconnect', function () {
        console.log('Socket Disconnected.');
    });
});

app.get("/api", (req, res) => {
    res.send("Welcome the New Arimas API's .")
});

//Start Monogdb Server
const InitiateMongoServer = require('../config/db')
InitiateMongoServer();

//************************************API ENDPOINT STARTS *******************************************//


//Admin API's
const AdminRoutes = require("../api/routes/admin/index");

//Admin API's
const CommonController = require("../api/routes/common/otp");


//Masters API's
const ProductCategoryController = require("../api/routes/master/productCategory");
const MainBannerController = require("../api/routes/master/mainBanner");
const ShopBannerController = require("../api/routes/master/shopBanner");

//Vendors/Shop API's
const VendorRoutes = require("../api/routes/vendor/index");

//Website API's
const CustomerRoutes = require("../api/routes/customer/index");
const ProductController = require("../api/routes/vendor/product");
const ContactUsController = require("../api/routes/customer/contactUs");

const OrdersController = require("../api/routes/customer/order");


//Admin API's
app.use('/api/admin', AdminRoutes);

//Admin API's
app.use('/api/common', CommonController);

//Masters API's
app.use('/api/product_category', ProductCategoryController);

app.use('/api/main_banner', MainBannerController);

app.use('/api/shop_banner', ShopBannerController);

//Vendors/Shop API's
app.use('/api/vendor', VendorRoutes);

//Website API's
app.use('/api/customer', CustomerRoutes);
app.use('/api/orders', OrdersController);

app.use('/api/products', ProductController);
app.use('/api/contact-us', ContactUsController);

//Image Serve By
//Boopathy Ganesh @Alpha Solutions
app.use('/uploads', express.static(path.join(__dirname, 'api', 'uploads')));
app.get('/uploads/:folder/:subfolder/:filename', (req, res) => {
    const { folder, subfolder, filename } = req.params;
    console.log("folder:",folder,"subfolder:",subfolder,"filename:",filename)
    const filePath = path.join(__dirname, 'uploads', folder, subfolder, filename);
    res.sendFile(filePath, err => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  });