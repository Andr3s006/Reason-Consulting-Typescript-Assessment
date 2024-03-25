import React, { ComponentProps } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

import { selectClaimedListingById } from "../redux/listings";
import { useAppSelector } from "../lib/useAppSelector";
import {  Submission } from "../lib/applicationTypes";
import { requestExtension } from "../lib/api";
import { addSubmission } from "../redux/submissions";
import { useDispatch } from "react-redux";

type AppFieldProps = {
  label: string;
  name: string;

  // This line allows you to pass any styling options to the MaterialUI text
  // field that are allowed by TextField.
  sx?: ComponentProps<typeof TextField>["sx"];
}

// AppField is mostly a simple wrapper around MaterialUI's TextField, but
// hooks into Formik. Just saves us allot of typing.
const AppField: React.FC<AppFieldProps> = ({
  label,
  name,
  sx,
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
    />
  );
};

export default function Listing() {
  const { id = null } = useParams();
  const listing = useAppSelector((state) => selectClaimedListingById(state, id))
  const [errors, setErrors] = React.useState<{reason: boolean}>({ reason: false });
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  if (!listing) {
    return (
      <Box>Listing was not found!</Box>
    );
  }

  const initialValues: Submission = {
    listing,
    reason : '',
  };
  
  const handleSubmit = async (values: Submission) => {
    if(errors.reason) return;
    
    try {
      const response = await requestExtension(values);
      dispatch(addSubmission(response));
      navigate(`/submissions`);
    } catch (err) {
      console.log(err);
      alert('Something went wrong!');
    }
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Request An Extension For {listing.name}
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={(values) => {
            if (!values.reason) {
              setErrors({ reason: true })
            } else {
              setErrors({ reason: false })
            }
          }}
        >
          <Form>
            <AppField label="Name" name="listing.name" />

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Mailing Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.mailingAddress.address1"/>
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.mailingAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="City"
                    name="listing.mailingAddress.city"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.mailingAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="Zip"
                    name="listing.mailingAddress.zip"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Physical Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.physicalAddress.address1"
                  />
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.physicalAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="City"
                    name="listing.physicalAddress.city"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.physicalAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="Zip"
                    name="listing.physicalAddress.zip"
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{mt: 3}}>
              <AppField label="Reason" name="reason" />
              { errors.reason && (
                <Typography variant="body2" color="error">
                  Reason is required
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" type="submit">
                Submit Request
              </Button>
            </Box>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
}