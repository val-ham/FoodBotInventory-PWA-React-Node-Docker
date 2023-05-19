export const generateRecipe = async (req, res) => {
  /*
  const ingredients = ["pasta", "butter", "oil", "chicken cutlet", "garlic", "white whine", "lemon", "parsley"];
  const inventory = ["chicken cutlet", "pasta"];
  const missingIngredients = ingredients.filter((ingredient) => !inventory.includes(ingredient));
  const assistantMsg = `missing ingredients:${missingIngredients.join(",")}\nrecipe:Chicken Scampi\ningredients:${ingredients.join(",")}\nsteps:1.Make pasta\n2.cook chicken\n3.prepare sauce\n4.combine all.`;

  
  const messages = [
    { role: "user", content: `generate recipe from: ${inventory.join(",")}` },
    { role: "assistant", content: assistantMsg },
    { role: "user", content: `generate recipe from: ${req.body.selectedItems.join(",")} (discard the brand name and quantity from the list)` },
  ];
  */

  //const messages = [{ role: "user", content: `remove brand names from my ingredient list: ${req.body.selectedItems.join(",")}. generate a recipe based on the ingredients. use this format:RECIPENAME--INGREDIENTS--NUMBERED STEPS` }];

  const messages = [
    {
      role: "user",
      content: `Remove brand names from my ingredient list: ${req.body.selectedItems.join(",")}. Generate a recipe based on the ingredients. Format the output as follows: 
      ==RECIPE NAME== [Your Recipe Name Here]
      ==INGREDIENTS== [Your Ingredients Here]
      ==STEPS== [Your Cooking Steps Here]`,
    },
  ];

  try {
    const completion = await req.openai.createChatCompletion({
      model: "gpt-3.5-turbo",

      messages,
    });
    const content = completion.data.choices[0].message.content;
    const parts = content.split("==").map((part) => part.trim());
    if (parts[1] === "RECIPE NAME" && parts[3] === "INGREDIENTS" && parts[5] === "STEPS") {
      const name = parts[2];
      const ingredients = parts[4];
      const steps = parts[6].split(/\n(?=\d\.)/);
      res.status(200).json({
        name,
        ingredients,
        steps,
      });
    } else {
      res.status(200).json({
        completion: completion.data.choices[0].message.content,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
