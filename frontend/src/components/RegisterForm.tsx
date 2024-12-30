// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Typography,
//   // Typography,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const RegisterForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [formValues, setFormValues] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validate = (): boolean => {
//     let valid = true;
//     const newErrors = {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };

//     // Username validation
//     if (!formValues.username || formValues.username.length < 4) {
//       newErrors.username = "Username must be at least 4 characters.";
//       valid = false;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formValues.email || !emailRegex.test(formValues.email)) {
//       newErrors.email = "Invalid email format.";
//       valid = false;
//     }

//     // Password validation
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
//     if (!formValues.password || !passwordRegex.test(formValues.password)) {
//       newErrors.password =
//         "Password must be 8-15 characters, include a letter and a number.";
//       valid = false;
//     }

//     // Confirm Password validation
//     if (formValues.password !== formValues.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log("Form Submitted Successfully", formValues);
//       // calling the psot api
//       try {
//         const response = await axios.post("http://localhost:8000/signup", {
//           username: formValues.username,
//           email: formValues.email,
//           password: formValues.password,
//         });
//         console.log(response.status, "hii");
//         if (response.status == 201) {
//           toast.success("Register successfully");
//           navigate("/login");
//         }
//       } catch (error) {
//         toast.error("Email already exist");
//         setErrors({
//           username: "",
//           email: "Email already exist",
//           password: "",
//           confirmPassword: "",
//         });
//         console.log(errors);
//       }
//     }
//   };

//   // const googleAuth = () => {
//   //   window.open("http://localhost:8000/auth/google/callback", "_self");
//   // };
//   const google = () => {
//     window.open("http://localhost:8000/auth/google", "_self");
//   };

//   // const loginwithgoogle = () => {
//   //   window.open("http://localhost:8000/auth/google/callback", "_self");
//   // };
//   return (
//     <form onSubmit={handleSubmit} method="post">
//       <TextField
//         label="Username"
//         fullWidth
//         margin="normal"
//         name="username"
//         value={formValues.username}
//         onChange={handleInputChange}
//         error={Boolean(errors.username)}
//         helperText={errors.username}
//       />
//       <TextField
//         label="Email"
//         fullWidth
//         margin="normal"
//         name="email"
//         value={formValues.email}
//         onChange={handleInputChange}
//         error={Boolean(errors.email)}
//         helperText={errors.email}
//       />
//       <TextField
//         label="Password"
//         fullWidth
//         margin="normal"
//         type={showPassword ? "text" : "password"}
//         name="password"
//         value={formValues.password}
//         onChange={handleInputChange}
//         error={Boolean(errors.password)}
//         helperText={errors.password}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <TextField
//         label="Confirm Password"
//         fullWidth
//         margin="normal"
//         type={showConfirmPassword ? "text" : "password"}
//         name="confirmPassword"
//         value={formValues.confirmPassword}
//         onChange={handleInputChange}
//         error={Boolean(errors.confirmPassword)}
//         helperText={errors.confirmPassword}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         color="primary"
//         sx={{ mt: 2 }}
//       >
//         Register
//       </Button>
//       <Typography textAlign="center" my={2}>
//         or
//       </Typography>
//       <Button
//         fullWidth
//         variant="outlined"
//         color="primary"
//         sx={{ mb: 2 }}
//         // onClick={handleGoogleClick}
//         onClick={google}
//       >
//         Login with Google
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;

import React, { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  CircularProgress,
  Autocomplete,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image from "../assets/google.png";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Address autocomplete state
  const [addressOptions, setAddressOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const apiData = (query: string) => {
    if (!query.trim()) {
      setAddressOptions([]);
      return;
    }

    setLoading(true);
    const config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=94a5631c98e84c2fb7233fcbe791569e`,
    };

    axios(config)
      .then((response) => {
        const results = response.data.features.map(
          (item: any) => item.properties.formatted
        );
        setAddressOptions(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedApiCall = useCallback(
    (query: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeoutId = setTimeout(() => {
        apiData(query);
      }, 500);

      setDebounceTimeout(timeoutId);
    },
    [debounceTimeout]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setFormValues({ ...formValues, address: newValue });
    debouncedApiCall(newValue);
  };

  const handleAddressChange = (
    event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    setFormValues({ ...formValues, address: newValue || "" });
  };

  const validate = (): boolean => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    };

    // Username validation
    if (!formValues.username || formValues.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters.";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email || !emailRegex.test(formValues.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!formValues.password || !passwordRegex.test(formValues.password)) {
      newErrors.password =
        "Password must be 8-15 characters, include a letter and a number.";
      valid = false;
    }

    // Confirm Password validation
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    // Address validation
    if (!formValues.address) {
      newErrors.address = "Address is required.";
      valid = false;
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
          "http://localhost:8000/signup",
          formValues
        );
        if (response.status === 201) {
          toast.success("Register successfully");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Email already exist");
        setErrors({
          ...errors,
          email: "Email already exist",
        });
        console.log(errors);
      }
    }
  };

  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
      });
      // console.log(response.data.user._id, "Data");
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

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <form onSubmit={handleSubmit} method="post">
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        name="username"
        value={formValues.username}
        onChange={handleInputChange}
        error={Boolean(errors.username)}
        helperText={errors.username}
      />
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
      <TextField
        label="Confirm Password"
        fullWidth
        margin="normal"
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formValues.confirmPassword}
        onChange={handleInputChange}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        freeSolo
        options={addressOptions}
        inputValue={formValues.address}
        onInputChange={handleAddressInputChange}
        onChange={handleAddressChange}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Address"
            fullWidth
            margin="normal"
            error={Boolean(errors.address)}
            helperText={errors.address}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Register
      </Button>
      <Typography textAlign="center" my={2}>
        or
      </Typography>

      <Button
        startIcon={<Avatar src={Image} />}
        onClick={google}
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

export default RegisterForm;
