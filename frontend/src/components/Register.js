import React,{useState} from 'react'
import { Await, NavLink } from 'react-router-dom';
import "./CSS/mix.css"

const Register = () => {

    const [passShow,setPassShow] = useState(false);
    const [cpassShow,setCPassShow] = useState(false);

    const [inpval,setInpval] = useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
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

    const addUserdata = async(e)=>{
        e.preventDefault();

        const {fname,email,password,cpassword} = inpval;

        if(fname === ""){
            alert("Please Enter Your Name");
        }
        else if(email === ""){
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
        else if(cpassword === ""){
            alert("Please Enter Confirm Password");
        }
        else if(cpassword.length < 6){
            alert("Password must be 6 char");
        }
        else if(password !== cpassword){
            alert("Password and Confirm password not match");
        }
        else{
            //console.log("User registration successfully done");
            const data = await fetch("/user/register",{
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

            if(res.status === 201){
                alert("user registration done");
                setInpval({...inpval,fname:"",email:"",password:"",cpassword:""});
            }
         }
    }
  return (
    <>
        <section>
            <div className= "form_data">
                <div className= "form_heading">
                    <h1>Sign Up</h1>
                    <p style={{textAlign:"center"}}>Welcome To our Project</p>
                </div>

                <form>
                    <div className= "form_input">
                        <label htmlFor="fname">Name</label>
                        <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name'/>
                        
                    </div>
                    <div className= "form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address'/>
                        
                    </div>
                    <div className= "form_input">
                        <label htmlFor="password">Password</label>
                        <div className='two'>
                        <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your Password'/>
                        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                        </div>   
                    </div>
                    <div className= "form_input">
                        <label htmlFor="password">Confirm Password</label>
                        <div className='two'>
                        <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm Password'/>
                        <div className='showpass' onClick={()=>setCPassShow(!cpassShow)}>
                            {!cpassShow ? "Show" : "Hide"}
                        </div>
                        </div>   
                    </div>

                    <button className='btn' onClick={addUserdata}>SignUp</button>
                    <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                </form>
            </div>

        </section>
    </>
  )
}

export default Register
