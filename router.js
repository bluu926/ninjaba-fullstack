const AuthenticationController = require('./controllers/authentication'),
      express = require('express'),
      Player = require('./models/player'),
      Transaction = require('./models/transaction'),
      Comment = require('./models/comments'),
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

	// Password reset route (change password using token)
	authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

	authRoutes.post('/add/:playerId/:username', requireAuth, AuthenticationController.addPlayer);

	authRoutes.post('/drop/:playerId/:username', requireAuth, AuthenticationController.dropPlayer);

	authRoutes.post('/transaction/:username/:transactionType/:playerId', requireAuth, AuthenticationController.recordTransaction);
	
	authRoutes.get('/players', (req, res) => {
		Player.find(function(err, players) {
			if (err)
				res.send(err);
			res.send({ content: players });
		});
	});

	authRoutes.get('/transactions', (req, res) => {
		Transaction.find(function(err, transactions) {
			if (err)
				res.send(err);
			res.send({ transaction: transactions });
		});
	});

	authRoutes.get('/comments', (req, res) => {
	    Comment.find(function(err, comments) {
			if (err)
				res.send(err);

			//responds with a json object of our database comments.
			res.json(comments)
		});
	});

	authRoutes.post('/comments', (req, res) => {
	    var comment = new Comment();
		//body parser lets us use the req.body
		comment.author = req.body.author;
		comment.text = req.body.text;
		comment.save(function(err) {

			if (err)
				res.send(err);

			res.json({ message: 'Comment successfully added!' });
		});
	});

	// Test protected route
	apiRoutes.get('/protected', requireAuth, (req, res) => {
	    res.send({ content: 'The protected test route is functional!' });
	});

	// Set url for API group routes
	app.use('/api', apiRoutes);
};