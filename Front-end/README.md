# ICSRMMS  API Documentation:



# **AUTH**

## Endpoint: POST  https://icsrmms.vercel.app/auth/signup

**Description:** This endpoint is used to sign up and create a new user.
**Description:** It will send an email to the user email that is used to sign up and the mail saying that signup is successfull and wait for admin approval.

**Request Body:**

```json
{
    "ex_name" : "forhad", 
    "ex_contactNO" : "23434",
    "ex_email" : "hafiz.sust333@gmail.com",
    "ex_password" : "test"
}

```
```json
{
  "message": "A verification Mail sent to your mail",
 
}
```


## Endpoint: POST https://icsrmms.vercel.app/auth/login

**Description:** This endpoint is used to sign in user.

**Request Body:**

```json
{
    "ex_email" : "hafiz.sust333@gmail.com",
    "ex_password" : "test"

}
```

```json
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```

**Response:** When the user logs in, they will receive an access token in the response.

```json
{
    "status": 200,
    "success": "true",
    "message": "User Login Successfull",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleF9lbWFpbCI6ImhhZml6LnN1c3QzMzNAZ21haWwuY29tIiwicm9sZV9pZCI6MSwiaWF0IjoxNjk4MzI1MzczLCJleHAiOjE2OTgzNTQxNzN9.kQ_oE7cygMmqWm1kcLn0uYO-M8dIItdcVdrJmrsf9Rg"
}
```

# **USERS**

## Endpoint: GET https://icsrmms.vercel.app/AllUser

**Description:** This endpoint is used to retrieve a list of users.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]
**Response:**
```json
[
    {
        "ex_id": 2,
        "ex_name": "Test2",
        "ex_email": "test2@gmail.com",
        "ex_contactNO": 3904034,
        "status": "false"
    },
    {
        "ex_id": 3,
        "ex_name": "Test3",
        "ex_email": "test3@gmail.com",
        "ex_contactNO": 3904034,
        "status": "true"
    },
    {
        "ex_id": 6,
        "ex_name": "Test7",
        "ex_email": "sadman23091998@gmail.com",
        "ex_contactNO": 3904034,
        "status": "true"
    }
]


```

## Endpoint: GET https://icsrmms.vercel.app/userById

**Description:** This endpoint is used to retrieve a single user by their ID.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]

**Request Body:**
```json
{
  "ex_id": 6
}
```
**Response:**
```json
{
        "ex_id": 6,
        "ex_name": "Test7",
        "ex_email": "sadman23091998@gmail.com",
        "ex_contactNO": 3904034,
        "status": "true"
    }
```


## Endpoint: PATCH https://icsrmms.vercel.app/approveUser

**Description:** This endpoint allows to approve a user .

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]

**Request Body:**

{
    "ex_id" : 6
    "status" : "true"
}
**Response Body:**

{
   
    "message": "user status updated successfully"
}


## Endpoint: DELETE https://icsrmms.vercel.app/deleteUserById

**Description:** This endpoint is used to delete a user by their ID.

**Access:** This endpoint is restricted to administrators only.

**Headers:** `Authorization` : [access_token]


**Request Body:**
```json
{
  "ex_id": 6
}
```
**Response:**
```json
{
        "message " : "user Deleted successfully"
    }
```



## Endpoint: POST https://icsrmms.vercel.app/changePassword

**Description:** This endpoint is used to let  a user to change their password  by their old password and new password.

**Access:** every user has access to this api

**Headers:** `Authorization` : [access_token]

**Request Body:**
```json
{
    "oldPassword" : "test",
    "newPassword" : "hafiz"
}
```
**response Body:**
```json
{
    "message" : "password Updated successfully"
}
```



## Endpoint: POST https://icsrmms.vercel.app/forgotPassword

**Description:** This endpoint is used to let  a user to retrice  their password  by giving their mail and get a e-mail to that mail with the password and login credentials.

**Access:** every user has access to this api

**Headers:** `Authorization` : [access_token]

**Request Body:**
```json
{
    "ex_email" : "hafiz.sust333@gmail.com"
}
```
**response Body:**
```json
{
    "message": "Password sent to your email"
}
```


