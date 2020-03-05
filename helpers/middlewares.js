const createError = require("http-errors");
const User = require('../models/user');

exports.isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isAdmin = async (req, res, next) =>{
  const id = req.session.currentUser._id;
  try{
    const user = await User.findById(id);
    if(user.isAdmin){
      next();
    }
    else{
      next(createError(401));
    }
  }
  catch (error){
    next(createError(error));
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next(createError(400));
  else next();
};