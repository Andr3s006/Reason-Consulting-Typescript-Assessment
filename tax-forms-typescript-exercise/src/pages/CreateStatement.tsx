import React, { ComponentProps } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

import { useAppSelector } from "../lib/useAppSelector";
import {  Statement } from "../lib/applicationTypes";
import { useDispatch } from "react-redux";
import { selectStatementById } from "../redux/statements";
import { createStatement, updateStatement } from "../lib/api";

type AppFieldProps = {
  label: string;
  name: string;

  // This line allows you to pass any styling options to the MaterialUI text
  // field that are allowed by TextField.
  sx?: ComponentProps<typeof TextField>["sx"];
  type?: string;
}

// AppField is mostly a simple wrapper around MaterialUI's TextField, but
// hooks into Formik. Just saves us allot of typing.
const AppField: React.FC<AppFieldProps> = ({
  label,
  name,
  sx,
  type = 'text'
}) => {
  const [field] = useField(name);

  return (
    <TextField
      fullWidth
      variant="outlined"
      id={name}
      label={label}
      sx={sx}
      {...field}
      type={type}
    />
  );
};

export default function CreateStatement() {
  const { id = null } = useParams();
  
  // For Edit Purpose
  const statement = useAppSelector((state) => selectStatementById(state, id));
  const [errors, setErrors] = React.useState<{name: boolean}>({ name: false });
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isEditMode = id !== 'new';
  
  if (!statement && isEditMode) {
    return (
      <Box>Statement was not found!</Box>
    );
  }

  const initialValues: Statement = {
    id: statement?.id || '',
    name: statement?.name || '',
    contactInformation: statement?.contactInformation || { firstName: '', lastName: '', email: '', phoneNumber: '' },
  };
  
  const handleSubmit = async (values: Statement) => {
    if(errors.name) return;
    
    try {
      if(!isEditMode) {
        await createStatement(values);
      } else {
        await updateStatement(values);
      }
      navigate(`/statements`);
    } catch (err) {
      console.log(err);
      alert('Something went wrong!');
    }
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {id === 'new' ? 'New Statement' : 'Edit Statement'}
          {id !== 'new' && statement && `: ${statement.name}`}
        </Typography>
        
        
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={(values) => {
            if (!values.name) {
              setErrors({ name: true })
            } else {
              setErrors({ name: false })
            }
          }}
        >
          <Form>
            
          <Typography variant="h6" sx={{ mb: 3, mt: 4 }}> Business Name </Typography>
            <AppField label="Name" name="name" />
            { errors.name && (
                <Typography variant="body2" color="error">
                  Name is required
                </Typography>
              )}
            
            
            <Typography variant="h6" sx={{ mb: 3, mt: 4 }}> Business Contact Information </Typography>
            <Box sx={{mt: 3}}> <AppField label="First Name" name="contactInformation.firstName" /> </Box>
              
            <Box sx={{mt: 3}}> <AppField label="Last Name" name="contactInformation.lastName" /> </Box>
            
            <Box sx={{mt: 3}}> <AppField label="Email" name="contactInformation.email" type="text" /> </Box>
            
            <Box sx={{mt: 3}}> <AppField label="Phone Number" name="contactInformation.phoneNumber" type="number" /> </Box>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" type="submit">
                {isEditMode ? 'Update' : 'Submit'} Statement
              </Button>
            </Box>
          </Form>
        </Formik>
        
      </Paper>
    </Container>
  );
}