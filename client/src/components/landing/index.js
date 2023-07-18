import React, { useState, useEffect } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChessKing,
  faChessKnight,
  faChessBishop,
  faChessPawn,
  faChessQueen,
  faChessRook,
  faGlobe,
faMicrochip,
faChessBoard,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
  width: '95%',
  marginLeft: '5%',
  zIndex: 2,
});

const SecondColumn = styled('div')({
  flex: 1,
  display: 'flex',
  zIndex :4,
  alignItems: 'center',
  justifyContent: 'center',

  flexDirection: 'column', // Update to use column direction
});

const FirstColumn = styled('div')({
  marginTop: '5%',
  height: 'calc(85% - 10px)',
  flex: '2%',
  display: 'flex', // Change display to 'flex'
  flexDirection: 'column', // Add 'flexDirection' property to stack children vertically
  alignItems: 'center',
  justifyContent: 'center',
});


const colorChangeAnimation = keyframes`
  from {
    color: white;
  }
  to {
    color: black;
  }
`;

const Piece = styled(FontAwesomeIcon)(({ animation }) => ({
  fontSize: '4rem',
  color: 'white',
  marginRight: 10,
  animation: animation || 'none',
  transition: 'color 4s',
}));

const BoxContainer = styled('div')({
  border: '2px solid black',
  borderRadius: '8px',
  boxShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
  opacity: 0.5,
  paddingBlock :10,
  width : '100%',
  transition: 'opacity 0.3s ease-in-out',
  cursor: 'pointer',
  zIndex : 4,
  '&:hover': {
    opacity: 1,
  },
});

const BorderedBox = ({ children }) => {
  return <BoxContainer>{children}</BoxContainer>;
};

const ButtonContainer = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  background: 'none',
  fontSize: '1.5rem',
  padding: '8px',
});

const ChessButton = ({ icon }) => {
  return <ButtonContainer>{icon && <FontAwesomeIcon icon={icon} color='white' />}</ButtonContainer>;
};

const ComponentContainer = styled('div')({
  marginBottom: '20px',
  padding: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
});

const Title = styled('h2')({
  fontSize: '1.5rem',
  
  color : 'white'
});

const Definition = styled('p')({
  fontSize: '1rem',
  marginTop: '8px',

  marginBottom: '16px',
  color : 'white'
});

const ChessComponent = ({ title, definition, icon }) => {
  return (
    <BorderedBox>
      <ComponentContainer>
        <div
        style={{display :'flex' , flexDirection:'row' ,justifyItems :'center' ,justifyContent :'center'}}
        >
        <ChessButton icon={icon} />
        <Title>{title}</Title>

        </div>
        <Definition>{definition}</Definition>
      </ComponentContainer>
    </BorderedBox>
  );
};

const LandingHomeComponent = () => {
  const [currentPieceIndex, setCurrentPieceIndex] = useState(-1);

  const chessPieces = [
    faChessRook,
    faChessKing,
    faChessKnight,
    faChessBishop,
    faChessPawn,
    faChessQueen,
  ];

  useEffect(() => {
    const pieceChangeInterval = setInterval(() => {
      setCurrentPieceIndex((prevIndex) => (prevIndex + 1) % chessPieces.length);
    }, 1600); // Change color every 2 seconds

    return () => clearInterval(pieceChangeInterval);
  }, []);

  return (
    <Container>
      <FirstColumn>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

        {chessPieces.map((icon, index) => {
          const animation =
            index === currentPieceIndex
              ? `${colorChangeAnimation} 1s forwards`
              : 'none';
          const animationDelay = index === currentPieceIndex ? '0s' : `${index * 2}s`;

          return (
            <Piece
              key={index}
              icon={icon}
              animation={animation}
              style={{
                animationDelay,
              }}
            />
          );
        })}
        </div>
        <p style={{color : 'white' , padding :'20px'}}>Chess Online Game, still hot from the {'</>'}  backery</p>
      </FirstColumn>
      <SecondColumn>
        <ChessComponent
          title="Multiplayer"
          definition="The King is the most important piece in chess and must be protected at all costs."
          icon={faGlobe}
        />
        <ChessComponent
          title="IA"
          definition="The Knight is unique in its ability to jump over other pieces on the board."
          icon={faMicrochip}
        />
        <ChessComponent
          title="Singleplayer"
          definition="Pawns are the weakest pieces, but they can promote to any other piece when reaching the opponent's back rank."
          icon={faChessBoard}
        />
      </SecondColumn>
    </Container>
  );
};

export default LandingHomeComponent;
