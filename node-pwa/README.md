#This project is to run the APIs on Node server

Steps to run the server on local machine:

1. Navigate to functions folder on command line
2. Run "npm install" command
3. Run "npm run serve" command to get a URL where APIs are running similar to "http://localhost:5000/ProjectName/ServerLoc/app/"
   where <ProjectName> is the project name in firebase (refer .firebaserc)
4. The test API to check the server is working properly: "http://localhost:5000/ProjectName/ServerLoc/app/now"

Changes to be made to refer to your firebase account:

1. Project name <ProjectName> in .firebaserc
2. Authorization key (key=AuthorizationKey) in API definition /prices/new in index.js (line 44). This can be copied from the Project Settings of your firebase account.

The API /prices/new will push notifications using Firebase Cloud Messaging(FCM).

Note: The project is specifically in a format which can be deployed on firebase.
