// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// interface AuthData {
//   accounts: {
//     account_id: string;
//     balances: {
//       current: number;
//     };
//     name: string;
//   }[];
//   numbers: {
//     ach: {
//       account: string;
//       routing: string;
//       account_id: string;
//     }[];
//   };
// }

// interface AuthTableProps {
//   data: AuthData[];
// }

// const AuthTable: React.FC<AuthTableProps> = ({ data }) => {
//   return (
//     <Table sx={{ mt: 2 }}>
//       <TableHead>
//         <TableRow>
//           <TableCell>Name</TableCell>
//           <TableCell>Balance</TableCell>
//           <TableCell>Account</TableCell>
//           <TableCell>Routing</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell>{item.name}</TableCell>
//             <TableCell>{item.balances.current}</TableCell>
//             <TableCell>{item.account}</TableCell>
//             <TableCell>{item.routing}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default AuthTable;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

// export interface AuthData {
//   accounts: {
//     account_id: string;
//     balances: {
//       current: number;
//     };
//     name: string;
//   }[];
//   numbers: {
//     ach: {
//       account: string;
//       routing: string;
//       account_id: string;
//     }[];
//   };
// }

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

interface AuthTableProps {
  data: AuthData;
}

const AuthTable: React.FC<AuthTableProps> = ({ data }) => {
  console.log("hello");
  const { accounts, numbers } = data;
  console.log(data, "auth");

  // Map account ID to account and routing numbers
  const accountRoutingMap = numbers.ach.reduce((acc, ach) => {
    acc[ach.account_id] = {
      account: ach.account,
      routing: ach.routing,
    };
    return acc;
  }, {} as { [key: string]: { account: string; routing: string } });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Auth Table
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Routing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => {
            const { account: accountNumber, routing } =
              accountRoutingMap[account.account_id] || {};
            return (
              <TableRow key={account.account_id}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.balances.current}</TableCell>
                <TableCell>{accountNumber || "N/A"}</TableCell>
                <TableCell>{routing || "N/A"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AuthTable;
