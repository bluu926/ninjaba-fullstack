const mongoose = require('mongoose');
      Schema = mongoose.Schema;

//==============================
// Player Scehma
//==============================
const PlayerSchema = new Schema({
  	player: {
	    type: String,
		required: true
	},
	team: {
	    type: String,
		required: true
	},
	pos: {
	    type: String,
		required: true
	},
	g: {
	  	type: Number,
		required: true
	},
	mp: {
	    type: Number,
		required: true
	},	
	fg: {
	  	type: Number,
		required: true
	},
	fga: {
	  	type: Number,
		required: true
	},	
	'fg%': {
	  	type: Number,
		required: true
	},	
	'fg-total': {
	  	type: Number,
		required: true
	},
	'fga-total': {
	  	type: Number,
		required: true
	},	
	'fg%-total': {
	  	type: Number,
		required: true
	},	
	three: {
	  	type: Number,
		required: true
	},	
	'three-total': {
	  	type: Number,
		required: true
	},		
	ft: {
	  	type: Number,
		required: true
	},
	fta: {
	  	type: Number,
		required: true
	},	
	'ft%': {
	  	type: Number,
		required: true
	},	
	'ft-total': {
	  	type: Number,
		required: true
	},	
	'fta-total': {
	  	type: Number,
		required: true
	},	
	'ft%-total': {
	  	type: Number,
		required: true
	},	
	reb: {
	  	type: Number,
		required: true
	},
	ast: {
	  	type: Number,
		required: true
	},
	stl: {
	  	type: Number,
		required: true
	},
	blk: {
	  	type: Number,
		required: true
	},
	to: {
	  	type: Number,
		required: true
	},
	'reb-total': {
	  	type: Number,
		required: true
	},
	'ast-total': {
	  	type: Number,
		required: true
	},
	'stl-total': {
	  	type: Number,
		required: true
	},
	'blk-total': {
	  	type: Number,
		required: true
	},
	'to-total': {
	  	type: Number,
		required: true
	},	
	pts: {
	  	type: Number,
		required: true
	},
	'pts-total': {
	  	type: Number,
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