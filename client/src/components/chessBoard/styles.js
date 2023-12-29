import { styled } from "@mui/material/styles";

export const ChessboardContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
});

export const ChessboardRow = styled("div")({
  display: "flex",
});

export const ChessboardSquare = styled("div")(({ theme }) => ({
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
  borderColor: theme.palette.text.primary,
}));
