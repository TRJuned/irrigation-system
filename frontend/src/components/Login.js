import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./CSS/mix.css"

const Login = () => {

    const [passShow,setPassShow] = useState(false);

    const [inpval,setInpval] = useState({
        email:"",
        password:""
    });

    console.log(inpval);

    const setVal = (e)=>{
        // console.log(e.target.value);
        const {name,value} = e.target;
 
        setInpval(()=>{
         return {
             ...inpval,
             [name]:value
         }
        })
     };

     const loginUser = async (e)=>{
        e.preventDefault();

        const {email,password} = inpval;

        if(email === ""){
            alert("Please Enter Your Email");
        }
        else if(!email.includes("@")){
            alert("enter valid email");
        }
        else if(password === ""){
            alert("Please Enter Password");
        }
        else if(password.length < 6){
            alert("Password must be 6 char");
        }
        else{
            //console.log("User Login successfull");

            const data = await fetch("/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,password
                })
            });

            const res = await data.json();
            // console.log(res);

            if(res.status === 201){
                 localStorage.setItem("usersdatatoken",res.result.token)
                 setInpval({...inpval,email:"",password:""});
            }
        }
     }

  return (
   <>
        <section>
            <div className= "form_data">
                <div className= "form_heading">
                    <h1>Welcome Back, Log In</h1>
                    <p>Glad to see you here!</p>
                </div>

                <form>
                    <div className= "form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address'/>
                        
                    </div>
                    <div className= "form_input">
                        <label htmlFor="password">Password</label>
                        <div className='two'>
                        <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your Password'/>
                        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                        </div>   
                    </div>

                    <button className='btn' onClick={loginUser}>Login</button>
                    <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
                </form>
            </div>

        </section>
   </>
  )
}

export default Login
