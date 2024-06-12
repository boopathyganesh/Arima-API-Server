const express = require('express')
const router = express.Router()
module.exports = router;

const auth = require('../../middleware/auth');
const Cart = require('../../models/customer/cart');
var ObjectId = require('mongodb').ObjectId;

const CartController = require("../../controllers/customer/cart");

router.post('/', auth, CartController.addCart);

router.get('/', auth, CartController.getCart);

router.get('/count', auth, CartController.getAllCartCount);
    
router.get('/all', auth, CartController.getCheckoutData);

router.delete('/:id', auth, CartController.deleteCart);


router.put("/:id", (req, res) => {
    try {
        Cart.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if (err) {
                return res.status(200).send({ status: "false", message: "Error", errors: err })
            };
            res.status(200).send({ status: "true", message: 'Cart Updated', data: user })
        });
    } catch (e) {
        console.error(e);
        res.status(200).send({ status: "false", message: 'Server Error' })
    }
});

// router.delete('/:id', auth, async (req, res) => {
//     Cart.findByIdAndRemove(req.params.id, req.body, (err, user) => {
//         if (err) {
//             return res.status(200).send({ status: "false", message: "Error", errors: err })
//         };
//         res.status(200).send({ status: "true", message: 'Cart Deleted', data: user })
//     });
// })

router.delete('/all/:id', auth, async (req, res) => {
    Cart.deleteMany({ user: ObjectId(req.user.id) }, (err, user) => {
        if (err) {
            return res.status(200).send({ status: "false", message: "Error", errors: err })
        };
        res.status(200).send({ status: "true", message: 'Cart Deleted', data: user })
    });
})

