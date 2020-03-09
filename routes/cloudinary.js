const mongoose = require('mongoose');
const express  = require('express');
const parser   = require('./../config/cloudinary');
const User     = require("../models/user");

const router = express.Router();


router.post('/image', parser.single('image'), async(req,res,next)=> {  
    console.log("inside cloudinary upload route");
    const id = req.session.currentUser._id;
    const image_url = req.file.secure_url;
    const loggedInUser = await User.findByIdAndUpdate(id, {imageUrl: image_url});
    res.status(201).json(loggedInUser);
})

router.post('/application', parser.single('application'), async(req,res,next)=> {  
    console.log("inside application cloudinary upload route");
    const id = req.session.currentUser._id;
    const application_url = req.file.secure_url;
    const loggedInUser = await User.findByIdAndUpdate(id, {applicationUrl: application_url});
    res.status(201).json(loggedInUser);
})

router.post('/document', parser.single('document'), async(req,res,next)=> {  
    console.log("inside document cloudinary upload route");
    const id = req.session.currentUser._id;
    const document_url = req.file.secure_url;
    const loggedInUser = await User.findByIdAndUpdate(id, {documentUrl: document_url});
    res.status(201).json(loggedInUser);
})

module.exports = router;