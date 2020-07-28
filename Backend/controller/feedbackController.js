const express = require('express');
const feedbackSchema = require('../model/feedbackModel');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
//const checkAuth = require("../Middleware/check-auth");

router.use(bodyParser.urlencoded({ extended: false }));
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/products');


router.post('/post', (req, res, next) => {
    var newfeedback = new feedbackSchema({
        id: req.body.id,
        
        
        description: req.body.description,
       
    });

    newfeedback.save().then(addedProduct => {
        res.status(201).json({
            message: "feedback successfully added",
            postId: addedProduct._id,


        })
    })


});

router.get('/getfeedback', (req, res, next) => {

    feedbackSchema.aggregate([{
        $group: {
            _id: { id: "$id" },
            feedbackSchema: {
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

    // productSchema.find().then(responseData => {
    //     res.status(200).json({
    //         message: "Products fetched successfully",
    //         products: responseData
    //     })
    // })
})

router.get("/getfeedbackDetails/:id", (req, res, next) => {

    feedbackSchema.findById(req.params.id).then(feedback => {
        if (feedback) {
            res.status(200).json({
                message: "feedback found successfully",
                feedback: feedback
            });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});



module.exports = router;