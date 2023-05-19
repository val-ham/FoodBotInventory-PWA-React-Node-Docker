import mysql from "mysql2/promise";
import fs from "fs/promises";

const db = mysql.createPool({
  connectionLimit: 5,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  charset: "utf8mb4",
});

const createProcedures = async () => {
  const procedureSql = `
    CREATE PROCEDURE decrease_quantity(IN id INT, IN quantity INT)
    BEGIN
      DECLARE current_quantity INT;

      SELECT user_items.quantity
      INTO current_quantity
      FROM user_items
      WHERE user_items.id = id;
    
      IF (current_quantity - quantity) > 0 THEN
        UPDATE user_items
        SET user_items.quantity = current_quantity - quantity
        WHERE user_items.id = id;
      ELSE
        DELETE FROM user_items WHERE user_items.id = id;
      END IF;
    END;
  `;

  try {
    await db.query("DROP PROCEDURE IF EXISTS decrease_quantity");
    await db.query(procedureSql);
    console.log("Stored procedure decrease_quantity created successfully");
  } catch (err) {
    console.error("Error creating stored procedure decrease_quantity:", err);
  }
};

const main = async () => {
  await db.query(
    "CREATE TABLE IF NOT EXISTS items (ean bigint NOT NULL, name varchar(255) DEFAULT NULL, brandName varchar(45) DEFAULT NULL, price decimal(10,2) DEFAULT NULL, comparisonPrice decimal(10,2) DEFAULT NULL, comparisonUnit varchar(45) DEFAULT NULL, slug varchar(255) DEFAULT NULL, frozen tinyint(1) DEFAULT NULL, priceUnit varchar(45) DEFAULT NULL, PRIMARY KEY (ean)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
  );
  await db.query(
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, username varchar(45) NOT NULL, password varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
  );
  await db.query(
    "CREATE TABLE IF NOT EXISTS user_items (user_id int NOT NULL, item_ean bigint NOT NULL, quantity int DEFAULT NULL, id int NOT NULL AUTO_INCREMENT, date datetime DEFAULT NULL, PRIMARY KEY (id), UNIQUE KEY ean_id_unique (user_id,item_ean), KEY user_id_idx (user_id), KEY item_ean_idx (item_ean) /*!80000 INVISIBLE */, CONSTRAINT item_ean FOREIGN KEY (item_ean) REFERENCES items (ean) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB AUTO_INCREMENT=1947 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
  );

  await createProcedures();

  // Check if the items table has some rows
  const [result] = await db.query("SELECT COUNT(*) as count FROM items");
  if (result[0].count === 0) {
    const data = await fs.readFile("./S_KAUPAT_ITEMS.json", "utf8");
    const items = JSON.parse(data).map((item) => [
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
    await db.query(insertQuery, [items]);
    console.log("Items imported successfully.");
  } else {
    console.log("Items table already has data. No import needed.");
  }
  await db.end();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
