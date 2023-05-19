import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { ItemsContext } from "../../context/itemsContext";
import ItemCard from "./ItemCard";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const EmptyInventory = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h4" component="div" sx={{}}>
        Inventory is empty
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{}}>
        Start by adding items
      </Typography>
    </Box>
  );
};

const Items = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchItems, items } = useContext(ItemsContext);

  useEffect(() => {
    if (currentUser && !items.length) {
      fetchItems();
    }
  }, [currentUser]);

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="stretch" flex={1} spacing={2} px={1}>
        {items.map((item) => (
          <Grid key={item.ean} item>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
      {items.length < 1 && <EmptyInventory />}
      <Box
        sx={{
          position: "fixed",
          bottom: "65px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Fab color="primary" aria-label="search" sx={{ boxShadow: 3 }} onClick={() => alert("Search not implemented yet")}>
          <SearchIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Items;
