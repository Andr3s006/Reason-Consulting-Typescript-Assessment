import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import { claimListing, selectOpenListings } from "../redux/listings";
import { useAppSelector } from "../lib/useAppSelector";
import { Listing } from "../lib/applicationTypes";

const ListingRow: React.FC<{ listing: Listing }> = ({
  listing,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClaim = useCallback(() => {
    dispatch(claimListing(listing));
    navigate(`/claimed/${listing.id}`);
  }, [dispatch, navigate, listing])
  
  return (
    <TableRow key={listing.id}>
      <TableCell>{listing.name}</TableCell>
      <TableCell>{listing.physicalAddress.address1}</TableCell>
      <TableCell>{listing.physicalAddress.city}</TableCell>
      <TableCell>{listing.physicalAddress.state}</TableCell>
      <TableCell>{listing.physicalAddress.zip}</TableCell>
      <TableCell>
        <Button onClick={handleClaim}>
          Claim Listing
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function Listings() {
  // Use a selector to get the open listings from the Redux store. Please note
  // that the behavior of useAppSelector is identical to useSelector from
  // react-redux, but we don't have to spell out the types every time.
  const listings = useAppSelector(selectOpenListings);

  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
         <Typography variant="h4" sx={{ m: 1 }}>
          Open Listings
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
              {listings.map((listing) =>
                <ListingRow key={listing.id} listing={listing} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
