## API Documentation

## Routes

##

1. POST /signup
Add a new user to the database
Input: { firstName, middleName, lastName, upMail, password, studentNumber, userType, adviser, application }
Output: { "success": Boolean }

2. POST /login
Verifies username and pass if it is alaready existing
Input: {username, password}
Output: {"condition": boolean}

3. POST /checkifloggedin
create token which identify the user
Input: None
Output: {"loggedIn": boolean}



## REFERENCE
    - https://github.com/mgccarandang/CMSC100-Lec-Token-Based-Auth-2023.git
    - https://www.youtube.com/watch?v=b9WlsQMGWMQ&t=329s