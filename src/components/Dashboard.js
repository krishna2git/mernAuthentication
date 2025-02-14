import React, { useContext, useEffect ,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

   const {logindata,setLoginData} = useContext(LoginContext);

   const [data,setData] = useState(false);
   

   const history = useNavigate();


    const DashboardValid =async()=>{
         let token = localStorage.getItem("usersdatatoken");
         
         const res = await fetch("/validuser",{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization":token
            }
         });

         const data =await res.json();
         
         if(data.status === 401 || !data){
            history("*");
           


         }else{
            console.log("user verify");
            setLoginData(data)
            history("/dash");
         }

    }
    

    useEffect(()=>{
      setTimeout(() => {
        DashboardValid();
        setData(true)
      },2000)
      
    },[])




  return (
    <>
    {
      data ?  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <img src='./download.jpg' alt='' />
      <h1>user Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
   </div> : <Box sx={{ display: 'flex' , justifyContent:"center",alignItems: "center", height: "100vh" }}>
    Loading... &nbsp;
  <CircularProgress />
</Box>
    }
    </>
  )
}

export default Dashboard
