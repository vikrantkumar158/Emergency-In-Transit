var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema=Schema({
	Doc_id: {type: String},
	name: {type: String},
	contact: {type: String,required: true},
	address: {type: String},
	speciality: {type: String},
	availability: {type: Boolean,default: true},
	averageResponseTime: {type: String,default: "None"},
	ratings: {type: String,default: "None"}
});

var doctorDetails = mongoose.model("doctordetails",doctorSchema);
module.exports=doctorDetails;