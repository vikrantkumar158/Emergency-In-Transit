var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=Schema({
	Doc_id: {type: String,ref: 'doctordetails'},
	password: {type:String}
});

var userDetails = mongoose.model("userdetails",userSchema);
module.exports=userDetails;