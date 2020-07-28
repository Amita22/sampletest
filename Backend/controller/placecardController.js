const express = require('express');
const placeSchema = require('../model/placeModel');
const userSchema = require('../model/userModel');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
const mongoDB = require('mongodb')
const checkAuth = require("../Middleware/check-auth");

router.use(bodyParser.urlencoded({ extended: false }));


// router.get('/getPlaceCard/:preference', (req, res, next) => {
//     console.log("inside backend of getProduct");
//     placeSchema.aggregate([{
//         $group: {
//             _id: { placeType: preference },
//             PlaceSchema: {
//                 $push: "$$ROOT"
//             }
//         }
//     }], function(err, result) {
//         console.log(result)
//         res.status(200).json({
//             error: err,
//             result: result
//         })
//         console.log("result is: ", result);

//     })
// })

// router.get('/getPlaceCard/:id', (req, res, next) => {
//     console.log("inside get place card")
//    placeSchema.findById(req.params.id).then(place => {
//     if(place){
//         placeSchema.aggregate([{
//             $group: {
//                 _id: { title: "$title" },
//                 PlaceSchema: {
//                     $push: "$$ROOT"
//                 }
//             }
//         }], function(err, result) {
//             console.log(result)
//             res.status(200).json({
//                 error: err,
//                 result: result
//             })
    
//         })
//     }
//    })
// })


router.get('/getPlaceCardPreference/:id',(req, res, next) => {
    console.log("id: ", req.params.id);
    //var id = new ObjectId(req.params.id);
    const id = req.params.id;
    //const ObjectId  = require('mongodb').ObjectID;
    var o_id = new mongoDB.ObjectID(id);
    console.log("o_id" ,o_id);
    userSchema.findOne( {_id: o_id}).then(preferencefound => {
        if(!preferencefound){
            return res.status(404).end();
        }
        console.log(preferencefound);
        return res.status(200).json({
            message: "Prefence found",
            place: preferencefound
        });
        
    }).catch(err => console.log(err));
})


router.get("/getPlaceCard/:preference",(req, res, next)=>{
    const preference = req.params.preference;

    console.log("preference is: ", preference);
    // placeSchema.prototype.findByValueOfObject = function(placeType, value) {
    //     return this.filter(function(place) {
    //         console.log("palce acrd found is:", place);
    //         return (place[place]===value);

    //     })
    // }

    // var objFound = placeSchema.find(obj => obj.placeType === preference);
    // console.log("places are:", objFound);
    var pre = preference.split(',');
    console.log("pre: ", pre);
    placeSchema.find({"placeType": pre}).then(placefound => {
        if(!placefound){
            return res.status(404).end();
        }
        console.log(placefound);
        return res.status(200).json({
            message: "Prefence found",
            place: placefound
        });
        
    }).catch(err => console.log(err));

    // function filterValue(value) {
    //     return placeSchema["placeType"].filter((object) => {
    //      return object["placeType"] == preference
    //     })
    //     }
    //     console.log(filterValue("Mountains"));

    // function isPrefernce(place){
    //     return place.plceType === preference;

    // }

    // console.log("place found: ", placeSchema.find(isPrefernce));
    // const result = placeSchema.find( ({ placeType }) => placeType === preference );
    
    // placeSchema.findOne( {placeType: {$eq: placeType}}).then(preferencefound => {
    //     if(!preferencefound){
    //         return res.status(404).end();
    //     }
    //     console.log("place found:",preferencefound);
    //     return res.status(200).json({
    //         message: "Prefence found",
    //         place: preferencefound
            
    //     });
        
    // }).catch(err => console.log(err));

    
})



router.get("/getPlaceCardDetails/:id", (req, res, next) => {

    console.log("inside placecarddetails");

    placeSchema.findById(req.params.id).then(place => {
        if (place) {
            res.status(200).json({
                message: "Place found successfully",
                place: place
            });
            console.log("place card backend;", place);
        } else {
            res.status(404).json({ message: " not found!" });
        }
    });
});



module.exports = router;
