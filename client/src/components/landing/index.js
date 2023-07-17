import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { MultiplayerComponentFirstColumn ,MultiplayerComponentSecondColumn } from '../landing/multiplayer';

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
  width : '95%',
  marginLeft : '5%',
  zIndex :2,
});

const SecondColumn = styled('div')({
  flex: 1,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor :'rgba(84, 84, 84, 0.8)',
});

const FirstColumn = styled('div')({
  backgroundColor: '#f5f5f5',
  marginTop: '5%',
  height: 'calc(85% - 10px)',
  flex: '2%',
  zIndex :4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor :'rgba(84, 84, 84, 0.2)',

});

const LandingHomeComponent = () => {
  return (
    <Container>
      <FirstColumn>
      <MultiplayerComponentFirstColumn/>
      </FirstColumn>
      <SecondColumn>
      <MultiplayerComponentSecondColumn/>
      </SecondColumn>
    </Container>
  );
};

export default LandingHomeComponent;
