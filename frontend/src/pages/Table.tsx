import { Box, Container } from "@mui/material";
import TableComponent from "../components/TableComponent";

const Table = () => {
  return (
    <>
      <Container
        sx={{
          height: "93vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/tablet-with-graph-it-pen-table-with-graph-it_1295550-28862.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.2,
            zIndex: -1,
          }}
        />
        <h1>User's Table</h1>
        <Box sx={{ mt: 4 }}></Box>
        <TableComponent />
      </Container>
    </>
  );
};

export default Table;
