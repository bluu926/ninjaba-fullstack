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
	  	type: Double,
		required: true
	},
	fg: {
	  	type: Double,
		required: true
	},
	ft: {
	  	type: Double,
		required: true
	},
	reb: {
	  	type: Double,
		required: true
	},
	ast: {
	  	type: Double,
		required: true
	},
	reb: {
	  	type: Double,
		required: true
	},
	stl: {
	  	type: Double,
		required: true
	},
	blk: {
	  	type: Double,
		required: true
	},
	to: {
	  	type: Double,
		required: true
	},
	pts: {
	  	type: Double,
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