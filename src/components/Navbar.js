import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled'
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import {removeUser} from '../redux/actions/userActions'
import { useDispatch } from "react-redux";


const NavBar = styled.div`
width: 100%;
padding:10px 20px;
box-sizing: border-box;
background-color: #4158D0;
background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

`;

export default function Navbar() {

    const history = useNavigate()
    const dispatch = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts','Logout'].map((text, index) => (
          <ListItem button key={text} onClick={()=>{
            if(index===4){
                dispatch(removeUser())
                history('/')
            }
        }}>
            <ListItemIcon>
              {index===4?<LogoutIcon/>:index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <NavBar>
      
        <React.Fragment key={'right'}>
          <Button onClick={toggleDrawer('right', true)}><MenuIcon style={{fill:"black",transform: 'scale(1.8)'}}/></Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
     
    </NavBar>
  );
}
