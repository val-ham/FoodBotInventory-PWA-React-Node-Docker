import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ chatMessages }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {chatMessages.map((chat, index) => (
        <React.Fragment key={index}>
          <ChatMessage {...chat} />
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
