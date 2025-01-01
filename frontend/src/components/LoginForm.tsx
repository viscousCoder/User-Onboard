import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Avatar,
  //   Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Image from "../assets/google.png";

const LoginForm: React.FC = () => {
  const apiuri = import.meta.env.VITE_SECRET_API_URL;
  console.log(apiuri);

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (): boolean => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formValues.email) {
      newErrors.email = "Please fill the field.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
        newErrors.email = "Invalid email format.";
        valid = false;
      }
    }

    // Password validation
    if (!formValues.password) {
      newErrors.password = "Please fill the field.";
      valid = false;
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
      if (!passwordRegex.test(formValues.password)) {
        newErrors.password =
          "Password must be 8-15 characters, include a letter and a number.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted Successfully", formValues);
      try {
        const response = await axios.post(
          `${apiuri}/signin`,
          // "http://localhost:8000/signin",
          // "https://user-onboard.onrender.com/signin",
          {
            email: formValues.email,
            password: formValues.password,
          }
        );
        if (response.status == 200) {
          toast.success("SignIn successfully");
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      } catch (error) {
        toast.error("Failed to login");
        console.log(errors);
      }
    }
  };

  const googleAuth = () => {
    // window.open("http://localhost:8000/auth/google", "_self");
    // window.open("https://user-onboard.onrender.com/auth/google", "_self");
    window.open(`${apiuri}/auth/google`, "_self");
  };

  const getUser = async () => {
    try {
      // const response = await axios.get(
      //   "https://user-onboard.onrender.com/login/success",
      //   {
      //     withCredentials: true,
      //   }
      // );
      // console.log(response.data.user._id, "Data");

      const response = await axios.get(
        `${apiuri}/login/success`,
        // "http://localhost:8000/login/success",
        // "https://user-onboard.onrender.com/login/success",
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("accessToken", response.data.user.accessToken);
      localStorage.setItem("itemId", response.data.user.itemId);
      localStorage.setItem("userId", response.data.user._id);
      // setUserdata(response.data.user);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type={showPassword ? "text" : "password"}
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Typography textAlign="center" my={2}>
        or
      </Typography>
      {/* <Button
        fullWidth
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
        onClick={googleAuth}
      >
        Login with Google
      </Button> */}
      <Button
        startIcon={<Avatar src={Image} />}
        onClick={googleAuth}
        fullWidth
        variant="outlined"
        color="primary"
        sx={{ mb: 2, p: 0 }}
      >
        Login with Google
      </Button>
    </form>
  );
};

export default LoginForm;
