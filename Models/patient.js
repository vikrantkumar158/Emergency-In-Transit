var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema=Schema({
	Patient_id: {type: String},
	name: {type: String},
	dob: {type: String},
	contact: {type: String,required: true},
	address: {type: String},
	previousTreatment:[{type: Schema.Types.ObjectId,ref: 'treatmentdetails'}]
});

var patientDetails = mongoose.model("patientdetails",patientSchema);
module.exports=patientDetails;