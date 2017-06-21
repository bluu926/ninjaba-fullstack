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
	team: {
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
	3p: {
	  	type: String,
		required: true
	},
	ft: {
	  	type: String,
		required: true
	},
	reb: {
	  	type: String,
		required: true
	},
	ast: {
	  	type: String,
		required: true
	},
	reb: {
	  	type: String,
		required: true
	},
	stl: {
	  	type: String,
		required: true
	},
	blk: {
	  	type: String,
		required: true
	},
	to: {
	  	type: String,
		required: true
	},
	pts: {
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