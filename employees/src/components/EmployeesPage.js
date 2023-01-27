import '../Employees.css';
import Axios from "axios";
import React, {Component} from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react';
import pic from "../images/pic.png";
import { BiTrash } from "react-icons/bi";



function EmployeesPage() {

    //Validating Addition Input
    const[AddingError,setAddingError]=useState(false);
    const[NameError,setNameError]=useState(false);
    const[AgeError,setAgeError]=useState(false);
    const[EmailError,setEmailError]=useState(false);



    //validating for post request call on change
    function validateName(name) {
        if (name === " ") {
            setNameError(true);
            setAddingError(true);
            return ;
        }

        setNameError(false);
        setAddingError(false);
    }
    function validateAge(age) {
        if (isNaN(age) || age < 0 || age === " ") {
            setAgeError(true);
            setAddingError(true);
            return ;
        }

        setAgeError(false);
        setAddingError(false);

    }
    function validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError(true);
            setAddingError(true);
            return;
        }

        setEmailError(false);
        setAddingError(false);
    }


    
    

const NameErrorMessage="Name Cannot Be Null";
const AgeErrorMessage="Age must have a positive value";
const EmailErrorMessage="Email must be valid";

  //GET
const[EmployeesList,setEmployeesList]=useState([]);
useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
        setEmployeesList(response.data);});

}, []);



  //POST
const [EmployeeName, setEmployeeName]= useState("");
const [EmployeeAge, setEmployeeAge]= useState("");
const [EmployeeEmail, setEmployeeEmail]= useState("");

const HandleAddingEmployee=(e)=>{
    e.preventDefault();
    console.log(e);
    if (!EmployeeName){
        setAddingError(true);
        setNameError(true);
    } 
    else if(!EmployeeAge  || EmployeeAge.valueOf()<0 || isNaN(EmployeeAge) || EmployeeAge==" "){
        setAddingError(true);
        setAgeError(true);
    }
    else if( !EmployeeEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)){
        setAddingError(true);
        setEmailError(true);
    } 
    else {
        setAddingError(false);
        setNameError(false);
        setAgeError(false);
        setEmailError(false);
        Axios.post('http://localhost:3001/insert',{
            EmployeeName:EmployeeName,
            EmployeeAge:EmployeeAge,
            EmployeeEmail:EmployeeEmail
        });
    }
}



//PUT
const [newEmployeeName,setUpdatedEmployeeName]=useState("");
const [newEmployeeAge,setUpdatedEmployeeAge]=useState("");
const [newEmployeeEmail,setUpdatedEmployeeEmail]=useState("");

const [updatedNameError,setUpdatingNameError]=useState(false);
const [updatedAgeError,setUpdatingAgeError]=useState(false);
const [updatedEmailError,setUpdatingEmailError]=useState(false);

const[errorId,setErrorId]=useState("");

const updateEmployee = (id, attribute, value) => {
    if(attribute==="EmployeeName"){
            if (!newEmployeeName) {
                setErrorId(id);
                setUpdatingNameError(true);
                setUpdatedEmployeeAge(false);
                setUpdatedEmployeeEmail(false);
            } 
            else {
                setErrorId("");
                setUpdatingNameError(false);
                Axios.put("http://localhost:3001/update", { id: id, [attribute]: value });
            }
        }

        else if(attribute==="EmployeeAge"){
            if(!newEmployeeAge  || newEmployeeAge.valueOf()<0 || isNaN(newEmployeeAge) || newEmployeeAge===" "){
                setErrorId(id);
                setUpdatingAgeError(true);
            }
            else {
                setErrorId("");
                setUpdatingAgeError(false);
                Axios.put("http://localhost:3001/update", { id: id, [attribute]: value });
            }
        }

        else if(attribute==="EmployeeEmail"){
            if( !newEmployeeEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) || newEmployeeEmail===" " || !newEmployeeEmail){
                setErrorId(id);
                setUpdatingEmailError(true);
            }
            else {
                setErrorId("");
                setUpdatingEmailError(false);
                Axios.put("http://localhost:3001/update", { id: id, [attribute]: value });
            }
        }
        else{
            setErrorId("");
            setUpdatingNameError(false);
            setUpdatingAgeError(false);
            setUpdatingEmailError(false);
            Axios.put("http://localhost:3001/update", { id: id, [attribute]: value });
        }
                        
    }




  //DELETE
const deleteEmployee=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
}


return(

    <div className='Back'>
        <div className='EmployeesPage'>
        
            <img src={pic} alt="" className="pic"/>

            <div className='FixHeight'>
                <h1 style={{color: 'black'}}>Employees</h1> 

                {EmployeesList.map((val,key)=>{
                    return <div key={key}>
                    <div className='ChangedCont'>
                        <div className='NewEl'>
                            <span className='Desc'>{val.EmployeeName}</span>
                            <span className='Distance'>

                            {/* updating name */}
                            <span className='Desc'><input type="text" name="updatedName" placeholder="Name" onChange={(event)=>{
                                setUpdatedEmployeeName(event.target.value);
                            }}></input></span>                    
                            <span className='Desc'><button className='outlineBtn' onClick={()=>updateEmployee(val._id,'EmployeeName',newEmployeeName)}>Update</button></span>
                            </span>
                        </div>
                            {(errorId===val._id && updatedNameError) && <p className="alert alert-danger">Please enter a valid name</p>}

                        <div className='NewEl'>
                            <span className='Desc'>{val.EmployeeAge}</span>
                            <span className='Distance'>
                                {/* updating age */}
                                <span className='Desc'>
                                    <input type="number" name="updatedAge" placeholder="Age" onChange={(event)=>{
                                            setUpdatedEmployeeAge(event.target.value);
                                        }}>
                                    </input>
                                </span>
                                
                                <span className='Desc'>
                                    <button className='outlineBtn' onClick={()=>updateEmployee(val._id,'EmployeeAge',newEmployeeAge)}>Update</button>
                                </span>

                            </span>
                        </div>
                        {(errorId===val._id &&updatedAgeError) && <p className="alert alert-danger">{AgeErrorMessage}</p>} 
                        <div className='NewEl'>
                            <span className='Desc'>{val.EmployeeEmail}</span>
                            <span className='Distance'>


                            {/* updating email */}
                            <span className='Desc'><input type="text" name="updatedEmail" placeholder="Email" onChange={(event)=>{
                                setUpdatedEmployeeEmail(event.target.value);
                            }}></input></span>
                            
                            <span className='Desc'><button className='outlineBtn' onClick={()=>updateEmployee(val._id,'EmployeeEmail',newEmployeeEmail)}>Update</button></span>
                            </span>
                        </div>
                        {(errorId===val._id &&updatedEmailError )&& <p className="alert alert-danger">{EmailErrorMessage}</p>}
                        <div className='NewEl'>

                            {/* deleting employee */}
                            <span className='Desc1'><button  className='btn btn-danger bt1' onClick={()=>{deleteEmployee(val._id)}}>Delete <BiTrash></BiTrash></button></span>
                        </div>
                    </div>
                    <br></br>
                    </div>

                })}

            </div>

            <div className="combined">

                <h2 style={{color: '#699EE7', marginBottom: 10}}>Add Employee</h2>
                <div className="cont" style={{width: 300}}>

                    {/* Adding Employee */}
                    <form onSubmit={HandleAddingEmployee}>

                        <div>

                            <input className="inp" type="text" name="name" placeholder="Name" onChange={(event)=>{
                            setEmployeeName(event.target.value);
                            validateName(event.target.value);
                            }}/>



                        </div>

                        <div>
                            <input className="inp" type="number" name="age" placeholder="Age" onChange={(event)=>{
                            setEmployeeAge(event.target.value);
                            validateAge(event.target.value);
                            }}/>


                        </div>    

                        <div>
                            <input className="inp" type="text" name="email" placeholder="Email" onChange={(event)=>{
                            setEmployeeEmail(event.target.value);
                            validateEmail(event.target.value);
                            }}/>


                        </div>
                        
                        <div>


                        <button type="submit" className="btn btn-primary inp">Add</button>

                        </div>

                    </form>
                        <div className='errorMessages'>
                            {AddingError?<p className='inp, alert alert-danger'>Please fix the following:</p>:""}
                            {NameError?<p className='inp, alert alert-danger'>{NameErrorMessage}</p>:""}
                            {AgeError?<p className='inp, alert alert-danger'>{AgeErrorMessage}</p>:""}
                            {EmailError?<p className='inp, alert alert-danger'>{EmailErrorMessage}</p>:""}
                        </div>
                </div>

            </div>
        </div>

    </div>
);

    }

export {EmployeesPage};      