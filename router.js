const express= require('express')
const dbconnect= require('./dbconnect');
const sqlconnect = require('./dbconnect');
const Route =express.Router();

Route.get("/",(req,resp)=>{
    const userData=[{name: "Shubham",email :"shubbusb@gmail.com"},
                {name : "Sagar" , email :"sagar@gmail.com"},
                {name : "Sar" , email :"sa@gmail.com"}
]
 resp.send(userData)
})

Route.get("/api/user",(req,resp)=>{
    dbconnect.query("select * from userdata ",(err,row)=>{

        if(!err){
            resp.send(row)

        }
        else{
            console.log(err);
        }
    })
})
Route.get("/api/country",(req,resp)=>{
    dbconnect.query("select * from tbl_country ",(err,row)=>{

        if(!err){
            resp.send(row)

        }
        else{
            console.log(err);
        }
    })
})
Route.get("/api/state/:id",(req,resp)=>{
    dbconnect.query("select * from tbl_state where countryid='"+req.params.id+"'",(err,row)=>{

        if(!err){
            resp.send(row)

        }
        else{
            console.log(err);
        }
    })
})

Route.post("/api/adduser",(req, resp)=>{
     const name=req.body.name;
     const username=req.body.username;
     const email=req.body.email;
     const password=req.body.password;
     const phoneno=req.body.phoneno;
     const gender=req.body.gender;
     const countryid=req.body.countryid;
     const stateid=req.body.stateid;
     const address1=req.body.address1;
     const address2=req.body.address2;
     const accept=req.body.accept;
     const status=1;

     var sql= `INSERT INTO tbl_user_registration (name, username,email,password,phoneno,gender,countryid,stateid,address1,address2,accept,status)
     VALUES ("${name}","${username}","${email}","${password}","${phoneno}","${gender}","${countryid}","${stateid}","${address1}","${address2}","${accept}","${status}")`;

     sqlconnect.query(sql,(err,result)=>{
        if(!err){
            resp.status(200).json("USER REGISTRATION INSEART SUCUSSFULLLY")
        }
        else{
            console.log(err);
        }
     })
     
})
 

Route.get("/api/userregistrationdata",(req,resp)=>{
    var sql= `SELECT ur.name, ur.username, ur.email,ur.phoneno, ur.gender, ur.address1, ur.status,c.name as countryname, s.state_name FROM tbl_user_registration as ur
    join tbl_country as c on c.id= ur.countryid
    join tbl_state as s on s.state_id= ur.stateid
    WHERE ur.status=1
    `;
    sqlconnect.query(sql, (err, row)=>{
        if(!err)
        {
            resp.send(row);

        } else{
            console.log(err);
        }


 })
})
module.exports=Route;