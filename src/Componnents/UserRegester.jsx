import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useForm} from"react-hook-form"
import { Navigate, useNavigate } from 'react-router-dom';
function UserRegester () {
    const navigate=useNavigate();
    const[countrydata,setcountrydata]=useState([]);
    const[statedata,setstatedata]=useState([]);
    const[message,setmessage] =useState('');

    const{register,handleSubmit,formState:{errors}}=useForm();
     const onSubmit=(data)=>{
            console.log(data);
             // connnection of database
    const res=axios.post("http://localhost:7000/api/adduser",data)  // heree (data) is collection of all form data ==> const onSubmit= async(data)=>{ console.log(data)};
    .then((responce)=>{
        setmessage(responce.data);
    })
      if(!message){
        setmessage(res.data)
        setTimeout(()=>{
            navigate("/userlist")
        },2000)
      }
      else{
        setmessage("Some Error Occured!")
      }

    }
    
       
    //Fetch the data from country database
    useEffect(()=>{
        const getCountry=async()=>{
                const reqData= await fetch("http://localhost:7000/api/country");
                const resData= await reqData.json();
                setcountrydata(resData);
        }
        getCountry();
    },[])
// Fetch the data through Countryid with stateid 
    const handlecountry=(e)=>{
        const countryid=e.target.value;
        // console.log(countryid);
        const  getState= async()=>{
            const reqStateData= await fetch("http://localhost:7000/api/state/"+countryid);
            const resState=await reqStateData.json();
                 setstatedata(resState);
 
            // console.log(resState);
        }
        getState();
    }


  return (
    <div>
<div className="container">
    <div className="row">
        <div className="col-md-12">
             <h1 className=" text-center" >User Registration Form</h1>
                <h1 className='text-success'>{message}</h1>
             <form onSubmit={handleSubmit(onSubmit)}>
             <div className="row ">
              
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Name <span className='text-danger'>*</span></label>
                        <input type="text"  {...register("name",{required:true})} className="form-control" placeholder="Enter your name" />
                        <span className='text-danger'>
                        {errors.name?.type==="required" && "Name is required"}                        
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>User Name <span className='text-danger'>*</span></label>
                        <input type="text"  {...register("username",{required:true,pattern:/^[a-zA-Z0-9_]+$/i})} className="form-control" placeholder="Enter your name" />
                        <span className='text-danger'>
                            {errors.username?.type==="required" && "Username is required"}
                            {errors.username?.type==="pattern" && "Username is not in formate "}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Email <span className='text-danger'>*</span></label>
                        <input type="email"  {...register("email",{required:true,pattern:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})} className="form-control" placeholder="Enter your name" />
                        <span className='text-danger'>
                            {errors.email?.type==="required" && "Email is required"}
                            {errors.email?.type==="pattern" && "Enter Valid Email"}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Password <span className='text-danger'>*</span></label>
                        <input type="password"  {...register("password",{required:true,minLength:6,maxLength:15})} className="form-control" placeholder="Enter your name" />
                        <span className='text-danger'>
                        {errors.password?.type==="required" && "Password is required"}
                            {errors.password?.type==="minLength" && "Password is must be 6 character long"}
                            {errors.password?.type==="maxLength" && "Password is must less then 15 character long"}
                        </span>

                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Phone No <span className='text-danger'>*</span></label>
                        <input type="phoneno"  {...register("phoneno",{required:true,maxLength:10})} className="form-control" placeholder="Enter your name" />
                        <span className='text-danger'>
                        {errors.phoneno?.type==="required" && "Phone Number is required"}
                            {errors.phoneno?.type==="maxLength" && "Phone number must be 10 character"}
                         
                        </span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Gender <span className='text-danger'>*</span></label>
                            <select name='gender' {...register("gender",{required:true})}  className='form-control'>
                                <option value="">---Please Select---</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                           
                       
                            </select>
                            <span className='text-danger'>
                        {errors.gender?.type==="required" && "Gender is required"}                        
                            </span>
                        
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Country <span className='text-danger'>*</span></label>
                            <select name='countryid' {...register("countryid",{required:true})}  className='form-control' onChange={handlecountry}>
                                <option value="">---Please Select---</option>
                              {
                                countrydata.map((countryitem,index)=>{
                                    return <option value={countryitem.id} key={index}>{countryitem.name}</option>
                                })
                              }

                            </select>

                           { statedata.length===0 && (//to avoid the below popup message if country is select 
                           <span className='text-danger'>
                        {errors.countryid?.type==="required" && "Country is required"}                        
                            </span>
                           ) }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>State <span className='text-danger'>*</span></label>
                            <select name="stateid" {...register("stateid",{required:true})} className='form-control'>
                                <option value="">---Please Select---</option>
                                {statedata.map((stateitem , index)=>{
                                    return  <option value={stateitem.state_id} key={index}>{stateitem.state_name}</option>
                                })}

                            </select>
                            <span className='text-danger'>
                        {errors.stateid?.type==="required" && "State is required"}                        
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="" className='mb-2'>Address 1</label>
                        <textarea name="address1" {...register("address1",{required:true})} className='form-control'></textarea>
                        </div>
                        <span className='text-danger'>
                        {errors.address1?.type==="required" && "Adress is required"}                        
                            </span>
                    </div>

                   <div className="col-md-6">
                   <div className="mb-3">
                   <label htmlFor="" className='mb-2'>Address 2</label>
                   <textarea name="address2" {...register("address2")} className='form-control'></textarea>
                        </div>
                        <span className='text-danger'>
                        {errors.address2?.type==="required" && "Adress is required"}                        
                            </span>
               </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                           <div className='form-check form-check-inline'>
                           <input type="checkbox" name='accept'{...register("accept",{required:true})} className='form-check-input' value="1"/>
                            <label htmlFor="" className='form-checkable'>Accept all conditions</label>
                           </div>
                           <span className='text-danger'>
                        {errors.accept?.type==="required" && "Accept is required"}                        
                            </span>
                        </div>
                    </div>

                    <div className="col-md-12 ">
                        <div className="mb-3">
                        <label htmlFor="" className='form-lable'></label>
                      <button type="submit" className='btn btn-success btn-lg'>Submit</button>
                        </div>
                    </div>
                    
             
             </div>
             </form>
        </div>
    </div>
</div>
        
    </div>
  )
}
export default UserRegester;