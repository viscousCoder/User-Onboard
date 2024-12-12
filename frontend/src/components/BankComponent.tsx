// import { Box, Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";

// const BankComponent = () => {
//   const [token, setToken] = useState<string | null>(null);
//   console.log("Accesstoken", token);
//   const userId = localStorage.getItem("userId");
//   const linkAccount = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/create_link_token"
//       );
//       // console.log(response, "hiii");
//       const data = await response.data;

//       const linkToken = data?.link_token;
//       console.log(linkToken);

//       const linkHandler = (window as any).Plaid.create({
//         token: linkToken,
//         onSuccess: async (publicToken: string) => {
//           try {
//             const res = await axios.post(
//               "http://localhost:8000/get_access_token",
//               { publicToken, userId }, // Request body
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             );
//             const tokenData = res.data; // No need for `await` on `res.data`
//             console.log(tokenData);
//             setToken(tokenData.accessToken);
//           } catch (error) {
//             console.error("Error fetching access token:", error);
//           }
//         },
//         onExit: (err: any) => {
//           if (err) console.error(err);
//         },
//       });

//       linkHandler.open();
//     } catch (error) {
//       console.error("Error creating link token:", error);
//     }
//   };
//   return (
//     <>
//       <Box>
//         <Typography variant="h4" component="h2">
//           Link Your Bank With Plaid Services
//         </Typography>
//         <Typography variant="body1">
//           {" "}
//           A sample end-to-end integration with Plaid
//         </Typography>

//         <Box sx={{ mt: 3 }}>
//           <Typography variant="body1">
//             {" "}
//             The Plaid flow begins when your user wants to connect their bank
//             account to your app. Simulate this by clicking the button below to
//             launch Link - the client-side component that your users will
//             interact with in order to link their accounts to Plaid and allow you
//             to access their accounts via the Plaid API.
//           </Typography>
//         </Box>
//         <Box mt={2}>
//           <Button variant="contained" color="primary" onClick={linkAccount}>
//             Link Account
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default BankComponent;

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import BankProductCompo from "./BankProductCompo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getCurrentUser } from "../store/userSlice";

const BankComponent = () => {
  const [token, setToken] = useState<string | null>(null); // State to hold the accessToken
  const userId = localStorage.getItem("userId") || null;
  const tokenUser = localStorage.getItem("token") || null;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser(tokenUser));
  }, [token]);

  // console.log(userId, "Data");

  // Function to link the bank account
  const linkAccount = async () => {
    try {
      // Request to create a link token
      const response = await axios.post(
        "http://localhost:8000/create_link_token"
      );
      const { link_token: linkToken } = response.data;
      console.log("Link Token:", linkToken);

      const linkHandler = (window as any).Plaid.create({
        token: linkToken, // Token for Plaid
        onSuccess: async (publicToken: string) => {
          try {
            // Exchange public token for access token
            const res = await axios.post(
              "http://localhost:8000/get_access_token",
              { publicToken, userId: userId }, // Pass publicToken and userId
              { headers: { "Content-Type": "application/json" } }
            );

            const { accessToken } = res.data; // Destructure accessToken
            console.log("Access Token:", accessToken);
            setToken(accessToken); // Update state with accessToken
          } catch (error) {
            console.error("Error fetching access token:", error);
          }
        },
        onExit: (err: any) => {
          if (err) console.error("Plaid Link exit error:", err);
        },
      });

      linkHandler.open(); // Open the Plaid Link modal
    } catch (error) {
      console.error("Error creating link token:", error);
    }
  };
  const accessToken = localStorage.getItem("accessToken") || null;

  return (
    <>
      {/* // !accessToken && ( */}
      <Container>
        <Box>
          <Typography variant="h4" component="h2">
            Link Your Bank With Plaid Services
          </Typography>
          <Typography variant="body1">
            A sample end-to-end integration with Plaid
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1">
              The Plaid flow begins when your user wants to connect their bank
              account to your app. Simulate this by clicking the button below to
              launch Link - the client-side component that your users will
              interact with in order to link their accounts to Plaid and allow
              you to access their accounts via the Plaid API.
            </Typography>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={linkAccount}>
              Link Account
            </Button>
          </Box>
          {token && (
            <Box mt={2}>
              <Typography variant="body1" color="success.main">
                Bank linked successfully! Access Token: {token}
              </Typography>
            </Box>
          )}
        </Box>
        <BankProductCompo />
      </Container>
    </>
  );
  // );
};

export default BankComponent;
