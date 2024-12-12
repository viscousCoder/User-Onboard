// src/components/Bank/TransactionTable.tsx
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

interface Transaction {
  name: string;
  amount: number | null;
  date: string;
}

interface TransactionTableProps {
  data: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  console.log("TransactionTable", data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>
                {" "}
                {transaction.amount !== null
                  ? transaction.amount.toFixed(2)
                  : "N/A"}{" "}
                USD
              </TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
