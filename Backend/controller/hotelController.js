const express = require('express');
const hotelSchema = require('../model/hotelModel');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
const nodemailer = require("nodemailer");
//const checkAuth = require("../Middleware/check-auth");


router.use(bodyParser.urlencoded({ extended: false }));

router.post('/post', (req, res, next) => {
    var newHotel = new hotelSchema({
        
        title: req.body.title,
        singleRoom: req.body.singleRoom,
        doubleRoom: req.body.doubleRoom,
        image: req.body.image,

        city: req.body.city
    });

    newHotel.save().then(addedHotel => {
        res.status(201).json({
            message: "Places successfully added",
            postId: addedHotel._id,


        })
    })

    console.log("Hotel added");


});

router.get('/getHotel', (req, res, next) => {
    console.log("inside backend of getHotel");
    hotelSchema.aggregate([{
        $group: {
            _id: { city: "$city" },
            HotelSchema: {
                $push: "$$ROOT"
            }
        }
    }], function(err, result) {
        console.log(result)
        res.status(200).json({
            error: err,
            result: result
        })

    })
})



router.get("/getHotelDetails/:id", (req, res, next) => {

    hotelSchema.findById(req.params.id).then(hotel => {
        if (hotel) {
            console.log("amita amita amita:", hotel);
            res.status(200).json({
                message: "Hotel found successfully",
                hotel: hotel
            });
            console.log("yupppppp", hotel);
        } else {
            res.status(404).json({ message: " not found!" });
        }
    });
});

router.post('/mail', (req, res, next) => {


    console.log("inside mail", req.body.mail)
    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'Gmail',

        auth: {
            user: 'travelbuzz.nation@gmail.com', // generated ethereal user
            pass: 'qwerty@123' // generated ethereal password
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: 'travelbuzz.nation@gmail.com', // sender address
        to: req.body.mail, // list of receivers
        subject: "Confirmation mail", // Subject line
        text: "Your order has been successfully placed.Thank You for shopping with us", // plain text body
        // html: "<b>Hello world?</b>" // html body
    }, (err, res) => {
        if (err) {
            console.log("Mail ERROR", err);
        } else {
            console.log("Here is the response of mail", res);
        }
    });

    res.status(201).json({
        message: "Mail successfully sent",


    })

})
module.exports = router;
