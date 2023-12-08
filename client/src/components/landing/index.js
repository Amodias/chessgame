import React, { useState, useEffect } from "react";
import {
  Container,
  SecondColumn,
  FirstColumn,
  colorChangeAnimation,
  Piece,
  BoxContainer,
  ButtonContainer,
  ComponentContainer,
  Title,
  Definition,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";

const BorderedBox = ({ children }) => {
  return <BoxContainer>{children}</BoxContainer>;
};

const ChessButton = ({ icon }) => {
  return (
    <ButtonContainer>
      {icon && <FontAwesomeIcon icon={icon} color="white" />}
    </ButtonContainer>
  );
};

const ChessComponent = ({ title, definition, icon }) => {
  return (
    <BorderedBox>
      <ComponentContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            justifyContent: "center",
          }}
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
    }, 1600);
    return () => clearInterval(pieceChangeInterval);
  }, []);

  return (
    <Container>
      <FirstColumn>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chessPieces.map((icon, index) => {
            const animation =
              index === currentPieceIndex
                ? `${colorChangeAnimation} 1s forwards`
                : "none";
            const animationDelay =
              index === currentPieceIndex ? "0s" : `${index * 2}s`;

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
        <p style={{ color: "white", padding: "20px" }}>
          Chess Online Game, still hot from the {"</>"} backery
        </p>
      </FirstColumn>
      <SecondColumn>
        <ChessComponent
          title="Multiplayer"
          definition="Engage in thrilling battles against friends or foes from across the globe, showcasing your chess prowess."
          icon={faGlobe}
        />

        <ChessComponent
          title="IA"
          definition="The AI opponent offers a challenging chess experience, utilizing unique strategies and tactics to test your skills."
          icon={faMicrochip}
        />
        <ChessComponent
          title="Singleplayer"
          definition="In Singleplayer mode, challenge yourself by playing against Mr. Roboto - your virtual doppelgänger on the chessboard."
          icon={faChessBoard}
        />
      </SecondColumn>
    </Container>
  );
};

export default LandingHomeComponent;
