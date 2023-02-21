import React, { useEffect, useState} from 'react'
import Details from '../Details/Details';
import './CSS/mix.css'



const Dashboard = ()=>{
    const [npks, setnpks] = useState([]);
    //const [Id,setId] =useState('');

    //store token in local storage
    //  const DashboardValid = async()=>{
    //      let token = localStorage.getItem("usersdatatoken");
    //      //console.log(token);
        
    //     //   const res = await fetch("/user/validuser",{
    //     //      method:"GET",
    //     //      headers:{
    //     //          "Content-Type":"application/json",
    //     //          "Authorization": token
    //     //      }
    //     //   });

    //       const data = await res.json();
    //       console.log(data);
    // }

     useEffect(()=>{
        // DashboardValid();  
     },[])

     useEffect(() => {
        const getnpks = async ({params}) => {
          const resnpks = await fetch(`http://localhost:5000/npk/${params.postId}`,{
            method:"GET"
          })
          const resnpk = await resnpks.json();
          console.log(resnpk);
          setnpks(await resnpk);
        }
        getnpks();
      }, []);


    return(
       <div>
        <Details npks={npks}></Details>
       </div>
    );
}

export default Dashboard