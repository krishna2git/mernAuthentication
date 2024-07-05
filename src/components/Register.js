import React , {useState} from 'react'
import {NavLink} from "react-router-dom"
import "./Mix.css"

const Register = () => {
    const [passShow,setPassShow]= useState(false);
    const [cpassShow,setCPassShow]= useState(false);

    const [inpval,setInpval]=useState({

        fname:"",
        email:"",
        password:"",
        cpassword:""
    });

    const setVal = (e)=>{
       // console.log(e.target.value);
       const {name,value} =e.target;

       setInpval(()=>{
        return {
            ...inpval,
            [name]:value
        }
       })

    };

    const addUserdata =async(e)=>{
        e.preventDefault();

        const {fname,email,password,cpassword}= inpval;

        if(fname === ""){
          alert("fname is required");
        }else if (email ===""){
          alert("email is required");
        }else if(!email.includes("@")){
          alert("include @ in your email");
        }else if(password === ""){
          alert("password is required");
        }else if (password.length <6){
          alert("password must br 6 char");
        }else if(cpassword === ""){
          alert("cpassword is required");
        }else if (cpassword.length <6){
          alert("cpassword must br 6 char");
        }else if(password !== cpassword){
          alert("password and confirm password does not match");
        } else {
           // console.log("user registration successfully done");



           const data = await fetch("/register",{
                 method:"POST",
                headers:{
                     "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,password,cpassword
            })
          
        });
        const res = await data.json();
        //console.log(res.status);
        
        if (res.status === 201){
          alert("user registration successful");
         setInpval({...inpval,fname:"",email:"",password:"",cpassword:""});
      }
    }
    
  }


  return (
    <>
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Sign Up</h1>
          <p>Sign up to use our page</p>
        </div>

        <form >
        <div className='form_input'>
            <label htmlFor='fname'>Name</label>
            <input type='text' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter your name'/>
          </div>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter your email address'/>
          </div>
          <div className='form_input'>
            <label htmlFor='password'>Password</label>
            <div className='two'>
            <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter your password'/>
            <div className='showpass' onClick={()=>setPassShow(!passShow)}>
              {!passShow ? "Show" : "Hide"}
            </div>
            </div>
          </div>
          <div className='form_input'>
            <label htmlFor='password'>Confirm Password</label>
            <div className='two'>
            <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name='cpassword' id='cpassword' placeholder='Confirm password'/>
            <div className='showpass' onClick={()=>setCPassShow(!cpassShow)}>
              {!cpassShow ? "Show" : "Hide"}
            </div>
            </div>
          </div>
          <button className='btn' onClick={addUserdata} >Sign up</button>
          <p>Already have an account? <NavLink to="/">Log In</NavLink> </p>
        </form>
      </div>
    </section>
    </>
  )
}

export default Register
