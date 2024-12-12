import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Account {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: number | null;
    unofficial_currency_code: string | null;
  };
  mask: string;
  name: string;
  subtype: string;
}

interface BalanceTableProps {
  data: Account[];
}

const BalanceTable: React.FC<BalanceTableProps> = ({ data }) => {
  if (!Array.isArray(data)) {
    return <p>No balance data available</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Available Balance (USD)</TableCell>
            <TableCell>Subtype</TableCell>
            <TableCell>Mask</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((account) => (
            <TableRow key={account.account_id}>
              <TableCell>{account.name}</TableCell>

              <TableCell>
                {account.balances.available !== null
                  ? `${account.balances.available.toFixed(2)} USA`
                  : "N/A"}{" "}
              </TableCell>
              <TableCell>{account.subtype}</TableCell>
              <TableCell>{account.mask}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BalanceTable;
