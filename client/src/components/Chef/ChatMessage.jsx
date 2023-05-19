import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

export default function ChatMessage({ bot, user, msg }) {
  return (
    <ListItem alignItems="flex-start">
      {bot && (
        <ListItemAvatar>
          <Avatar alt="Bot" src="/images/botAvatar.PNG" />
        </ListItemAvatar>
      )}
      <ListItemText secondary={msg} />
      {user && (
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
      )}
    </ListItem>
  );
}
