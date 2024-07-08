const express=require('express');
const bodyparse=require('body-parser')
const cors=require('cors');
const Routerpath=require('./router')
const app=express();
const port=7000;

app.use(bodyparse.json());
app.use(cors());
app.use("/",Routerpath)
app.use("/api/user",Routerpath);
app.use("/api/adduser",Routerpath)
app.use("/api/userregistrationdata",Routerpath)
app.listen(port,()=>console.log("Server is running on 7000"))