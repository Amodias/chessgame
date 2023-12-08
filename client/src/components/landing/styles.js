import { styled, keyframes } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "95%",
  marginLeft: "5%",
  zIndex: 2,
});

export const SecondColumn = styled("div")({
  flex: 1,
  display: "flex",
  zIndex: 4,
  alignItems: "center",
  justifyContent: "center",

  flexDirection: "column",
});

export const FirstColumn = styled("div")({
  marginTop: "5%",
  height: "calc(85% - 10px)",
  flex: "2%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const colorChangeAnimation = keyframes`
    from {
      color: white;
    }
    to {
      color: black;
    }
  `;

export const Piece = styled(FontAwesomeIcon)(({ animation }) => ({
  fontSize: "4rem",
  color: "white",
  marginRight: 10,
  animation: animation || "none",
  transition: "color 4s",
}));

export const BoxContainer = styled("div")({
  border: "2px solid black",
  borderRadius: "8px",
  boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
  opacity: 0.5,
  paddingBlock: 10,
  width: "100%",
  transition: "opacity 0.3s ease-in-out",
  cursor: "pointer",
  zIndex: 4,
  "&:hover": {
    opacity: 1,
  },
});
export const ButtonContainer = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  cursor: "pointer",
  background: "none",
  fontSize: "1.5rem",
  padding: "8px",
});
export const ComponentContainer = styled("div")({
  marginBottom: "20px",
  padding: "20px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
});

export const Title = styled("h2")({
  fontSize: "1.5rem",

  color: "white",
});

export const Definition = styled("p")({
  fontSize: "1rem",
  marginTop: "8px",

  marginBottom: "16px",
  color: "white",
});
