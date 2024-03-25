import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Box, Button, Container } from "@mui/material";

import { loadListings } from "../lib/api";
import { initOpenListings } from "../redux/listings";

export default function Home() {
  const dispatch = useDispatch();

  // Load the Open Listings from our mock API and then initialize Redux with
  // it when we load our main application.
  useEffect(() => {
    loadListings().then((listingsData) => {
      dispatch(initOpenListings(listingsData.data));
    });
  }, [dispatch]);

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to={"/listings"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Open Listings
            </Button>
            <Button
              component={Link}
              to={"/claimed"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              My Listings
            </Button>
            <Button
              component={Link}
              to={"/submissions"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Submissions
            </Button>
            <Button
              component={Link}
              to={"/statements"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              My Statements
            </Button>
          </Box>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
}
