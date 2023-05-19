import mysql from "mysql2/promise";
import waitPort from "wait-port";
import fs from "fs";
const {
  MYSQL_HOST: HOST = "localhost",
  MYSQL_HOST_FILE: HOST_FILE,
  MYSQL_USER: USER = "root",
  MYSQL_USER_FILE: USER_FILE,
  MYSQL_PASSWORD: PASSWORD = "pass",
  MYSQL_PASSWORD_FILE: PASSWORD_FILE,
  MYSQL_DB: DB = "food",
  MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;

export const init = async () => {
  const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
  const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
  const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

  await waitPort({
    host,
    port: 3306,
    timeout: 10000,
    waitForDns: true,
  });

  /*
  TODO:
  Figure out what to set as the connection limit
  */
  pool = mysql.createPool({
    connectionLimit: 5,
    host,
    user,
    password,
    database,
    charset: "utf8mb4",
  });

  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS items (ean bigint NOT NULL, name varchar(255) DEFAULT NULL, brandName varchar(45) DEFAULT NULL, price decimal(10,2) DEFAULT NULL, comparisonPrice decimal(10,2) DEFAULT NULL, comparisonUnit varchar(45) DEFAULT NULL, slug varchar(255) DEFAULT NULL, frozen tinyint(1) DEFAULT NULL, priceUnit varchar(45) DEFAULT NULL, PRIMARY KEY (ean)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, username varchar(45) NOT NULL, password varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS user_items (user_id int NOT NULL, item_ean bigint NOT NULL, quantity int DEFAULT NULL, id int NOT NULL AUTO_INCREMENT, date datetime DEFAULT NULL, PRIMARY KEY (id), UNIQUE KEY ean_id_unique (user_id,item_ean), KEY user_id_idx (user_id), KEY item_ean_idx (item_ean) /*!80000 INVISIBLE */, CONSTRAINT item_ean FOREIGN KEY (item_ean) REFERENCES items (ean) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB AUTO_INCREMENT=1947 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    );
  } catch (error) {
    console.log(error);
  }
};

export const query = (sql, params) => pool.query(sql, params);
