const AuthenticationController = require('./controllers/authentication'),
      express = require('express'),
      Player = require('./models/player'),
      Transaction = require('./models/transaction'),
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

	apiRoutes.get('/transactions', requireAuth, (req, res) => {
		Player.find(function(err, players) {
			if (err)
				res.send(err);
			res.send({ content: players });
		});
	});
	
	// Registration route
	authRoutes.post('/register', AuthenticationController.register);
	
	// Login route
	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	// Password reset route (change password using token)
	authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

	authRoutes.post('/add/:playerId/:username', requireAuth, AuthenticationController.addPlayer);

	authRoutes.post('/drop/:playerId/:username', requireAuth, AuthenticationController.dropPlayer);

	authRoutes.post('/transaction/:username/:transactionType/:playerId', requireAuth, AuthenticationController.recordTransaction);
	
	authRoutes.get('/players', (req, res) => {
		Transaction.find(function(err, transactions) {
			if (err)
				res.send(err);
			res.send({ content: transactions });
		});
	});

	// Test protected route
	apiRoutes.get('/protected', requireAuth, (req, res) => {
	    res.send({ content: 'The protected test route is functional!' });
	});

	// Set url for API group routes
	app.use('/api', apiRoutes);
};