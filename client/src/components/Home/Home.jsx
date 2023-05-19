import React from "react";
import Items from "./Items";
import Box from "@mui/material/Box";
import Layout from "../common/Layout";

const Home = () => {
  return (
    <Layout title="Inventory" bottomNavValue={0}>
      <Box sx={{ flex: 1, overflowY: "auto", pb: 1 }}>
        <Items />
      </Box>
    </Layout>
  );
};

export default Home;
