import React, { useEffect, useId } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../lib/useAppSelector";
import { initStatements, selectStatements } from "../redux/statements";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadStatements } from "../lib/api";

export default function MyStatements() {
  const statements = useAppSelector(selectStatements);
  
  const navigate = useNavigate();
  const handleCreateStatement = () => {
    navigate('/statement/new');
  }
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    loadStatements().then((statements) => {
      dispatch(initStatements(statements.data));
    });
  }, [dispatch])
  
  const handleUpdate = (id: string) => {
    navigate('/statement/' + id)
  } 

  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
          
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ m: 1 }}>
          My Statements
         </Typography>
          <Button variant="contained" type="submit" onClick={handleCreateStatement}>
              Create Statement
          </Button>
        </Box>

          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {statements.map((statement) => {
                const { contactInformation } = statement;

                return (
                  <TableRow key={statement.id}>
                    <TableCell>{statement.name}</TableCell>
                    <TableCell>{contactInformation?.firstName}</TableCell>
                    <TableCell>{contactInformation?.lastName}</TableCell>
                    <TableCell>{contactInformation?.email}</TableCell>
                    <TableCell>{contactInformation?.phoneNumber}</TableCell>
                    <TableCell>
                      <Button onClick={() => {handleUpdate(statement.id || 'new')}}>Update</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
