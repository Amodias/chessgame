import React from 'react';
import { styled } from '@mui/material/styles';

const FullImage = styled('div')({
  width: '100%',
  height: '100%',

  backgroundImage: "url('https://i.pinimg.com/564x/96/06/c9/9606c99cef4c125a4d88bdb71303e3b9.jpg')",
backgroundSize :'cover',  
  backgroundRepeat :'no-repeat',
  backgroundPosition: 'center',
});

const MultiplayerDescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#ffffff',
});

const MultiplayerHeading = styled('h1')({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '2rem',
});


const MultiplayerContent = styled('p')({
  fontSize: '1.2rem',
  textAlign: 'center',
  maxWidth: '500px',
});

export const MultiplayerComponentFirstColumn = () => {
  return (
    <>
      <FullImage />
      
    </>
  );
};

export const MultiplayerComponentSecondColumn = () => {
    return (
      <>
       
        <MultiplayerDescription>
          <MultiplayerHeading>Multiplayer</MultiplayerHeading>
          <MultiplayerContent>
            In multiplayer mode, you can challenge other players from around the world. Play against friends or find opponents with similar skill levels. Have fun and improve your chess skills together!
          </MultiplayerContent>
        </MultiplayerDescription>
      </>
    );
  };

