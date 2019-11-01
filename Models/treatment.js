var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patient = require('./patient');
var doctor = require('./doctor');

var treatmentSchema=Schema({
	Patient_id: {type: String,ref: 'patientdetails'},
	Doc_id: {type: String,ref: 'doctordetails'},
	MedicinePrescribed: [{type: String}],
	DateOfTreatment: {type: Date,default: Date.now}
});

var treatmentDetails = mongoose.model("treatmentdetails",treatmentSchema);
module.exports=treatmentDetails;