import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HoverPopover from "./HoverPopover";

import { ItemsContext } from "../../context/itemsContext";

const ItemCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { decreaseQuantity, deleteItem, increaseQuantity } = useContext(ItemsContext);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { id, name, quantity, price, comparisonPrice, comparisonUnit, ean } = item;
  const shortName = name.length < 20 ? name : name.slice(0, 20) + "...";

  const handleDelete = async () => {
    try {
      deleteItem(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async () => {
    try {
      decreaseQuantity(id, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrease = async () => {
    try {
      increaseQuantity(ean, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card key={id} sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography component="div" variant="h5" aria-owns={open ? "mouse-over-popover" : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
            <HoverPopover open={open} anchorEl={anchorEl} name={name} />
            {shortName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Quantity: {quantity}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mass: {((quantity * price) / comparisonPrice).toFixed(3)} {comparisonUnit}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
          <IconButton aria-label="increase quantity" onClick={() => handleIncrease(ean, 1)} sx={{ mr: 1 }}>
            <AddIcon />
          </IconButton>
          <IconButton aria-label="decrease quantity" onClick={() => handleDecrease(id, 1)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => alert("Editing not implemented yet")}>
          <EditIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ItemCard;
