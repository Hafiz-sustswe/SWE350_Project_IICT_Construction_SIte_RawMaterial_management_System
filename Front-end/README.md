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
    "item_name" : "MS Rod", 
    "item_id" : "ITEM_0001",
    "item_price" : 6767.89,
    "date_added" : "2023-10-26",
    "supplier_id" : 10
}
```

**Response Body**
```json
{
    "message": "Item Added Successfully"
}
```



## Endpoint:GET https://icsrmms.vercel.app/item/getItem

**Description:** This endpoint is used to get all the item info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
[
    {
        "item_id": "ITEM_0005",
        "item_name": "Balu",
        "item_price": 6767.89,
        "date_added": "2023-10-26T00:00:00.000Z",
        "supplier_id": 10
    },
    
    {
        "item_id": "ITEM_0007",
        "item_name": "MS Rod2",
        "item_price": 6767.89,
        "date_added": "2023-10-26T00:00:00.000Z",
        "supplier_id": 10
    }
]
```


## Endpoint:PATCH https://icsrmms.vercel.app/item/updateItem

**Description:** This endpoint is used to Update the name of  an item by by id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "item_name" : "Balu", 
    "item_id" :  "ITEM_0005"

}
```

**Response Body**
```json
{
    "message": "Item updated Successfully"
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/item/deleteItemById

**Description:** This endpoint is used to Delete an item by id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{

    "item_id" :  "ITEM_0002"

}
```

**Response Body**
```json
{

  
    "message": "Item deleted Succesfully"


}
```

# **requisition**

## Endpoint:POST https://icsrmms.vercel.app/requisition/addRequisition

**Description:** This endpoint is used to add a new  item 

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "req_creator_id" : 4, 
     "req_date" : "2023-10-26",
    "reqitem_id" : "ITEM_0005",
    "req_qtity" : 6767,
    "purpose" : "Bathroom e bodna lagbe"
}
```

**Response Body**
```json
{
    "message": "Requisition Added Successfully"
}
```



## Endpoint:GET https://icsrmms.vercel.app/requisition/getRequisition

**Description:** This endpoint is used to get all the requisition info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
[
    {
        "req_id": "REQ_0001",
        "req_creator_id": 4,
        "req_date": "2023-10-25T18:00:00.000Z",
        "req_item_id": null,
        "req_qtity": 6767,
        "purpose": "hudai dilam rki"
    }
]
```


## Endpoint:PATCH https://icsrmms.vercel.app/requisition/updateRequisition

**Description:** This endpoint is used to change the item id of  an req by by requisition id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
 
    "req_item_id" : "ITEM_0005",
    "req_id" : "REQ_0001"
    
}
```

**Response Body**
```json
{
    "message": "Requisition updated Successfully"
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/requisition/deleteRequisitionById

**Description:** This endpoint is used to Delete an requisition by id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{

    "item_id" :  "REQ_0002"

}
```

**Response Body**
```json
{

  
    "message": "Req deleted Succesfully"


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
    "tender_creator_id": 3,
    "tender_date": "2023-12-31",
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



## Endpoint:GET https://icsrmms.vercel.app/requisition/getTender

**Description:** This endpoint is used to get all the Tender info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
[
    {
        "tender_SLNo": "TENDER_0001",
        "tender_creator_id": 3,
        "tender_date": "2023-12-30T18:00:00.000Z",
        "Project_Name": "Construction Project",
        "tender_location": "City Center",
        "tender_item_id": "ITEM_0005",
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
