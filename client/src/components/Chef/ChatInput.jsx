import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { ItemsContext } from "../../context/itemsContext";

function MultipleSelectDialog({ open, close, selectedItems, setSelectedItems, items }) {
  const handleChange = (event) => {
    if (event.target.checked) {
      setSelectedItems((prevItems) => [...prevItems, event.target.name]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item !== event.target.name));
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Choose Items</DialogTitle>
      <DialogContent>
        <FormGroup>
          {items.map((item) => (
            <FormControlLabel control={<Checkbox checked={selectedItems.includes(item.name)} onChange={handleChange} name={item.name} />} label={item.name} key={item.name} />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={close}>
          Cancel
        </Button>
        <Button onClick={close}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

const ChatInput = ({ selectedItems, setSelectedItems, onGenerate }) => {
  const [open, setOpen] = useState(false);
  const { items, fetchItems } = useContext(ItemsContext);

  useEffect(() => {
    if (!items.length) fetchItems();
  });

  const openDialog = () => {
    if (items.length < 1) {
      alert("You have 0 items in inventory, start by adding some items");
      return;
    }
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center", gap: 1 }}>
      <TextField
        variant="outlined"
        label="Ingredients"
        fullWidth
        autoFocus
        onClick={openDialog}
        value={selectedItems.join(", ")}
        InputProps={{
          readOnly: true,
        }}
      />
      <IconButton color="primary" aria-label="generate recipe" onClick={onGenerate} sx={{ border: "solid 2px" }}>
        <SendIcon />
      </IconButton>
      <MultipleSelectDialog open={open} close={() => setOpen(false)} selectedItems={selectedItems} setSelectedItems={setSelectedItems} items={items} />
    </Box>
  );
};

export default ChatInput;
