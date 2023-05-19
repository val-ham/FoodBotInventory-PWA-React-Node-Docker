import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import Layout from "../common/Layout";
import { generateRecipe } from "../../apiCalls";

const initialChatMessages = [{ bot: true, msg: "Hey, I am the Chef. I will generate a recipe for you. Choose what ingredients you want to use!" }];
const itemLimit = 8;

const Chef = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [generating, setGenerating] = useState(false);

  const addChatMessage = (message, botMessage = false) => {
    setChatMessages((prevMessages) => [...prevMessages, { bot: botMessage, user: !botMessage, msg: message }]);
  };

  const generate = async () => {
    if (generating) return;
    addChatMessage(`Generate recipe with these items: ${selectedItems}`);
    if (selectedItems.length > itemLimit) {
      addChatMessage(`Don't use more than ${itemLimit} items please`, true);
      return;
    }
    try {
      addChatMessage("Generating (takes around 30seconds)...", true);
      setGenerating(true);
      const res = await generateRecipe(selectedItems);
      setGenerating(false);
      setChatMessages((prevMessages) => prevMessages.slice(0, -1));
      if (res.data.completion) {
        addChatMessage(res.data.completion, true);
      } else {
        const { name, ingredients, steps } = res.data;
        addChatMessage(`I came up with this recipe for you: ${name}`, true);
        addChatMessage(`INGREDIENTS: ${ingredients}`, true);
        addChatMessage(`STEPS: ${steps}`, true);
      }
    } catch (error) {
      console.log(error);
      setGenerating(false);
      addChatMessage("Something seems to be wrong, is the OpenAI API key set correctly?", true);
    }
  };

  return (
    <Layout title="Chef" bottomNavValue={2}>
      <Box sx={{ flex: 1, overflowY: "auto", pb: 1 }}>
        <ChatWindow chatMessages={chatMessages} />
      </Box>
      <Box sx={{ px: 1, py: 1 }}>
        <ChatInput selectedItems={selectedItems} setSelectedItems={setSelectedItems} onGenerate={generate} />
      </Box>
    </Layout>
  );
};

export default Chef;
