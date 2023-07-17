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

const IADescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#ffffff',
});

const IAHeading = styled('h1')({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '2rem',
});

const IAContent = styled('p')({
  fontSize: '1.2rem',
  textAlign: 'center',
  maxWidth: '500px',
});

export const IAComponentFirstColumn = () => {
  return (
    <>
      <FullImage />
    </>
  );
};

export const IAComponentSecondColumn = () => {
  return (
    <>
      <IADescription>
        <IAHeading>AI</IAHeading>
        <IAContent>
           Challenge yourself and test your strategic skills against advanced AI algorithms. Enjoy the game with intelligent opponents!
        </IAContent>
      </IADescription>
    </>
  );
};

