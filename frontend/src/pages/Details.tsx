import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// Define the type for the image URLs
const imageUrls: string[] = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkfTxj-0Pm9HfJi1zovalGxxX-d_XZ-qBpvw&s", // First Image
  "https://www.shutterstock.com/image-photo/email-icon-messenger-notification-on-260nw-2262757835.jpg", // Second Image
  "https://www.shutterstock.com/image-photo/human-use-smartphone-online-banking-260nw-2306202875.jpg", // Third Image
];

const Details: React.FC = () => {
  // const theme = useTheme();

  return (
    <Container>
      {/* Section 1 */}
      <Grid container spacing={4} alignItems="center">
        {/* Image on left, Card on right on larger screens */}
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            component="img"
            image={imageUrls[0]}
            alt="Favorite Place 1"
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Get Authenticated
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create a new account by registering with your email and
                password, or log in if you already have an account. Secure your
                personal data, and easily verified your account. Access
                exclusive features and personalized content once authenticated.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Section 2 (Text on Left, Image on Right) */}
      <Grid container spacing={4} alignItems="center">
        {/* Card on left, Image on right */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Verified your email
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Verify your email to gain access to your account and view your
                bank details securely. Check your inbox for the verification
                email and click the link to confirm. If you didn’t receive it,
                request a new verification email.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            component="img"
            image={imageUrls[1]}
            alt="Favorite Place 2"
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>

      {/* Section 3 (Image on Left, Text on Right) */}
      <Grid container spacing={4} alignItems="center">
        {/* Image on left, Card on right */}
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            component="img"
            image={imageUrls[2]}
            alt="Favorite Place 3"
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Get Bank Details
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Link your bank account to securely view details of all your
                accounts. After verifying your email, follow the prompts to
                connect your bank, and easily access your transaction history,
                balances, and other account information in one place.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
