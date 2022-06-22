import React from 'react'
import Navbar from '../components/Navbar'
import styled from '@emotion/styled'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { Link } from "react-router-dom";

import { ethers } from "ethers";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataBlock from '../components/DataBlock';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {userInfoData} from '../helper/helperData'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
const ParentBody = styled.div`
background-color: #FA8BFF;
background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
background-attachment: fixed;
width: 100%;


`;
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
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
  padding: 30px;
`;
const LinkBox = styled.div`
width: calc(100% - 20%);
  margin: auto;
  padding: 30px;
`;
const LinkBoxLink = styled.div`
width: calc(100% - 20%);
  margin: 15px auto;
  padding: 15px 15px;
  display: flex;
  justify-content:flex-end;
  align-items:center;
  background:white;
  box-sizing: border-box;
`;
const SideContentBox = styled.div`
  width:100%;
`;
const DataBlockDiv = styled.div`
  padding: 20px 0;
display:flex;
justify-content: space-between;
align-items:center;
@media all and (max-width: 600px) {
    
    flex-direction:column;
    }

`;
const DisplayCryptoRates = styled.div`
  background: white;
`;

function Home() {
  const [data, setdata] = React.useState({
    address: "",
    Balance: null,
  });

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
  
    // Asking if metamask is already present or not
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
  
    // Setting a balance
    getbalance(account);
  };
  return (
    <ParentBody>
    <Navbar/>
    {
    <FixedWidthDiv>
      <DataBlockDiv>
        <DataBlock background={"purple"} title={"Revenue"} icon={<MonetizationOnOutlinedIcon style={{fontSize:"500%",color:"lavender"}}/>} boldTitle={"$42,550"} subTitle={"$50,000 Last Month"}/>

        <DataBlock background={"blue"} title={"Orders Received"} icon={<AccountCircleOutlinedIcon style={{fontSize:"500%",color:"lightblue"}}/>} boldTitle={"456"} subTitle={"20% increase"}/>

      </DataBlockDiv>
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

      <TableHead>
          <TableRow>
            <TableCell align="left"><Typography variant="body1" style={{fontWeight:"bold"}}>Latest Customers</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userInfoData.map((row,index) => (
            <TableRow
              key={index+'aknslan'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="left">
              <img width="50" src={row.flagImg} alt=""/>
            </TableCell>
            <TableCell align="left">
              {row.country}
            </TableCell>
              <TableCell align="left">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </FixedWidthDiv>
  }
  <LinkBoxLink>
  <Link to="/users" underline="hover">
  View All Users
</Link>
  </LinkBoxLink>
<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

<Button onClick={btnhandler} variant="contained">
  Connect to Wallet
</Button>
</div>
  <LinkBox>
  <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Metamask Details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Address: {data.address}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Balance: {data.balance}
        </Typography>
      </CardContent>
    </Card>
  </LinkBox>
    </ParentBody>
  )
}

export default Home