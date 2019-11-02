var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({
	secret: "EmErGeNcYiNtRaNsIt",
	resave: true,
	saveUninitialized: true
}));

var doctor=require('../.././Controllers/doctor');
var patient=require('../.././Controllers/patient');
var treatment=require('../.././Controllers/treatment');
var user=require('../.././Controllers/user');

var auth=require('../.././Middlewares/auth');

router.get("/",(req,res)=>{
	if(req.session.isLogin)
		res.redirect("/home");
	else
		res.render('select');
});

router.get("/home",(req,res)=>{
	if(req.session.isLogin)
	{
		if(req.session.Doc_id=="ADMIN")
			res.redirect('/addDoctor');
		else
			res.redirect('/treatment');
	}
	else
		res.render('user/home');
});

router.get("/login",(req,res)=>{
	res.render('login');
});

router.get("/addDoctor",auth,(req,res)=>{
	if(req.session.Doc_id=="ADMIN")
		res.render('admin/addDoctor');
	else
		res.redirect('/treatment');
});

router.get("/addPatient",auth,(req,res)=>{
	if(req.session.Doc_id=="ADMIN")
		res.render('admin/addPatient');
	else
		res.render('doctor/addPatient');
});

router.get("/treatment",auth,(req,res)=>{
	res.render('doctor/treatment');
});

router.get("/logout",(req,res)=>{
	req.session.destroy();
	res.redirect("/");
});

router.post("/login",(req,res)=>{
	user.validate(req.body.Doc_id,req.body.password,(err,data)=>{
		if(data)
		{
			req.session.isLogin=1;
			req.session.Doc_id=req.body.Doc_id;
			res.redirect('/home');
		}
		else
			res.render('login',{res:data});
	});
});

router.post("/choose",(req,res)=>{
	res.render('user/choose',{city:req.body.city});
});

router.post("/addDoctor",(req,res)=>{
	doctor.saveDoctor(req.body,(err,data)=>{
		if(err)
			res.send(err);
		user.saveUser(req.body.Doc_id,(err,data)=>{
			if(err)
				res.send(err);
			res.render('admin/addDoctor');
		})
	});
});

router.post("/addPatient",(req,res)=>{
	patient.savePatient(req.body,(err,data)=>{
		if(err)
			res.send(err);
		res.render('admin/addPatient');
	});
});

router.post("/treat",auth,(req,res)=>{
	treatment.saveTreatment(req.body,(err,data)=>{
		if(err)
			res.send(err);
		patient.updateTreatment(req.body.Patient_id,data,(err,data)=>{
			if(err)
				res.send(err);
			res.redirect('doctor/treatment');
		});
	});
});

router.post("/treatment",auth,(req,res)=>{
	patient.getTreatment(req.body.id,(err,data)=>{
		if(err)
			res.send(err);
		console.log(req.session.Doc_id);
		res.render('doctor/treatment',{patient:data,Doc_id:req.session.Doc_id});
	});
});

router.all("*",(req,res)=>{
	res.send("");
})

module.exports=router;