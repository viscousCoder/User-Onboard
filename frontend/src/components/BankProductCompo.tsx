// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// interface Product {
//   id: number;
//   method: string;
//   name: string;
//   endpoint: string;
//   description: string;
// }

// const products: Product[] = [
//   {
//     id: 1,
//     method: "GET",
//     name: "Auth",
//     endpoint: "api/auth",
//     description:
//       "Retrieve account and routing numbers for checking and savings accounts.",
//   },
//   {
//     id: 2,
//     method: "POST",
//     name: "Transactions",
//     endpoint: "/transactions/sync/", // API endpoint for Transactions
//     description:
//       "Retrieve transactions or incremental updates for credit and depository accounts.",
//   },
//   {
//     id: 3,
//     method: "POST",
//     name: "Balance",
//     endpoint: "/accounts/balance/get/", // API endpoint for Balance
//     description:
//       "Check balances in real-time to prevent non-sufficient funds fees.",
//   },
// ];

// const BankProductCompo: React.FC = () => {
//   const [visibleTable, setVisibleTable] = useState<number | null>(null); // Track which table is visible
//   const [tableData, setTableData] = useState<{ [key: number]: any[] }>({}); // Store data for each product
//   const [loading, setLoading] = useState<{ [key: number]: boolean }>({}); // Loading state for each product
//   const [error, setError] = useState<{ [key: number]: string }>({}); // Error state for each product
//   const accessToken = JSON.parse(localStorage.getItem("accessToken"));

//   const fetchData = async (product: Product) => {
//     setLoading((prev) => ({ ...prev, [product.id]: true }));
//     setError((prev) => ({ ...prev, [product.id]: "" }));

//     try {
//       // Make API call to the product's specific endpoint
//       const response = await axios.get(
//         `http://localhost:8000/${product.endpoint}`,
//         {
//           headers: {
//             accessToken: accessToken, // Ensure this is securely stored and valid
//           },
//         }
//       );

//       // Check if response data is valid
//       if (response.data) {
//         const data = response.data;
//         setTableData((prev) => ({ ...prev, [product.id]: data }));
//       } else {
//         throw new Error("Received empty data from the API");
//       }
//     } catch (err: any) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An unexpected error occurred";
//       setError((prev) => ({
//         ...prev,
//         [product.id]: errorMessage || "Failed to fetch data",
//       }));
//     } finally {
//       setLoading((prev) => ({ ...prev, [product.id]: false }));
//     }
//   };

//   const handleButtonClick = (product: Product) => {
//     if (visibleTable === product.id) {
//       setVisibleTable(null); // Hide the table if it's already visible
//     } else {
//       setVisibleTable(product.id);
//       if (!tableData[product.id]) {
//         fetchData(product); // Fetch data only if not already fetched
//       }
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Products
//       </Typography>
//       {products.map((product) => (
//         <Card key={product.id} sx={{ mb: 2 }}>
//           <CardContent>
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Box>
//                 <Button variant="outlined" size="small" sx={{ mr: 2 }}>
//                   {product.method}
//                 </Button>
//                 <Typography variant="h6" component="span">
//                   {product.name}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   component="span"
//                   sx={{ ml: 1 }}
//                 >
//                   {product.endpoint}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mt: 1 }}
//                 >
//                   {product.description}
//                 </Typography>
//               </Box>
//               <Button
//                 variant="outlined"
//                 onClick={() => handleButtonClick(product)}
//                 onDoubleClick={() => setVisibleTable(null)}
//               >
//                 Send request
//               </Button>
//             </Box>
//             {visibleTable === product.id && (
//               <>
//                 {loading[product.id] && <CircularProgress sx={{ mt: 2 }} />}
//                 {error[product.id] && (
//                   <Alert severity="error" sx={{ mt: 2 }}>
//                     {error[product.id]}
//                   </Alert>
//                 )}
//                 {!loading[product.id] && tableData[product.id] && (
//                   <Table sx={{ mt: 2 }}>
//                     <TableHead>
//                       <TableRow>
//                         {Object.keys(tableData[product.id][0] || {}).map(
//                           (column, index) => (
//                             <TableCell key={index}>{column}</TableCell>
//                           )
//                         )}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {tableData[product.id].map(
//                         (row: any, rowIndex: number) => (
//                           <TableRow key={rowIndex}>
//                             {Object.values(row).map((value, colIndex) => (
//                               <TableCell key={colIndex}>{value}</TableCell>
//                             ))}
//                           </TableRow>
//                         )
//                       )}
//                     </TableBody>
//                   </Table>
//                 )}
//               </>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default BankProductCompo;

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import TransactionTable from "./Bank/TransactionTable";
import BalanceTable from "./Bank/BalanceTable";
import AuthTable from "./Bank/AuthTable";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Product {
  id: number;
  method: string;
  name: string;
  endpoint: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    method: "GET",
    name: "Your Account Details",
    endpoint: "api/auth",
    description:
      "Get your all accounts details (acount nnumber, routing number)",
  },
  {
    id: 2,
    method: "POST",
    name: "Transactions",
    endpoint: "api/transactions",
    description:
      "Retrieve transactions or incremental updates for credit and depository accounts.",
  },
  {
    id: 3,
    method: "POST",
    name: "Balance",
    endpoint: "api/balance",
    description:
      "Check balances in real-time to prevent non-sufficient funds fees.",
  },
];

export interface AuthData {
  accounts: {
    account_id: string;
    balances: {
      current: number;
      available: number | null;
    };
    name: string;
    official_name: string;
    mask: string;
    subtype: string;
    type: string;
  }[];
  numbers: {
    ach: {
      account: string;
      routing: string;
      account_id: string;
    }[];
  };
}

// interface TableBody {}

const BankProductCompo: React.FC = () => {
  const user = useSelector<RootState>((state) => state.user.user?.accessToken);

  const [visibleTable, setVisibleTable] = useState<number | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<{ [key: number]: string }>({});
  // const accessToken = localStorage.getItem("accessToken") || "{}";
  const accessToken = user;

  const fetchData = async (product: Product) => {
    setLoading((prev) => ({ ...prev, [product.id]: true }));
    setError((prev) => ({ ...prev, [product.id]: "" }));

    try {
      const response = await axios.get(
        `http://localhost:8000/${product.endpoint}`,
        {
          headers: {
            accessToken: accessToken as string,
          },
        }
      );

      if (response.data) {
        const data = response.data;
        setTableData((prev) => ({ ...prev, [product.id]: data }));
      } else {
        throw new Error("Received empty data from the API");
      }
    } catch (err) {
      const error = err as Error;
      setError((prev) => ({
        ...prev,
        [product.id]: error.message || "Failed to fetch data",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  const handleButtonClick = (product: Product) => {
    if (visibleTable === product.id) {
      setVisibleTable(null);
    } else {
      setVisibleTable(product.id);
      if (!tableData[product.id]) {
        fetchData(product);
      }
    }
  };

  // console.log("data", tableData);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {products.map((product) => (
        <Card key={product.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                {/* <Button variant="outlined" size="small" sx={{ mr: 2 }}>
                  {product.method}
                </Button> */}
                <Typography variant="h6" component="span">
                  {product.name}
                </Typography>
                {/* <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                  sx={{ ml: 1 }}
                >
                  {product.endpoint}
                </Typography> */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {product.description}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick(product)}
              >
                Send request
              </Button>
            </Box>
            {visibleTable === product.id && (
              <>
                {loading[product.id] && <CircularProgress sx={{ mt: 2 }} />}
                {error[product.id] && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error[product.id]}
                  </Alert>
                )}
                {!loading[product.id] &&
                  tableData[product.id] &&
                  product.endpoint === "api/auth" && (
                    <AuthTable
                      data={{
                        accounts: tableData[product.id]?.accounts,
                        numbers: { ach: tableData[product.id].numbers.ach },
                      }}
                    />
                  )}
                {!loading[product.id] &&
                  tableData[product.id] &&
                  product.name === "Transactions" && (
                    <TransactionTable data={tableData[product.id]} />
                  )}

                {!loading[product.id] &&
                  tableData[product.id] &&
                  product.name === "Balance" && (
                    <BalanceTable data={tableData[product.id].accounts} />
                  )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BankProductCompo;
