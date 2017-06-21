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
	  	type: Float,
		required: true
	},
	fg: {
	  	type: Float,
		required: true
	},
	ft: {
	  	type: Float,
		required: true
	},
	reb: {
	  	type: Float,
		required: true
	},
	ast: {
	  	type: Float,
		required: true
	},
	reb: {
	  	type: Float,
		required: true
	},
	stl: {
	  	type: Float,
		required: true
	},
	blk: {
	  	type: Float,
		required: true
	},
	to: {
	  	type: Float,
		required: true
	},
	pts: {
	  	type: Float,
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