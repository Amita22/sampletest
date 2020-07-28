const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const express = require('express');


const router = express.Router();


const usersSchema = require('./model/userModel')
mongoose.connect('mongodb+srv://amita:5SxAq8ihvbuN0WIv@cluster1-dm6iy.mongodb.net/travelbuzz?retryWrites=true/E-tourism');
//mongoose.connect('mongodb://amita:5SxAq8ihvbuN0WIv@cluster1-shard-00-00-dm6iy.mongodb.net:27017,cluster1-shard-00-01-dm6iy.mongodb.net:27017,cluster1-shard-00-02-dm6iy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin&retryWrites=true/E-tourism');

var hash = bcrypt.hashSync("admin", saltRounds);
var userJson = {
   name: "admin",
   username: "admin",
   password: hash,
   //preference: null,
   userType: "Manager"
};
var users = new usersSchema(userJson);

users.save(function(err, result) {
   console.log("Admin Account Created");
   // const token = jwt.sign({ username: result["username"], name: result["name"] }, 'this_must_be_a_long_string', { expiresIn: "1h" });

});