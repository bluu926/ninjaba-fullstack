module.exports = {
	// secret key for JWT signing and encryption
	'secret': 'super secret passphrase',
	// Database connection information
	'database': 'mongodb://itsover:password@ds059375.mlab.com:59375/ben-test',
	// Setting port for server
	'port': process.env.PORT || 3000
}