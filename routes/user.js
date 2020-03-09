const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");

const {
    isLoggedIn, isNotLoggedIn, validationLogin, isAdmin
} = require("../helpers/middlewares");

// Get all users
router.get('/', isLoggedIn, async(req, res, next)=>{
    try{
        const allUser = await User.find({}).populate("requests friends pending");
        res.status(201).json(allUser);
    }
    catch (error){
        next(createError(error));
    }
})

// get any user by id
router.get('/:id', isLoggedIn, async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    }
    catch (error){
        next(createError(error));
    }
})

// update your profile
router.put('/:id', isLoggedIn, async(req, res, next)=>{
    const{id} = req.params;
    const{userName, number, city} =req.body;
    try
    {
        await User.findByIdAndUpdate(id, {userName, number, city})
        res.status(200).json("updatedUser");
    }
    catch(error){
        next(createError(error));
    }
})

// delete the profile
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

// Click add button and requesting the contact
router.post('/add/:id',isLoggedIn,async(req, res, next) => {
    const contactId = req.params.id;
    const id = req.session.currentUser._id;
    try {
        const currentUser = await User.findById(id);
        const contactExists = currentUser.pending.includes(contactId);
        const contactInFriends = currentUser.friends.includes(contactId);
        const requestExists = currentUser.requests.includes(contactId);

        if(!contactExists && !contactInFriends && !requestExists){
            const populateRequests = await User.findById(contactId).populate('requests',"userName");
            const addRequests      = await User.update({_id: contactId},{$addToSet: {requests: id}},{new: true});
            const addToPending     = await User.findByIdAndUpdate(id, {$push: {pending: contactId}}).populate('pending',"userName");
            res.status(200).json({addToPending, populateRequests});
        }
        else{
            res.status(200).json("you already added the user");
        }
    } 
    catch (error) {
        next(createError(error));
    }
})

// Accept the button and add it to the friends list
router.post("/accept/:id", isLoggedIn, async(req, res, next)=>{
    const myId = req.session.currentUser._id;
    const requestId = req.params.id;
    try {
        const addOnMyContact = await User.findByIdAndUpdate(myId, {$push: {friends: requestId}}).populate('friends');
        const addContact = await User.findByIdAndUpdate(requestId,{$push:{friends: myId}}).populate('friends');
        const deleteFromContact = await User.findByIdAndUpdate(myId, {$pull:{requests: requestId}});
        res.status(200).json(`you have to check yourself if it worked`);
    } 
    catch (error) {
        next(createError(error));
    }
})
module.exports = router;