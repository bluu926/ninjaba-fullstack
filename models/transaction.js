const mongoose = require('mongoose');
      Schema = mongoose.Schema;
			
//==============================
// Transaction Scehma
//==============================			
const TransactionSchema = new Schema({
  	username: {
	    type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
	  	type: String,
		required: true
	},
	transactionType: {
		type: String,
		required: true
	},
	playerName: {
		type: String,
		required: true
	}
},
{
  	timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);