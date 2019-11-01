var mongoose=require('mongoose');
var treatmentDetails=require('.././Models/treatment');

exports.saveTreatment= (info,cb)=>
{
	var newTreatmentDetails=new treatmentDetails({
		Patient_id: info.Patient_id,
		Doc_id: info.Doc_id,
		MedicinePrescribed: info.MedicinePrescribed
	});

	newTreatmentDetails.save()
	.then(savedData=>{
		cb(null,savedData);
	})
	.catch(err=>{
		cb(err);
	});
}