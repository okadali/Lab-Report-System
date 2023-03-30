# Lab Report System

 ## How to run?
 - Database Steps
   - First you need to [install MySQL Server and MySQL Workbench](https://dev.mysql.com/downloads/installer/) to your system.
   - You can follow this tutorial (https://youtu.be/u96rVINbAUI)
   - After that connect to your local server using MySQL Workbench and create a schema by the name of `lab-report-system`.

 - Springboot Steps
   - First go to `backend/src/main/resources/application.properties` and you will see `spring.datasource.password=7451` change `7451` to your own MySql server password.
   - Then open cmd, get into the `backend/` file and type `mvn spring-boot:run` for this command `maven` have to installed
 
 - Last Steps
   - After spring boot started to running open up another cmd, get into the `frontend/` type `npm start` for this command `node.js` have to installed
   - Enjoy!