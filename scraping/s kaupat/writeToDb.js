import mysql from "mysql";
import fs from "fs";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "food",
});

fs.readFile("./data/S_KAUPAT_ITEMS.json", "utf8", (err, data) => {
  try {
    data = JSON.parse(data).map((item) => [
      item.ean,
      item.name,
      item.brandName,
      item.price,
      item.comparisonPrice,
      item.comparisonUnit,
      item.slug,
      item.frozen,
      item.priceUnit,
    ]);
    const insertQuery =
      "INSERT INTO items(`ean`, `name`, `brandName`, `price`, `comparisonPrice`, `comparisonUnit`, `slug`, `frozen`, `priceUnit`) VALUES ?";

    db.query(insertQuery, [data], (err) => {
      if (err) throw err;
      db.end();
    });
  } catch (error) {}
});
