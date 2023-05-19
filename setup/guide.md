Copy the .env.development.local file to ../client folder to run the frontend on local machine without containerizing it.

# Build version running on local machine

## 1. Create images

- Make sure you are in the root folder
- docker build -t b-nginx ./nginx
- docker build -t b-api ./api
- docker build -t b-client ./client

## 2. Create network for the containers to communicate

- docker network create app-network

## 3. Create MySQL container

- docker run --name mysql --network app-network -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=food -v mysql-data:/var/lib/mysql -d mysql:8.0

## 4. Start the other containers from the created images

- docker run --name api --network app-network -e MYSQL_HOST=mysql -e MYSQL_USER=root -e MYSQL_PASSWORD=secret -e MYSQL_DB=food -d b-api
- docker run --name client --network app-network -d b-client
- docker run --name nginx --network app-network -p 80:80 --restart always -d b-nginx

## 5. Import the MySQL Tables and Data

- Build the import image:
  - docker build -t b-import-data ./import
- Start the import container:
  - docker run --name import-data --network app-network -e MYSQL_HOST=mysql -e MYSQL_USER=root -e MYSQL_PASSWORD=secret -e MYSQL_DB=food --rm b-import-data

### Other commands

- To stop and remove containers, and to remove network
  - docker stop nginx client api mysql
  - docker rm nginx client api mysql
  - docker network rm app-network
- To see logs of container
  - docker logs "container-name"
- To access MySQL container and view content
  - docker exec -it mysql mysql -u root -p
  - USE food;
  - SHOW TABLES;
  - SELECT \* FROM items;
