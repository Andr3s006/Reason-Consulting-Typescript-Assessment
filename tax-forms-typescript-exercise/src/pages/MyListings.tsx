import React from "react";
import { Link } from "react-router-dom";
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

import { selectClaimedListings } from "../redux/listings";
import { useAppSelector } from "../lib/useAppSelector";

export default function MyListings() {
  // Use a selector to get the open listings from the Redux store. Please note
  // that the behavior of useAppSelector is identical to useSelector from
  // react-redux, but we don't have to spell out the types every time.
  const claimedListings = useAppSelector(selectClaimedListings);

  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
         <Typography variant="h4" sx={{ m: 1 }}>
          My Claimed Listings
         </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {claimedListings.map((listing) =>
                <TableRow key={listing.id}>
                  <TableCell>{listing.name}</TableCell>
                  <TableCell>{listing.physicalAddress.address1}</TableCell>
                  <TableCell>{listing.physicalAddress.city}</TableCell>
                  <TableCell>{listing.physicalAddress.state}</TableCell>
                  <TableCell>{listing.physicalAddress.zip}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/claimed/${listing.id}`}>
                      Request Extension
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
