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

## Endpoint: GET https://icsrmms.vercel.app/seeProfile

**Description:** This endpoint is used to retrieve a single User's Profile.

**Access:** All user .

**Headers:** `Authorization` : [access_token]


**Response:**
```json
{
    "ex_id": 3,
    "ex_name": "admin",
    "ex_email": "admin@gmail.com",
    "ex_contactNO": 23434,
    "status": "true",
    "role_name": "Super Admin"
}
```

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
    "ex_id" : 6,
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

# **ITEM**

## Endpoint:POST https://icsrmms.vercel.app/item/addItem

**Description:** This endpoint is used to add a new  item 

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "item_name" : "MS ROD"
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Item added succesfully",
    "success": true,
    "data": {
        "id": "ITEM_0002",
        "item_name": "MS ROD",
        "created_at": "2023-11-05T03:51:37.000Z",
        "updated_at": "2023-11-05T15:37:45.000Z"
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/item/getItem

**Description:** This endpoint is used to get all the item info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json

{
    "status": 200,
    "success": true,
    "data": [
        {
            "id": "ITEM_0002",
            "item_name": "MS ROD",
            "created_at": "2023-11-05T03:51:37.000Z",
            "updated_at": "2023-11-05T15:37:45.000Z"
        }
        ]
}
```

## Endpoint:GET https://icsrmms.vercel.app/item/ITEM_0002

**Description:** This endpoint is used to get  the item info by id(ITEM_0002) 

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "success": true,
    "data": [
        {
            "id": "ITEM_0002",
            "item_name": "MS ROD",
            "created_at": "2023-11-05T03:51:37.000Z",
            "updated_at": "2023-11-05T15:37:45.000Z"
        }
    ]
}
```


## Endpoint:PATCH https://icsrmms.vercel.app/item/ITEM_0002

**Description:** This endpoint is used to Update the name of  an item by by id(ITEM_0002)

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "item_name" : "MS ROD2"
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Item updated successfully",
    "success": true,
    "data": {
        "id": "ITEM_0002",
        "item_name": "MS ROD2",
        "created_at": "2023-11-05T03:51:37.000Z",
        "updated_at": "2023-11-06T00:03:29.000Z"
    }
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/item/ITEM_0002

**Description:** This endpoint is used to Delete an item by id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Item deleted Successfully",
    "success": true,
    "data": {
        "id": "ITEM_0002",
        "item_name": "MS ROD2",
        "created_at": "2023-11-05T03:51:37.000Z",
        "updated_at": "2023-11-06T00:03:29.000Z"
    }
}
```

# **requisition**

## Endpoint:POST https://icsrmms.vercel.app/requisition/addRequisition

**Description:** This endpoint is used to add a new  req 

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "item_id": "ITEM_0002",
    "quantity": 2,
    "purpose": "this is my purpose none of your purpose",
    "project_name": "this is my project none of your project",
    "location": "this is my location none of your location"
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Requistion Created Successfully",
    "success": true,
    "data": {
        "id": "REQ_0004",
        "creator_id": 2,
        "item_id": "ITEM_0009",
        "quantity": 100,
        "purpose": "this is my purpose none of your purpose",
        "project_name": "this is my project none of your project",
        "location": "this is my location none of your location",
        "created_at": "2023-11-05T04:52:35.000Z",
        "updated_at": "2023-11-05T21:12:36.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "item": {
            "id": "ITEM_0002",
            "item_name": "MS ROD",
            "created_at": "2023-11-05T03:51:37.000Z",
            "updated_at": "2023-11-05T15:37:45.000Z"
        }
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/requisition/getAllRequisition

**Description:** This endpoint is used to get all the requisition info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "Requisitions Fetched Successfully",
    "success": true,
    "data": [
        {
            "id": "REQ_0004",
            "creator_id": 2,
            "item_id": "ITEM_0009",
            "quantity": 100,
            "purpose": "this is my purpose none of your purpose",
            "project_name": "this is my project none of your project",
            "location": "this is my location none of your location",
            "created_at": "2023-11-05T04:52:35.000Z",
            "updated_at": "2023-11-05T21:12:36.000Z",
            "user": {
                "ex_id": 2,
                "ex_email": "hafiz.sust333@gmail.com",
                "ex_name": "forhad"
            },
            "item": {
                "id": "ITEM_0009",
                "item_name": "item 3",
                "created_at": "2023-11-05T04:00:20.000Z",
                "updated_at": "2023-11-05T04:00:20.000Z"
            }
        }]
   }
```

## Endpoint:GET https://icsrmms.vercel.app/requisition/REQ_0004

**Description:** This endpoint is used to get  the requisition infoby id(REQ_0004)

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "Requisition Fetched Successfully",
    "success": true,
    "data": {
        "id": "REQ_0004",
        "creator_id": 2,
        "item_id": "ITEM_0009",
        "quantity": 100,
        "purpose": "this is my purpose none of your purpose",
        "project_name": "this is my project none of your project",
        "location": "this is my location none of your location",
        "created_at": "2023-11-05T04:52:35.000Z",
        "updated_at": "2023-11-05T21:12:36.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "item": {
            "id": "ITEM_0009",
            "item_name": "item 3",
            "created_at": "2023-11-05T04:00:20.000Z",
            "updated_at": "2023-11-05T04:00:20.000Z"
        }
    }
}
```


## Endpoint:PATCH https://icsrmms.vercel.app/requisition/REQ_0004

**Description:** This endpoint is used to change the item id of  an req by by requisition id
(multiple filed update enabled, so any number of field can be updated)

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
     "item_id": "ITEM_0009",
     "quantity": 1000

}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Requisition Updated Successfully",
    "success": true,
    "data": {
        "id": "REQ_0004",
        "creator_id": 2,
        "item_id": "ITEM_0009",
        "quantity": 1000,
        "purpose": "this is my purpose none of your purpose",
        "project_name": "this is my project none of your project",
        "location": "this is my location none of your location",
        "created_at": "2023-11-05T04:52:35.000Z",
        "updated_at": "2023-11-06T00:16:25.000Z",
        "item": {
            "id": "ITEM_0009",
            "item_name": "item 3",
            "created_at": "2023-11-05T04:00:20.000Z",
            "updated_at": "2023-11-05T04:00:20.000Z"
        }
    }
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/requisition/REQ_0009

**Description:** This endpoint is used to Delete an requisition by id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Requisition Deleted Successfully",
    "success": true,
    "data": {
        "id": "REQ_0009",
        "creator_id": 2,
        "item_id": "ITEM_0009",
        "quantity": 1000,
        "purpose": "this is my purpose none of your purpose",
        "project_name": "this is my project none of your project",
        "location": "this is my location none of your location",
        "created_at": "2023-11-05T23:00:11.000Z",
        "updated_at": "2023-11-06T00:18:43.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "item": {
            "id": "ITEM_0009",
            "item_name": "item 3",
            "created_at": "2023-11-05T04:00:20.000Z",
            "updated_at": "2023-11-05T04:00:20.000Z"
        }
    }
}
```


# **Tender**

## Endpoint:POST https://icsrmms.vercel.app/tender/addTender

**Description:** This endpoint is used to add a new tender

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "Project_Name": "IICT Toilet Project",
    "tender_location": "akhalia boro school,uganda",
    "tender_item_id": "ITEM_0005",
    "tender_item_qtity": 100,
    "tender_deadline": "2023-12-31"
}

```

**Response Body**
```json
{
    "message": "Tender Added Successfully"
}
```



## Endpoint:GET https://icsrmms.vercel.app/tender/getTender

**Description:** This endpoint is used to get all the Tender info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
[
    
    {
        "tender_SLNo": "TENDER_0001",
        "creator_name": "admin",
        "tender_date": "2023-10-30T18:00:00.000Z",
        "Project_Name": "Construction Project",
        "tender_location": "City Center",
        "item_name": "Balu",
        "tender_item_qtity": 100,
        "tender_deadline": "2023-12-30T18:00:00.000Z"
    }
]
```


## Endpoint:PATCH https://icsrmms.vercel.app/requisition/updateTender

**Description:** This endpoint is used to change the Property of  a tender  by Tender id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "tender_SLNo" : "TENDER_0001",
    "tender_creator_id": 3,
    "tender_date": "2023-10-31",
    "Project_Name": "Construction Project",
    "tender_location": "City Center",
    "tender_item_id": "ITEM_0005",
    "tender_item_qtity": 100,
    "tender_deadline": "2023-12-31"
}
```

**Response Body**
```json
{
    "message": "Tender updated Successfully"
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/tender/deleteTenderBySLNo

**Description:** This endpoint is used to Delete an tender by SL No

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "tender_SLNo" : "TENDER_0002"
 
}

```

**Response Body**
```json
{
    "message": "Tender deleted Successfully"
}
```
