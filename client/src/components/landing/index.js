import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MultiplayerComponentFirstColumn, MultiplayerComponentSecondColumn } from '../landing/multiplayer';
import { SingleplayerComponentSecondColumn } from '../landing/singleplayer';
import { IAComponentSecondColumn } from '../landing/ia';

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
  width: '95%',
  marginLeft: '5%',
  zIndex: 2,
});

const SecondColumn = styled('div')({
  flex: 1,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(84, 84, 84, 0.8)',
});

const FirstColumn = styled('div')({
  backgroundColor: '#f5f5f5',
  marginTop: '5%',
  height: 'calc(85% - 10px)',
  flex: '2%',
  zIndex: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(84, 84, 84, 0.2)',
  width:'20px',
});

const CarouselContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CarouselItem = styled('div')({
  height: '100%',
});

const LandingHomeComponent = () => {
  return (
    <Container>
      <FirstColumn>
        <MultiplayerComponentFirstColumn/>
      </FirstColumn>
      <SecondColumn>
        <CarouselContainer>
          <Carousel showThumbs={false} infiniteLoop autoPlay>
            <CarouselItem>
              <SingleplayerComponentSecondColumn/>
            </CarouselItem>
            <CarouselItem>
            <MultiplayerComponentSecondColumn />
            </CarouselItem>
            <CarouselItem>
            <IAComponentSecondColumn />
            </CarouselItem>
          </Carousel>
        </CarouselContainer>
      </SecondColumn>
    </Container>
  );
};

export default LandingHomeComponent;
