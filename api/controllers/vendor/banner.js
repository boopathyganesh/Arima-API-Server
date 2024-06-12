const Banner = require('../../models/customer/banner');
const { filedetails } = require("../../helpers/multer");
const fs = require('fs');

exports.addBanner = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('banner_image', req.file);
            const CustomerBannerData = new Banner({
                ...req.body,
                bannerImage: datalist.filepath
            });
            await CustomerBannerData.save();
            return res.status(200).send({ status: true, data: CustomerBannerData, message: 'Customer Banner Created.' });
        }
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.getAllBanners = async (req, res) => {
    try {
        const banner = await Banner.find();
        res.status(200).send({ status: "true", message: 'All Customer Banners', data: banner })
    } catch (err) {
        res.status(200).send({ status: "false", message: 'Error in Solving', data: err })
    }
};

exports.updateBanner = async (req, res) => {
    const bannerId = req.params.id;
    try {
        if (req.file) {
            // Assuming filedetails returns a string file path
            const datalist = filedetails('banner_image', req.file);

            // Fetch the existing banner to get the previous image path
            Banner.findById(bannerId)
                .then((existingBanner) => {
                    if (!existingBanner) {
                        return res.status(404).send({ status: false, message: 'Banner not found' });
                    }

                    // Delete the previous image file
                    if (existingBanner.bannerImage) {
                        const filePath = './api/uploads/' + existingBanner.bannerImage;
                  
                        fs.unlink(filePath, (unlinkError) => {
                          if (unlinkError) {
                            console.error('Error deleting previous image:', unlinkError);
                          }
                        });
                      }
                    // Update the banner with the new image path
                    const CustomerBannerData = {
                        ...req.body,
                        bannerImage: datalist.filepath
                    };

                    // Exclude immutable field from update
                    delete CustomerBannerData._id;

                    // Perform the update
                    Banner.findByIdAndUpdate(bannerId, { $set: CustomerBannerData }, { new: true })
                        .then((banner) => {
                            if (!banner) {
                                return res.status(404).send({ status: false, message: 'Banner not found' });
                            }
                            res.status(200).send({ status: true, message: 'Banner Updated', data: banner });
                        })
                        .catch((err) => {
                            res.status(500).send({ status: false, message: 'Error', errors: err });
                        });
                })
                .catch((error) => {
                    res.status(500).send({ status: false, message: 'Error', errors: error });
                });
        } else {
            // Update without a new image
            Banner.findByIdAndUpdate(bannerId, { $set: req.body }, { new: true })
                .then((banner) => {
                    if (!banner) {
                        return res.status(404).send({ status: false, message: 'Banner not found' });
                    }
                    res.status(200).send({ status: true, message: 'Banner Updated', data: banner });
                })
                .catch((err) => {
                    res.status(500).send({ status: false, message: 'Error', errors: err });
                });
        }


    } catch (e) {
        console.log('errr', e);
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};