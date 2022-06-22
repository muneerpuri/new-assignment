import React from 'react'
import styled from '@emotion/styled'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Avatar from '../assets/images/download.jpeg'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CircularProgress} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import { TextField,Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
const ParentBody = styled.div`
background-color: #FA8BFF;
background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
height: 100vh;
width: 100%;


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
const LoadingDiv = styled.div`
width:100%;
height:100vh;
display:flex;
justify-content: center;align-items:center;
box-sizing:border-box;

`;

const FixedWidthDiv = styled.div`
  width: calc(100% - 20%);
  margin: auto;
`;
const PaginationParent =  styled.div`
margin:20px;
box-sizing:border-box;
display:flex;
justify-content: center;align-items:center;

`;
const UserActionsBox = styled.div`

width: calc(100% - 20%);
  margin: auto;
  padding: 30px;
  display:flex;
  justify-content:space-between;
  align-items:center;
`;


function Home() {
  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        return value.name.toLowerCase().match(new RegExp(searchTerm, 'g'))
    })
}
  const [ content,setContent] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const [showForm,setShowForm] = React.useState(false)

  const [showEditForm,setShowEditForm] = React.useState(false)
  const [name,setName] = React.useState("")
  const [searchShow,setSearchShow] = React.useState(false)
  const [identifier,setIdentifier] = React.useState("")
  const [searchResults,setSearchResults] = React.useState([])
  const [username,setUsername] = React.useState("")
  const [email,setEmail] = React.useState("")
  const [website,setWebsite] = React.useState("")
  const [activePageTab, setActivePageTab] = React.useState(1);
  const itemsPerPage = 5;
  function DeleteUser(identifier){
    setContent(prev=>prev.filter((el)=>{
      return el.email !== identifier
    }))
  }
  React.useEffect(()=>{
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {setContent(json)
    setLoading(false)})
  },[])
  function addUser(isToBeEditied){
    if(!isToBeEditied){
      content.unshift({
        id:Math.floor(Math.random() * 1000),
        name:name,
        email:email,
        website:website,
        username:username
      })
      setShowForm(false)
    }else{
      let index = content.findIndex((el)=>{
       return el.email === identifier
      })
      if(index !== -1){
        let elem = content[index]
        elem.name=name
        elem.email=email
        elem.website=website
        elem.username=username
        console.log(elem)
        let newArray = content;
        newArray.splice(index,1,elem)
        setContent(newArray)
      }
    }


    setName("")
    setEmail("")
    setWebsite("")
    setUsername("")

  }
  const indexOfLastTodo = activePageTab * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  let activeData = content.slice(indexOfFirstTodo, indexOfLastTodo);
  return (
    <ParentBody>

    <FixedWidthDiv>
      <UserActionsBox>
      <TextField id="outlined-basic" style={{background:"white"}} label="Search" placeholder='Search by name...' onBlur={()=>{

setSearchShow(false)
      }} onFocus={()=>{
        setSearchShow(true)

      }} onChange={(e)=>{
        if(e.target.value === ""){
          setSearchResults(content)
        }
        setSearchResults(arraySearch(content,e.target.value))

      }} variant="outlined" />

      <Stack spacing={2} direction="row">

      <Button variant="contained" onClick={()=>{
        setShowForm(true)
      }}>Add User</Button>
      <Link to="/" style={{textDecoration:"none"}}>
      
      <Button style={{textDecoration:"none"}} variant="contained">Go to Home</Button>
      </Link>
      </Stack>


      </UserActionsBox>
     
    {loading?<LoadingDiv><CircularProgress  color="success"/></LoadingDiv>:
    
    
    
    (showForm===false && !showEditForm)?<TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">S.NO.</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Website</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchShow?searchResults.map((row,index) => (
            <TableRow
              key={index+'aknslan'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="center">
              {index+1}
            </TableCell>

            <TableCell align="center">
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}><img src={Avatar} alt="" width="50"/></div>

            </TableCell>
            <TableCell align="center" >
              {row.name}
            </TableCell>
              <TableCell align="center">
                {row.username}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.website}</TableCell>
              <TableCell align="center"><span><BorderColorIcon onClick={()=>{
                setIdentifier(row.email)
                setShowEditForm(true)
              }} style={{color:"blue",cursor:"pointer"}}/></span><span ><DeleteIcon onClick={()=>{
                DeleteUser(row.email)
              }} style={{color:"red",marginLeft:"5px",cursor:"pointer"}}/></span></TableCell>
            </TableRow>
          )):activeData.map((row,index) => (
            <TableRow
              key={index+'aknslan'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="center">
              {index+1}
            </TableCell>

            <TableCell align="center">
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}><img src={Avatar} alt="" width="50"/></div>

            </TableCell>
            <TableCell align="center" >
              {row.name}
            </TableCell>
              <TableCell align="center">
                {row.username}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.website}</TableCell>
              <TableCell align="center"><span><BorderColorIcon onClick={()=>{
                setIdentifier(row.email)
                setShowEditForm(true)
              }} style={{color:"blue",cursor:"pointer"}}/></span><span ><DeleteIcon onClick={()=>{
                DeleteUser(row.email)
              }} style={{color:"red",marginLeft:"5px",cursor:"pointer"}}/></span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>:null
    
    }
    {(!searchShow && showForm===false && !showEditForm)?<PaginationParent>
            <span style={{background:"white"}}>
              {console.log(itemsPerPage)}

    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(content.length / itemsPerPage)}
        renderItem={(item) => (
          <span 
          onClick={() => {
            activeData = []
            setActivePageTab(item.page)}}>

          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            />
            </span>
        )}
        />
    </Stack>
        </span>
            </PaginationParent>:null}

            </FixedWidthDiv>
           {(showForm && !showEditForm)&& <FormContent>
          <Typography variant="h4">User Details</Typography>
        <FormField value={name} onChange={(e)=>{
          setName(e.target.value)
        }}  autoComplete='off' label="Name" variant="outlined" type="text" required />
        <FormField value={username}  onChange={(e)=>{
          setUsername(e.target.value)
        }}  autoComplete='off' label="Username" variant="outlined" type="text" required />
        <FormField  value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }}  autoComplete='off' label="Email" variant="outlined" type="email" required />
        <FormField value={website}  onChange={(e)=>{
          setWebsite(e.target.value)
        }}  autoComplete='off'  label="Website" variant="outlined" type="text" required />
       <SubmitButton onClick={()=>{
        addUser(false)
       }}  variant="contained">Submit</SubmitButton>
       

        </FormContent>}

        {showEditForm&& <FormContent>
          <Typography variant="h4">User Details</Typography>
        <FormField value={name} onChange={(e)=>{
          setName(e.target.value)
        }}  autoComplete='off' label="Name" variant="outlined" type="text" required />
        <FormField value={username}  onChange={(e)=>{
          setUsername(e.target.value)
        }}  autoComplete='off' label="Username" variant="outlined" type="text" required />
        <FormField  value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }}  autoComplete='off' label="Email" variant="outlined" type="email" required />
        <FormField value={website}  onChange={(e)=>{
          setWebsite(e.target.value)
        }}  autoComplete='off'  label="Website" variant="outlined" type="text" required />
       <SubmitButton onClick={()=>{
        addUser(true)
        setShowEditForm(false)
       }}  variant="contained">Submit</SubmitButton>
       

        </FormContent>}
        
    </ParentBody>
  )
}

export default Home