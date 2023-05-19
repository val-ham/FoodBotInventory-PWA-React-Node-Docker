import React, { useState, useContext } from "react";
import Scanner from "./Scanner";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../common/Layout";
import { ItemsContext } from "../../context/itemsContext";
import { addItemsCall } from "../../apiCalls";

const ScannedItemsList = ({ scannedItems, onDelete }) => {
  return (
    <>
      {scannedItems.length < 1 && (
        <Typography variant="subtitle2" gutterBottom align="center" sx={{ fontStyle: "italic" }}>
          Scanned items list is empty, start by scanning items or adding them manually with EAN code. (for example try: "6414891801020" or "6407840041172")
        </Typography>
      )}
      {scannedItems.length > 0 && (
        <Paper elevation={5} sx={{ maxHeight: "100%", overflow: "auto" }}>
          <List>
            {scannedItems.map((item, i) => (
              <ListItem
                dense
                key={i}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(i)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText>{item}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

const AddItem = () => {
  const [value, setValue] = useState("");
  const [scannedItems, setScannedItems] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const { fetchItems } = useContext(ItemsContext);

  const handleScannedItem = (scannedItem) => {
    setScannedItems((scannedItems) => {
      if (scannedItems[scannedItems.length - 1] !== scannedItem) {
        return [...scannedItems, scannedItem];
      } else {
        return scannedItems;
      }
    });
  };

  const deleteScannedItem = (index) => {
    setScannedItems((scannedItems) => [...scannedItems.slice(0, index), ...scannedItems.slice(index + 1)]);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const submitValue = async () => {
    try {
      const items = scannedItems.map((item) => ({ ean: item, quantity: 1 }));
      await addItemsCall(items);
      await fetchItems();
      alert("items added");
      setScannedItems([]);
    } catch (error) {
      console.log(error);
      alert("EANs not found, try with others");
    }
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  return (
    <Layout title="Add" bottomNavValue={1}>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pb: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          mx: 1,
        }}
      >
        <TextField id="outlined-basic" label="Item EAN" variant="outlined" value={value} onChange={handleChange} sx={{ my: 1 }} />
        <Button variant="outlined" onClick={() => setScannedItems([...scannedItems, value])} sx={{ mb: 1 }}>
          Add to list
        </Button>
        <Scanner showScanner={showScanner} toggleScanner={toggleScanner} onScanSuccess={handleScannedItem} />
        <Typography variant="h6" gutterBottom align="center" sx={{ mt: 1 }}>
          SCANNED ITEMS:
        </Typography>
        <ScannedItemsList scannedItems={scannedItems} onDelete={deleteScannedItem} />
      </Box>
      <Button onClick={() => submitValue()} variant="outlined" sx={{ mx: 1, mb: 2 }}>
        Add To inventory
      </Button>
    </Layout>
  );
};

export default AddItem;
