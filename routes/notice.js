const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Notice = require("../models/notice");

const {
    isAdmin, isLoggedIn
} = require("../helpers/middlewares");

router.get('/',isLoggedIn, async(req, res, next)=>{
    try {
        const allNotice = await Notice.find({});
        res.status(201).json(allNotice);
    } catch (error) {
        next(createError(error));
    }
})

router.post('/add', isLoggedIn, isAdmin, async(req, res, next)=>{
    const {title, description} = req.body;
    try {
        const newNotice = await Notice.create({title, description});
        res.status(201).json(newNotice);
    } catch (error) {
        next(createError(error));
    }
})

router.delete('/delete/:id', isLoggedIn, isAdmin, async(req, res, next)=>{
    const {id} = req.params;
    try {
       await Notice.findByIdAndRemove(id)
       res.status(200).json("deletedNotice"); 
    } catch (error) {
        next (createError(error));
    }
})

module.exports = router;