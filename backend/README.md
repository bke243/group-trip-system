# To run the application
1. install nodejs 
    `https://nodejs.org/en/download/`
2. install docker 
    `https://docs.docker.com/get-docker/`
3. pull the image of postgress  `docker pull postgres`
4. start the docker engine db :
    `docker run  -p 5432:5432 --name postgresql-container -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -d postgres`
5. Create the database 
    1.  Open the docker CLI or type `docker exec -it postgresql-container bash `
    2. changed to blog user  `psql -U user`
    3. create the database `CREATE DATABASE  grouptripdatabase`
    4. exit or close the CLI docker

6. To generage js files, run
    `tsc --watch` 
7. TO install the packages 
    `npm install` 
8. You may need to run for installing ts-node too but not required
    `npm install -g ts-node`
9. Start the application for developement purposes
    `npm run dev`

10. Start the application for production not recomanded for the current version
    `npm start`

11. TO create dummy packages do a `POST` request at `http://localhost:5000/packages/`
11. TO get dummy packages do a `GET` request at `http://localhost:5000/packages/`
