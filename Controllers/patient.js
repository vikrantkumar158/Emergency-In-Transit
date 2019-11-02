var mongoose=require('mongoose');
var patientDetails=require('.././Models/patient');

exports.savePatient = (info,cb)=>
{
	var newPatientDetails=new patientDetails({
		Patient_id: info.Patient_id,
		name: info.name,
		dob: info.dob,
		contact: info.contact,
		address: info.address,
		previousTreatment:[]
	});

	newPatientDetails.save()
	.then(savedData=>{
		cb(null,savedData);
	})
	.catch(err=>{
		cb(err);
	});
}

exports.getPatient = (id,cb)=>
{
	patientDetails.find({Patient_id:id})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	});
}

exports.getTreatment = (id,cb)=>
{
	patientDetails.find({Patient_id:id}).populate('previousTreatment')
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	});
}

exports.updateTreatment = (id,data,cb)=>
{
	patientDetails.updateOne({"Patient_id":id},{$push:{"previousTreatment":data._id}})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	});
}