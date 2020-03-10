const express = require ('express');
const router = express.Router();
const createError = express("http-errors");
const User = require("../models/user");
const AppStatus = require("../models/appStatus");

const{
    isAdmin, isLoggedIn
}= require("../helpers/middlewares");

router.post('/add/:id',isLoggedIn, async(req, res, next)=>{
    try {
      const {id}= req.params;
      const {title, description} = req.body;
      const newApp = await AppStatus.create({title, description, userId: id});
      const appStatus = await User.findByIdAndUpdate(id,{$push:{appStatus: newApp._id}}).populate('appStatus');
      res.status(201).json(appStatus);
    } catch (error) {
      next(createError(error));
    }
})

router.get('/', isLoggedIn, async(req, res, next)=>{
    try {
        const id = req.session.currentUser._id;
        const getUser = await User.findById(id);
        const getAppStatus = getUser.appStatus;
        res.status(201).json(getAppStatus);
    } catch (error) {
        next(createError(error));
    }
})
module.exports = router;