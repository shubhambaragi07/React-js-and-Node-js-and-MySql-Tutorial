import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Userlist = () => {

  const[userData,setuserData]=useState([]);

  useEffect(()=>{
     axios.get("http://localhost:7000/api/userregistrationdata")
     .then((responce)=>{
       setuserData(responce.data)
       console.log(responce);
     })
     .catch((err)=>{
      console.log(err)
     })

  },[])
  return (
    <div>
  <div className="container">
      <div className="row">
        <div className="col-md-12">
        <h1 className=" text-center" >User List</h1>
          <div className='d-grid d-md-flex justify-content-md-end '>
          <Link to="/userregestration" className='btn btn-success'>ADD NEW USER</Link>
          </div>

          <table className="table table-bordered ">
            <thead className='bg-warning'>
              <tr className='bg-secondary text-white'>
                <th>Sl.No</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone no</th>
                <th>Gender</th>
                <th>Country Name</th>
                <th>State Name</th>
                <th>Address1</th>
              </tr>
            </thead>
            <tbody>
         {
          userData.map((uData,index)=>{
           return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{uData.name}</td>
            <td>{uData.username}</td>
            <td>{uData.email}</td>
            <td>{uData.phoneno}</td>
            <td>{uData.gender}</td>
            <td>{uData.countryname}</td>
            <td>{uData.state_name}</td>
            <td>{uData.address1}</td>
          </tr>
           )
          })
         }
              

            </tbody>

          </table>


        </div>

      </div>

  </div>
      
    </div>
  )
}
