# Daily Bugle UVA CS4260

Authors: Manish Balamurugan (mb2mcc) and Yonatan Yohannes (yy3myd)


### Process/Task list 

### 1. Article CRUD Node Service

#### Backend Setup

1. Node Service Setup:
    - Create a Node.js service using Express. 
    - Implement CRUD operations for articles using MongoDB (Mongoose).

#### Authentication

2. Authentication:
    - Implement user authentication using Passport.js or a similar library.
    - Create routes for user login and registration.

3. Verify Username & Password Function: 
    - Write a function to verify the entered username and password against stored credentials.

#### Session Management  

4. Session Management:
    - Use cookies or a global object to track session information.
    - Ensure sessions are secure and include necessary user details.

### 2. Containerize the Service

5. Containerization:
    - Dockerize the Node.js service.
    - Create a Dockerfile and docker-compose.yml for easy deployment.

### 3. Ads Node Service  

6. Ads Service:
    - Create a Node.js service to manage ads.
    - Implement functions to display, track views, and track clicks for ads.

### 4. Apache Setup

7. Apache Setup:
    - Install and configure Apache as a reverse proxy.
    - Set up proxy entries for the Node.js services.

### 5. HTML Files and UI Development  

8. HTML Files:
    - Create three HTML views: reader, commenter, author. 
    - Develop the UI using HTML, CSS, and JavaScript.

9. JavaScript Functions:
    - Write JavaScript functions to switch between views based on user roles.
    - Implement controlling functions to manage view changes.

### 6. Connect Views to Live Data  

10. Connect Views to Live Data:
    - Use AJAX or Fetch API to connect HTML views to live data from Node.js services.

### 7. MongoDB Setup

11. MongoDB Setup:
    - Install and configure MongoDB. 
    - Dockerize the MongoDB service.

12. Create Data for Testing:
    - Insert test data into the MongoDB database for articles and users.

### 8. Test Plan

13. Write a Test Plan:
    - Define test cases for CRUD operations, authentication, ad functionality, and UI.
    - Execute unit tests, integration tests, and end-to-end tests.
