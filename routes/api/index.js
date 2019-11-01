var express = require('express');
var router = express.Router();

var doctor=require('../.././Controllers/doctor');
var patient=require('../.././Controllers/patient');
var treatment=require('../.././Controllers/treatment');

router.get("/",(req,res)=>{
	res.render('home');
});

router.get("/addDoctor",(req,res)=>{
	res.render('addDoctor');
});

router.get("/addPatient",(req,res)=>{
	res.render('addPatient');
});

router.get("/treatment",(req,res)=>{
	res.render('treatment');
});

router.post("/choose",(req,res)=>{
	res.render('choose',{city:req.body.city});
});

router.post("/addDoctor",(req,res)=>{
	doctor.saveDoctor(req.body,(err,data)=>{
		if(err)
			res.send(err);
		res.render('addDoctor');
	});
});

router.post("/addPatient",(req,res)=>{
	patient.savePatient(req.body,(err,data)=>{
		if(err)
			res.send(err);
		res.render('addPatient');
	});
});

router.post("/treat",(req,res)=>{
	treatment.saveTreatment(req.body,(err,data)=>{
		if(err)
			res.send(err);
		patient.updateTreatment(req.body.Patient_id,data,(err,data)=>{
			if(err)
				res.send(err);
			res.redirect('/treatment');
		});
	});
});

router.post("/treatment",(req,res)=>{
	patient.getTreatment(req.body.id,(err,data)=>{
		if(err)
			res.send(err);
		res.render('treatment',{patient:data});
	});
});

router.all("*",(req,res)=>{
	res.send("");
})

module.exports=router;