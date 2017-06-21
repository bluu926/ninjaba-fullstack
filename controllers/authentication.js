const jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      User = require('../models/user'),
      Player = require('../models/player'),
      config = require('../config/main');
			
function generateToken(user) {  
 	return jwt.sign(user, config.secret, {
    	expiresIn: 10080 // in seconds
  	});
}

// Set user info from request
function setUserInfo(request) {  
    return {
	    _id: request._id,
	    firstName: request.profile.firstName,
	    lastName: request.profile.lastName,
	    username: request.username,
	    email: request.email,
	    role: request.role,
  	};
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
    	user: userInfo
  	});
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
    // Check for registration errors
	const email = req.body.email;
	const username = req.body.username;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;
	
	// Returns error if no email provided
	if (!email) {
    	return res.status(422).send({ error: 'You must enter an email address.'});
	}

	if (!username) {
    	return res.status(422).send({ error: 'You must enter a username.'});
	}
	
	// Return error if full name not provided
	if (!firstName || !lastName) {
		return res.status(422).send({ error: 'You must enter your full name.'});
	}
	
	// Return error if no password provided
	if(!password) {
	  	return res.status(422).send({ error: 'You must enter a password.'});
	}
	
	User.findOne({ email: email}, function(err, existingUser) {
	  	if (err) { return next(err); }
		
		// If user is not unique, return error
		if (existingUser) {
		  	return res.status(422).send({ error: 'That email address is already in use.'});
		}

		User.findOne({ username: username}, function(err, existingUsername) {

		  	if (err) { return next(err); }
			
			// If user is not unique, return error
			if (existingUsername) {
			  	return res.status(422).send({ error: 'That username is already in use.'});
			}

			// If email/username is unique and password was provided, create account
			let user = new User({
			  	email: email,
			  	username: username,
				password: password,
				profile: { firstName: firstName, lastName: lastName}
			});
			
			user.save(function(err, user) {
			  	if (err) { return next(err); }
				
				// Subscribe member to Mailchimp list
				// mailchimp.subscribeToNewsletter(user.email);
				
				// Respond with JWT if user was created
				
				let userInfo = setUserInfo(user);
				
				res.status(201).json({
				  	token: 'JWT ' + generateToken(userInfo),
					user: userInfo
				});
			});
		});
	});
}

//========================================
// Add Player Route
//========================================
exports.addPlayer = function(req, res, next) {
	const playerId = req.params.playerId;
	const username = req.params.username;

	Player.findById(playerId, (err, foundPlayer) => {
		if (err) {
			return res.status(422).json({ error: 'No player was found.' });
		}
		
		// if player found, change it is a Free Agent
		if (foundPlayer.owner != '--free agent--') {
			return res.status(422).json({ error: 'Player is not a free agent.' });
		}

		foundPlayer.owner = username;

		foundPlayer.update({$set: {owner:username}}, (err) => {
			if (err) {
				return res.status(422).json({ error: 'Unable to add free agent.' });
			}

			return res.status(200).json({
		        message: 'Player successfully added'
	  		});
		});
	});
}

//========================================
// Drop Player Route
//========================================
exports.dropPlayer = function(req, res, next) {
	const playerId = req.params.playerId;
	const username = req.params.username;

	Player.findById(playerId, (err, foundPlayer) => {
		if (err) {
			return res.status(422).json({ error: 'No player was found.' });
		}
		
		// if player found, change it is a Free Agent
		if (foundPlayer.owner != username) {
			return res.status(422).json({ error: 'Player is not owned by owner.' });
		}

		foundPlayer.owner = username;

		foundPlayer.update({$set: {owner:'--free agent--'}}, (err) => {
			if (err) {
				return res.status(422).json({ error: 'Unable to drop player.' });
			}

			return res.status(200).json({
		        message: 'Player successfully dropped'
	  		});
		});
	});
}

//========================================
// Authorization Middleware
//========================================

// Role authorization checked
exports.roleAuthorization = function(role) {
	return function(req, res, next) {
		const user = req.user;
		
		User.findById(user._id, function(err, foundUser) {
			if (err) {
		    	res.status(422).json({ error: 'No user was found.' });
				return next(err);
			}
			
			// If user if found, check role.
			if (foundUser.role == role) {
			  	return next();
			}
			
			res.status(401).json({ error: 'You are not authorized to view this content.' });
			return next('Unauthorized');
		})
	}
}


//= =======================================
// Reset Password Route
//= =======================================

exports.verifyToken = function (req, res, next) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, resetUser) => {
    // If query returned no results, token expired or was invalid. Return error.
    if (!resetUser) {
      res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
    }

      // Otherwise, save new password and clear resetToken from database
    resetUser.password = req.body.password;
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;

    resetUser.save((err) => {
      if (err) { return next(err); }

      return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
    });
  });
};