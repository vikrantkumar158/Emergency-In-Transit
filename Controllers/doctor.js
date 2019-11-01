var mongoose=require('mongoose');
var doctorDetails=require('.././Models/doctor');

exports.saveDoctor = (info,cb)=>
{
	var newDoctorDetails=new doctorDetails({
		Doc_id: info.Doc_id,
		name: info.name,
		contact: info.contact,
		address: info.address,
		speciality: info.speciality
	});

	newDoctorDetails.save()
	.then(savedData=>{
		cb(null,savedData);
	})
	.catch(err=>{
		cb(err);
	});
}