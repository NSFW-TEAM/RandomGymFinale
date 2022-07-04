var mongoose1 = require('mongoose');

exports = module.exports = function(app:any, mongoose:any) {

	var ExerciseSchema = new mongoose1.Schema({
		diff: { type: String },
		area: { type: String },
		name: {type : String},
		id: {type: Number},
		demopath: {type: String},
		desc: {type: String},
		duration: {type:String},
		workarea: {type:String}
	});

	module.exports=mongoose.model('exercise', ExerciseSchema);

};