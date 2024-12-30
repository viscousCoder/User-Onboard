import { useEffect, useState } from "react";
import {
  Stack,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Button,
  Drawer,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { DarkMode, LightMode } from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";
// import logo from "../../assets/logo2.jpeg";

// Type definition for page data
interface Page {
  name: string;
  id: string;
}

const pages: Page[] = [
  { name: "Home", id: "home" },
  { name: "Table", id: "table" },
  { name: "Bank", id: "bank" },
  { name: "Verify", id: "verify-email" },
  // { name: "Address", id: "address" },
];

// Type definition for NavList props
interface NavListProps {
  closeDrawer: () => void;
  [key: string]: any; // Add other props if needed
}

const NavList = ({ closeDrawer, ...props }: NavListProps) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const curr = JSON.parse(localStorage.getItem("currentUser"));
  console.log("hello data", curr);
  const iconLogo = curr?.username?.slice(0, 1).toUpperCase();
  const isDark = false;

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser") || null);
  }, []);

  function handleChange() {
    setOpen(false);
    setAnchorEl(null);
  }

  function handleAvtarClick(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://user-onboard.onrender.com/logout",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("itemId");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isverified");
        navigate("/register"); // Redirect to login page manually
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error: any) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Stack
      overflow="auto"
      direction={{ xs: "column", sm: "row" }}
      gap={3}
      ml={{ xs: 3, sm: 0 }}
      mt={{ xs: 3, sm: 0 }}
      width={{ xs: "150px", sm: "initial" }}
      {...props}
    >
      {pages.map((page) => (
        <Button
          key={page.id}
          sx={{
            color: { xs: "primary", sm: "white" },
          }}
          component={RouterLink}
          to={page.id === "home" ? "/" : `/${page.id}`}
          onClick={closeDrawer}
        >
          {page.name}
        </Button>
      ))}

      <Button onClick={handleAvtarClick}>
        <Avatar sx={{ bgcolor: deepOrange[500] }} alt="User Image">
          {iconLogo}
        </Avatar>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleChange}>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography sx={{ color: isDark ? "white" : "#1976d2" }}>
              {isDark ? "Light Mode" : "Dark Mode"}
            </Typography>
            <IconButton onClick={handleChange}>
              {!isDark ? (
                <DarkMode sx={{ color: isDark ? "white" : "#1976d2" }} />
              ) : (
                <LightMode sx={{ color: isDark ? "white" : "#1976d2" }} />
              )}
            </IconButton>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ color: isDark ? "white" : "#1976d2" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        onClick={toggleDrawer(true)}
        sx={{
          color: "white",
          display: { xs: "flex", sm: "none" },
          left: "24px",
        }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          display: { xs: "inherit", sm: "none" },
        }}
      >
        <NavList closeDrawer={closeDrawer} />
      </Drawer>
      <NavList
        sx={{
          display: { xs: "none", sm: "inherit" },
        }}
        closeDrawer={closeDrawer}
      />
    </>
  );
};

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const user = useSelector<RootState>((state) => state.user.user?.isVerified);

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://user-onboard.onrender.com/login/success",
        {
          withCredentials: true,
        }
      );
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
  // const getCurrentUser = async () => {
  //   try {
  //     const response = await axios.get("https://user-onboard.onrender.com/userData", {
  //       headers: { token: token },
  //     });
  //     // console.log(response.data.user._id, "Data");
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("accessToken", response.data.user.accessToken);
  //     localStorage.setItem("itemId", response.data.user.itemId);

  //     localStorage.setItem("userId", response.data.user._id);
  //     setUserdata(response.data.user);
  //     navigate("/");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  useEffect(() => {
    if (!token) {
      getUser();
    } else {
      // getCurrentUser();
      dispatch(getCurrentUser(token));
    }
  }, [token]);
  return (
    <AppBar>
      <Container sx={{ maxWidth: { xs: "100%" }, p: 0 }}>
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Avatar>
              <IconButton>
                {/* <img src={logo} height={"55px"} width={"61px"} /> */}
                <Typography>A</Typography>
              </IconButton>
            </Avatar>
            <Nav />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
