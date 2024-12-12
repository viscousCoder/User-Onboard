import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side (Form Section) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, p: 4 }}>
          <LoginForm />
          <Typography textAlign="center" mt={2}>
            New user?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Register
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Right Side (Image Section) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1677194562330-2210f33e2576?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww)", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
};

export default LoginPage;
