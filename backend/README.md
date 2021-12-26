# To run the application
1. install nodejs `https://nodejs.org/en/download/`
2. install docker `https://docs.docker.com/get-docker/`
3. pull the image of postgress  `docker pull postgres`
4. start the docker engine db : `docker run  -p 5432:5432 --name postgresql-container -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=blog -d postgres`
5. Create the database 
    1.  Open the docker CLI
    2. changed to blog user  `psql -U blog`
    3. create the database `REATE DATABASE  replate_this_database_name`
    4. exit or close the CLI docker

6. Run `tsc --watch` in case you are proramming
7. Run `npm install` 
8. You may need to run `npm install -g ts-node` too but not required
9. Star the application `npm run dev` for ts files or   `npm start` for js files