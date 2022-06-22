import React from 'react'
import styled from '@emotion/styled'
import {Typography} from '@mui/material';
const DataBlock = styled.div`
width:45%;
border-radius:5px;
padding:20px;

display:flex;
justify-content: space-between;
align-items: center;
cursor:pointer;
@media all and (max-width: 600px) {
    
width:100%;
margin: 20px 0
}

`;

const ContentDataBox = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction: column;
color:white

`;

const ImageBox = styled.div`

display:flex;
justify-content: center;
align-items: center;
`;

function DataBlockComponent({background,title,icon,boldTitle,subTitle}) {
  return (
    <DataBlock style={{background:background}}>
        <ContentDataBox>
            <Typography variant="body1">{title}</Typography>
            <Typography variant="h5">{boldTitle}</Typography>
            <Typography variant="body1">{subTitle}</Typography>

        </ContentDataBox>
        <ImageBox>
            {icon} 

        </ImageBox>



    </DataBlock>
  )
}

export default DataBlockComponent