const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')


module.exports = (passport)=>{
	passport.use(new LocalStrategy({usernameField:'email'},(email, password, done)=>{
		User.findOne({email})
		.then(user=>{
			if (!user) return done(null, false,{message:"Invalid credentials"})
			bcrypt.compare(password, user.password)
			.then((result) => {
				if (!result) return done(null, false,{message:"Invalid credentials"})
			    return done(null,user)
			})
			.catch(err=>{
				return done(err)
			})
		})
		.catch(err=>{
				return done(err)
		})
	}))

	passport.serializeUser((user, done)=> {
	  done(null, user.id);
	});

	passport.deserializeUser((id, done)=> {
	  User.findById(id, (err, user)=> {
	    done(err, user);
	  });
	});
}