import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const HoverPopover = ({ open, anchorEl, name }) => {
  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{name}</Typography>
      </Popover>
    </div>
  );
};

export default HoverPopover;
