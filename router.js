const AuthenticationController = require('./controllers/authentication'),
      express = require('express'),
      Player = require('./models/player'),
	  passportService = require('./config/passport'),
	  passport = require('passport');
			
// Middleware to require login/authentication
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false});

// Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_OWNER = "Owner",
	  REQUIRE_CLIENT = "Client",
	  REQUIRE_MEMBER = "Member";
			
module.exports = function(app) {
    // initializing route groups
	const apiRoutes = express.Router(),
	      authRoutes = express.Router();
				
	//=========================
    // Auth Routes
    //=========================

    // Set auth routes as subgroup/middleware to apiRoutes
	apiRoutes.use('/auth', authRoutes);
	
	// Registration route
	authRoutes.post('/register', AuthenticationController.register);
	
	// Login route
	authRoutes.post('/login', requireLogin, AuthenticationController.login);
	
	authRoutes.get('/players', requireAuth, (req, res) => {
		Player.find(function(err, players) {
			if (err)
				res.send(err);
			res.send({ data: res.json(players) });
		});
	});

	// Test protected route
	apiRoutes.get('/protected', requireAuth, (req, res) => {
	    res.send({ content: 'The protected test route is functional!' });
	});

	// Set url for API group routes
	app.use('/api', apiRoutes);
};