// import { Button } from "@mui/material";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../store/userSlice";
// import { AppDispatch } from "../store/store";

// const HomePage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       dispatch(getCurrentUser(token));
//     }
//   }, []);

//   const navigate = useNavigate();

//   // const logout = async () => {
//   //   try {
//   //     const response = await axios.get("/logout", {
//   //       withCredentials: true, // Ensures cookies are sent with the request
//   //       headers: {
//   //         "Cache-Control": "no-store", // Disable caching for this request
//   //       },
//   //     });

//   //     if (response.status === 200) {
//   //       console.log("Logout successful");
//   //       navigate("/register"); // Redirect user after successful logout
//   //     } else {
//   //       console.error("Logout failed:", response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error(
//   //       "Error during logout:",
//   //       error.response?.data || error.message
//   //     );
//   //   }
//   // };

//   // const logout = async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:8000/logout", {
//   //       withCredentials: true, // Ensure cookies are sent with the request
//   //     });

//   //     if (response.status === 200) {
//   //       console.log("Logout successful");
//   //       navigate("/register"); // Redirect to login page manually
//   //     } else {
//   //       console.error("Logout failed:", response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error(
//   //       "Error during logout:",
//   //       error.response?.data || error.message
//   //     );
//   //   }
//   // };

//   return (
//     <div>
//       <h1>Welcome to the home page</h1>
//       {/* <Button onClick={logout}>Logout</Button> */}
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardHeader, Container } from "@mui/material";
import Details from "./Details";

const steps = [
  {
    label: "Logged in",
    description: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions.`,
  },
  {
    label: "Email Verification",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Link Bank Account",
    description: `Try out different ad text to see what brings in the most customers.`,
  },
];

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isverified") === "true";
  console.log(isVerified, "hii");
  const accessToken = localStorage.getItem("accessToken");

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
    }

    if (token) {
      setActiveStep(1); // Token is present, so step 1 is completed
    }

    if (isVerified) {
      setActiveStep(2); // Email is verified, so step 2 is completed
    }

    if (accessToken && accessToken !== "N/A") {
      setActiveStep(3); // Access token is valid, so step 3 is completed
    }
  }, [dispatch, token, isVerified, accessToken]);

  const isNextDisabled = () => {
    if (activeStep === 0 && !token) return true;
    if (activeStep === 1 && !isVerified) return true;
    if (activeStep === 2 && (!accessToken || accessToken === "N/A"))
      return true;
    return false;
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(https://media.istockphoto.com/id/1473446455/photo/onboarding-new-employee-process-concept-ensuring-that-the-new-employees-are-able-to-hit-the.jpg?s=612x612&w=0&k=20&c=emwz4hjfnXYRAIFydRNdSw4sDZYopGA6nRF6KZ5Rweo=)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { xs: "24rem", xl: "52rem" },
        }}
      ></Box>
      <Container>
        <Card sx={{ mt: 10, p: 3 }}>
          <CardHeader title={"Progress status"} />
          <CardContent>
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === steps.length - 1 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        {activeStep === steps.length ? (
                          <Button
                            variant="contained"
                            onClick={handlePreview}
                            sx={{ mt: 1 }}
                          >
                            Preview
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                              disabled={isNextDisabled()}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </>
                        )}
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you are authenticated users.
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Preview
                  </Button>
                </Paper>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Box sx={{ mt: 4 }}>
        <Details />
      </Box>
    </>
  );
};

export default HomePage;
