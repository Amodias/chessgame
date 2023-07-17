import React from 'react';
import { styled } from '@mui/material/styles';

const FullImage = styled('div')({
  width: '100%',
  height: '100%',

  backgroundImage: "url('https://i.pinimg.com/564x/96/06/c9/9606c99cef4c125a4d88bdb71303e3b9.jpg')",
  backgroundSize: 'cover',  
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const SingleplayerDescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#ffffff',
});

const SingleplayerHeading = styled('h1')({
    fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '2rem',
});

const SingleplayerContent = styled('p')({
  fontSize: '1.2rem',
  textAlign: 'center',
  maxWidth: '500px',
});

export const SingleplayerComponentFirstColumn = () => {
  return (
    <>
      <FullImage />
    </>
  );
};

export const SingleplayerComponentSecondColumn = () => {
  return (
    <>
      <SingleplayerDescription>
        <SingleplayerHeading>Singleplayer</SingleplayerHeading>
        <SingleplayerContent>
          In singleplayer mode, you can play against computer-controlled opponents. Test your skills and improve your chess strategies. Enjoy the game at your own pace!
        </SingleplayerContent>
      </SingleplayerDescription>
    </>
  );
};
