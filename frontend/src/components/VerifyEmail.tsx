import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
interface User {
  emailToken?: string;
  isVerified?: boolean;
}

const VerifyEmail = () => {
  const apiuri = import.meta.env.VITE_SECRET_API_URL;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useSelector<RootState, User | null>((state) => state.user.user);
  const userEmailToken = user?.emailToken;

  const isVerified = user?.isVerified;
  // const imageUrl = "https://via.placeholder.com/150";
  const veridedImageUrl =
    "https://www.veeforu.com/wp-content/uploads/2023/09/instagram-verified-logo-png-download-1024x576.png";
  const imageUrl =
    "https://st4.depositphotos.com/7662228/30134/v/450/depositphotos_301346962-stock-illustration-green-check-mark-and-red.jpg";
  const emailToken = searchParams.get("emailToken");
  console.log("emailToken", emailToken);

  const postRequest = async (url: string, body: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await response.json();

    if (!response.ok) {
      let message;
      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
      return { error: true, status: response.status, message };
    }
    return data;
  };

  useEffect(() => {
    (async () => {
      if (emailToken) {
        // request
        const response = await postRequest(
          `${apiuri}/verify-email`,
          // `https://user-onboard.onrender.com/verify-email`,
          // `http://localhost:8000/verify-email`,
          JSON.stringify({ emailToken })
        );
        console.log(response, "response");

        if (response.error) {
          console.log(response);
        }
        // updateUser(response);
        console.log(response, "UserData");
      }
    })();
  }, [emailToken, user, searchParams]);

  async function handlemail() {
    try {
      const response = await axios.post(
        `${apiuri}/sendemail`,
        // "https://user-onboard.onrender.com/sendemail",
        // "http://localhost:8000/sendemail",
        {
          emailToken: userEmailToken,
        }
      );
      if (response.status == 200) {
        toast.success("verifiaction email sent");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleBank = () => {
    navigate("/bank");
  };

  return (
    <>
      {isVerified == false ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          padding={2}
        >
          <Card sx={{ maxWidth: 400, boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                align="center"
                gutterBottom
              >
                Verified You
              </Typography>
              <Avatar
                alt="Verified"
                src={imageUrl}
                sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
              />
              <Typography variant="body1" align="center" color="text.secondary">
                Your account has been unverifed to verify your account click on
                the sent button. Email will be sent your authenticated email
                address.
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlemail}
                >
                  Send Verification Email
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          padding={2}
        >
          <Card sx={{ maxWidth: 400, boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                align="center"
                gutterBottom
              >
                Your account is verified
              </Typography>
              <Avatar
                alt="Verified"
                src={veridedImageUrl}
                sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
              />
              <Typography variant="body1" align="center" color="text.secondary">
                Your account is verified account, you can go to the bank routes
                and also check your Bank details.
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBank}
                >
                  Bank details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default VerifyEmail;
