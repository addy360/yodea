const bcrypt = require('bcryptjs');
const passport = require('passport')

const User = require('../models/User')
exports.login=(req, res, next)=>{
	res.render('auth/login')
}

exports.register = (req, res, next)=>{
	res.render('auth/register')
} 

exports.postLogin = (req, res, next)=>{
	const {password, email} = req.body
		passport.authenticate('local',{
		successRedirect:'/ideas',
		failureRedirect:'/auth/login',
		failureFlash:true,
	})(req, res, next)
	// res.redirect("/auth/login")
}

exports.postRegister = (req, res, next)=>{
	const { name, email, password, password2 } = req.body
	if (password2 !== password) {
		req.flash('error_msg', "Passwords should match")
		return res.redirect("/auth/register")
	}
	User.findOne({email})
	.then(user=>{
		if(user){
			req.flash("error_msg","Email already exists")
		 	return res.redirect("/auth/register")
		}
		 bcrypt.genSalt(10, (err, salt)=> {
		     bcrypt.hash(password, salt, (err, hash)=> {
		        if (err) return next(err)
		        const newUser = {
		        	name, email, password:hash
		        }
		         new User(newUser).save()
		         .then(user=>{
		         	req.flash("success_msg","you can now login")
		         	res.redirect('/auth/login')
		         })
		         .catch(err=>{next(err)})
		    });
		});
	})
	.catch(err=>{
		console.log(err)
		res.send("Server Error")
	})
}