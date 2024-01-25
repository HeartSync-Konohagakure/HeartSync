# HeartSync
Sinkronkan Hati Anda dengan Pasangan Ideal


# API Documentation : HeartSync

## Endpoints :

List of available endpoints :
- `POST /register`
- `POST /login`
- `GET /users`
- `GET /users/profile`
- `PUT /users`
- `DELETE /users`
- `POST /users/like/:idUser`
- `POST /users/unlike/:idUser`
- `GET /users/matches`

## POST /register
Description:
- Register a user.
- Default value :
    - remainingLikes : 5
    - show : false

Request:
- body:
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "gender": "string male/female (required)",
  "interest": "string male/female (required)"
}
```

_Response (201 - Created)_
```json
{
    "id": "integer",
    "username": "string",
    "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username already exists"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Email already exists"
}
OR
{
  "message": "Email Is required"
}
OR
{
  "message": "Invalid Email format"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "The minimum password length is 5 characters"
}
OR
{
  "message": "Gender is required"
}
OR
{
  "message": "Invalid gender. Choose either male or female"
}
OR
{
  "message": "Interest is required"
}
OR
{
  "message": "Invalid interest. Choose either male or female"
}
```

&nbsp;

## POST /login
Description:
- login account user with email and password

Request:
- body:
```json
{
    "email": "string (required)",
    "password": "string (required)",
}
```

_Response (200 - OK)_
```json
{
    "access_token": "string",
    "username": "string",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## GET /users
Description:
- get all users who are looking for a matching with the condition: "show" true and depends on the "interest" of the account being logged in

Request:
- headers: 
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_
```json
{
  "message": "Successfully Received Data",
  "totalData": 5,
  "data": [
    {
        "id": 2,
        "username": "nami",
        "email": "nami@gmail.com",
        "gender": "female",
        "interest": "male",
        "createdAt": "2024-01-24T03:04:15.232Z",
        "updatedAt": "2024-01-24T03:04:15.232Z",
        "UserProfile": {
            "id": 2,
            "fullname": "Nami",
            "birthdate": "1985-05-15T00:00:00.000Z",
            "profilePicture": "https://upload.wikimedia.org/wikipedia/id/f/f5/Nami_faace.jpg",
            "address": "Cocoyasi Village",
            "occupation": "Navigator",
            "bio": "I'm navigating the seas with the Straw Hat Pirates",
            "UserId": 2,
            "createdAt": "2024-01-24T03:04:15.873Z",
            "updatedAt": "2024-01-24T03:04:15.873Z"
        }
    },
    {
        "id": 4,
        "username": "sakura",
        "email": "sakura@gmail.com",
        "gender": "female",
        "interest": "male",
        "createdAt": "2024-01-24T03:04:15.375Z",            "updatedAt": "2024-01-24T03:04:15.375Z",
        "UserProfile": {
            "id": 4,
            "fullname": "Sakura Haruno",
            "birthdate": "1997-10-10T00:00:00.000Z",
            "profilePicture": "https://static.wikia.nocookie.net/naruto/images/6/64/Sakura_Part_1.png/revision/latest?cb=20170620220829&path-prefix=id",
            "address": "Hidden Leaf Village",
            "occupation": "Ninja",
            "bio": "I'm a member of Team 7, striving to become a great ninja",
            "UserId": 4,
            "createdAt": "2024-01-24T03:04:15.873Z",                "updatedAt": "2024-01-24T03:04:15.873Z"
        }
    },
    ...,
  ]
}
```

_Response (404 - Not Found)_
```json
{
    "message": "No users found"
}
```

&nbsp;

## GET /users/profile
Description:
- get user data and user profile data who is currently logged in

Request:
- headers: 
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_
```json
{
    "id": 12,
    "username": "baiquni",
    "email": "baiquni@gmail.com",
    "remainingLikes": 5,
    "gender": "male",
    "interest": "female",
    "show": true,
    "createdAt": "2024-01-24T06:11:38.609Z",
    "updatedAt": "2024-01-24T06:11:38.609Z",
    "UserProfile": {
        "id": 12,
        "fullname": "Baiquni Yahya",
        "birthdate": "1993-07-05T00:00:00.000Z",
        "profilePicture": "https://static.wikia.nocookie.net/onepiece/images/5/52/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20141008195159",
        "address": "bekasi",
        "occupation": "donatur pejabat",
        "bio": "struggling web developer student",
        "UserId": 12,
        "createdAt": "2024-01-24T06:11:38.753Z",
        "updatedAt": "2024-01-24T06:15:30.771Z"
    }
}
```

_Response (403 - Forbidden)_
```json
{
    "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data Not Found"
}
```

&nbsp;

## PUT /users
Description:
- edit user data and user profile data who is currently logged in

Request:
- headers: 
```json
{
  "access_token": "string"
}
```

- body:
```json
{
  "username": "string",
  "email": "string",
  "gender": "string male/female",
  "interest": "string male/female",
  "show": "boolean",
  "fullname": "string",
  "birthdate": "date",
  "profilePicture": "string",
  "address": "string",
  "occupation": "string",
  "bio": "string"
}
```

_Response (200 - OK)_
```json
{
  "message": "profile has been updated successfully"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Username already exists"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Email already exists"
}
OR
{
  "message": "Email Is required"
}
OR
{
  "message": "Email format is wrong"
}
OR
{
  "message": "Gender is required"
}
OR
{
  "message": "Invalid gender. Choose either male or female"
}
OR
{
  "message": "Interest is required"
}
OR
{
  "message": "Invalid interest. Choose either male or female"
}
```

_Response (403 - Forbidden)_
```json
{
    "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data Not Found"
}
```

&nbsp;

## DELETE /users
Description:
- Delete account

Request:
- headers: 
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_
```json
{
  "message": "Account Deleted Successfully"
}
```

_Response (403 - Forbidden)_
```json
{
    "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data Not Found"
}
```

&nbsp;

## POST /users/like/:idUser
Description:
- endpoint for like someone account, for matching partner

Request:
- headers: 
```json
{
    "access_token": "string"
}
```

- params:
```json
{
    "idUser": "integer"
}
```

_Response (200 - OK)_
```json
{
  "message": "You Have Like This Person"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "You Have Already Like/Dislike This Person"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data Not Found"
}
```

&nbsp;

## POST /users/dislike/:idUser
Description:
- endpoint for dislike someone account

Request:
- headers: 
```json
{
    "access_token": "string"
}
```

- params:
```json
{
    "idUser": "integer"
}
```

_Response (200 - OK)_
```json
{
  "message": "You Have Disliked This Person"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "You Have Already Like/Dislike This Person"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data Not Found"
}
```

&nbsp;

## GET /users/matches
Description:
- get a list of users who like back the person who is logged in (match with someone)

Request:
- headers: 
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)_
```json
{
"message": "Data Received Successfully",
"data": [
    {
        "id": 12,
        "username": "baiquni",
        "email": "baiquni@gmail.com",
        "gender": "male",
        "interest": "female",
        "createdAt": "2024-01-24T06:11:38.609Z",
        "updatedAt": "2024-01-24T06:11:38.609Z",
        "UserProfile": {
            "id": 12,
            "fullname": "Baiquni Yahya",
            "birthdate": "1993-07-05T00:00:00.000Z",
            "profilePicture": "https://static.wikia.nocookie.net/onepiece/images/5/52/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20141008195159",
            "address": "bekasi",
            "occupation": "donatur hacktiv8",
            "bio": "struggling web developer student",
            "UserId": 12,
            "createdAt": "2024-01-24T06:11:38.753Z",
            "updatedAt": "2024-01-24T06:15:30.771Z"
        }
    },
    ...,
  ]
}
```

_Response (404 - Not Found)_
```json
{
    "message": "No Users Matched"
}
```

&nbsp;

## Global Error
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


