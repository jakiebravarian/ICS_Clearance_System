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

4. GET /search-approver-by-name
search approver by its name
Input: {search}
Output: {object}

5. GET /sort-approver-by-name-asc
return object that has userTyppe: approver order by Z-A
Input: {search }
Output: {object}

6. GET /sort-approver-by-name-asc
return object that has userTyppe: approver order by A-Z
Input: {search }
Output: {object}

7. POST /edit-approver
edits approver's fname,lname,midname, upmail,pass
Input: {firstName, lastName, middleName, upMail, newUpmail, password}
Output: {edited object}

8. POST /delete-approver
deletes approver
Input: {upMail}
Output: {object}

9. POST /approver-login
approver can login to the site
Input: {email, password}
Output: {"condition": boolean}

10. GET /get-pending-student
return all students with pending status
Input: None
Output: [{Objects}]

11. GET /sort-student-by-name
sort student name in alphabetical order
Input: None
Output: [{Objects}]

12. GET /sort-student-by-sn
sort student number from olderbatches to recent 
Input: none
Output: [{Objects}]

13. POST /assign-adviser
store the adviser _id to "adviser" of student
Input: {fistName, middleName, lastName, studentNumber}
Output: {"Condition": boolean}




## REFERENCE
    - https://github.com/mgccarandang/CMSC100-Lec-Token-Based-Auth-2023.git
    - https://www.youtube.com/watch?v=b9WlsQMGWMQ&t=329s
    - https://www.digitalocean.com/community/tutorials/-how-to-perform-full-text-search-in-mongodb
    - https://www.tutorialspoint.com/how-to-search-in-array-of-object-in-mongodb#:~:text=To%20search%20the%20array%20of,component%20from%20an%20array%20object.