import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import DataGridToolbar from "./DataGridToolbar";
import { Button } from "@mui/material";

export default function TableComponent() {
  const apiuri = import.meta.env.VITE_SECRET_API_URL;

  const token = localStorage.getItem("token");
  const [tableData, setTableData] = React.useState<any[]>([]);
  async function getTableData() {
    try {
      const response = await axios.get(
        `${apiuri}/table/data`,
        // "http://localhost:8000/table/data",
        // "https://user-onboard.onrender.com/table/data",
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response.data.data);
      setTableData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getTableData();
  }, []);

  const rows = tableData?.map((user, index) => {
    const [firstName, lastName = ""] = user.username.split(" ");
    return {
      id: index + 1,
      firstName,
      lastName,
      email: user.email,
      isVerified: user.isVerified,
      address: user.address,
      // createdAt: user.createdAt,
    };
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },

    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "isVerified",
      headerName: "Verified",
      type: "string",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <span
          style={{
            color: params.value ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {params.value ? "Verified" : "Unverified"}
        </span>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
    },
  ];
  return (
    <Box sx={{ height: 409, width: "85rem", background: "white" }}>
      <DataGrid
        slots={{ toolbar: DataGridToolbar, baseButton: Button }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

/*

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const user = useSelector<RootState>((state) => state.user.user);
  const emailToken = user?.emailToken;
  const imageUrl = "https://via.placeholder.com/150";

  async function handlemail() {
    try {
      const response = await axios.post("https://user-onboard.onrender.com/sendemail", {
        emailToken,
      });
      if (response.status == 200) {
        toast.success("verifiaction email sent");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleAccount = () => {
    navigate("/bank");
  };

  return (
    <>
      {user?.isVerified == false ? (
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
                Verified You
              </Typography>
              <Avatar
                alt="Verified"
                src={imageUrl}
                sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
              />
              <Typography variant="body1" align="center" color="text.secondary">
                Your account has been successfully verified. You can now enjoy
                all the benefits and features available to verified users.
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAccount}
                >
                  Check Your Account
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

*/
