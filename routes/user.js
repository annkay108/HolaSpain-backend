const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");

const {
    isLoggedIn, isNotLoggedIn, validationLogin, isAdmin
} = require("../helpers/middlewares");

router.get('/', isLoggedIn, async(req, res, next)=>{
    try{
        const allUser = await User.find({});
        res.status(201).json(allUser);
    }
    catch (error){
        next(createError(error));
    }
})

router.get('/:id', isLoggedIn, async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    }
    catch (error){
        next(createError(error));
    }
})
router.put('/:id', isLoggedIn, async(req, res, next)=>{
    const{id} = req.params;
    const{name, number, city} =req.body;
    try
    {
        await User.findByIdAndUpdate(id, {name, number, city})
        res.status(200).json("updatedUser");
    }
    catch(error){
        next(createError(error));
    }
})

router.delete('/:id', isLoggedIn, async(req, res, next) => {
    const { id } = req.params;

    try{
        await User.findByIdAndRemove(id)
        res.status(200).json("deletedUser");
    }
    catch(error){
        next(createError(error));
    }
  })

module.exports = router;