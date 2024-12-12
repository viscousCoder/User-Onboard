import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";

const RootFile = () => {
  return (
    <>
      <Header />
      <Box sx={{ mt: { xs: "64px", lg: "64px" }, ml: 0, mr: 0, p: 0 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default RootFile;
