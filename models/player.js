const mongoose = require('mongoose');
      Schema = mongoose.Schema;

//==============================
// Player Scehma
//==============================
const PlayerSchema = new Schema({
  	name: {
	    type: String,
		required: true
	},
	g: {
	  	type: String,
		required: true
	},
	fg: {
	  	type: String,
		required: true
	},
	fga: {
	  	type: String,
		required: true
	},
	owner: {
		type: String,
		required: false
	}
//	,
//	resetPasswordToken: { type: String },
//	resetPasswordExpires: { type: Date }
}
//,
//{
//  	timestamps: true
//}
);

module.exports = mongoose.model('Player', PlayerSchema);