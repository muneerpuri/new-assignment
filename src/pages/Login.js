import React from 'react'
import styled from '@emotion/styled'
import { TextField ,Button,CircularProgress,Typography} from '@mui/material';
import {addUser} from '../redux/actions/userActions'
import { useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom';
const MainBody = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #FFFFFF;
background-image: linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%);
display: flex;
justify-content: center;
align-items: center;

`;

const FormContent = styled.div`
width: fit-content;
margin:auto;
background: white;
border: 1px solid black;
border-radius: 40px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
position: relative;
padding: 50px;

`;

const FormField = styled(TextField)`
margin: 10px auto;
background: white;
`;
const SubmitButton = styled(Button)`
margin: 10px auto;
`;
function Login() {
    const [loading,setLoading] = React.useState(false)


    function handleCallBackResponse(res){
        dispatch(addUser(res.credential))
        history('/')
      }
      React.useEffect(()=>{
    
        window.google.accounts.id.initialize({
          client_id:"231803587282-8agelapjt6uhnhgn82nog6m87p17hdis.apps.googleusercontent.com",
          callback:handleCallBackResponse
        })
        window.google.accounts.id.renderButton(
          document.getElementById('signDiv'),
          {theme:"outline",size:"large"}
        )
     // eslint-disable-next-line
      },[])
    const history = useNavigate()
    const dispatch = useDispatch();
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
    function submitData(){
        if(!ValidateEmail(email)){
            alert("Please enter valid email")
        }else if(password === ""){
          alert("please enter valid password")

        }else{
            setLoading(true)

            setTimeout(()=>{
                setLoading(false)
                dispatch(addUser('eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1NDIyNTYxNSwiaWF0IjoxNjU0MjI1NjE1fQ._6NU_f1BU7SwE8f59fN02r-DvrMhd4U7MlVtRFPwKz0'))
    
                history('/')
            },3000)
        }
    }

  return (
    <MainBody>

        <FormContent>
          <Typography variant="h4">Sign In</Typography>
        <FormField value={email} onChange={(e)=>{
            setEmail(e.target.value)
        }}  autoComplete='off' label="Email" variant="outlined" type="email" required />
        <FormField value={password} onChange={(e)=>{
            setPassword(e.target.value)
        }} autoComplete='off' label="Password" variant="outlined" type="password" required/>
        {loading?<CircularProgress style={{margin:"10px auto"}}/>:<SubmitButton onClick={submitData} variant="contained">Submit</SubmitButton>}
        <div id="signDiv"></div>

        </FormContent>
    </MainBody>
  )
}

export default Login