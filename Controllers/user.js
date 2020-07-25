var mongoose=require('mongoose');
var userDetails=require('.././Models/user');

exports.saveUser = (id,cb) =>
{
	var newUserDetails = new userDetails({
		Doc_id: id,
		password: id
	});
	newUserDetails.save()
	.then(savedData=>{
		cb(null,savedData);
	})
	.catch(err=>{
		cb(err);
	});
}

exports.changePassword = (id,pass,cb) =>
{
	userDetails.updateOne({'Doc_id':id},{$set:{'password':pass}})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	});
}

exports.validate = (id,pass,cb) =>
{
	userDetails.find({'Doc_id':id,'password':pass})
	.exec((err,data)=>{
		if(err)
			cb(err);
		if(data.length==0)
			cb(null,false);
		else
			cb(null,true);
	});
}