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
    "requisition_id" : "REQ_0004",
    "deadline" : "2025-2-2"

}

```

**Response Body**
```json
{
    "status": 200,
    "message": "Tender Created Successfully",
    "success": true,
    "data": {
        "id": "TENDER_0015",
        "requisition_id": "REQ_0004",
        "creator_id": 2,
        "deadline": "2025-02-02T00:00:00.000Z",
        "created_at": "2023-11-06T07:44:18.000Z",
        "updated_at": "2023-11-06T07:44:18.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "requisition": {
            "id": "REQ_0004",
            "creator_id": 2,
            "item_id": "ITEM_0009",
            "quantity": 100,
            "purpose": "this is my purpose none of your purpose",
            "project_name": "this is my project none of your project",
            "location": "this is my location none of your location",
            "created_at": "2023-11-05T10:52:35.000Z",
            "updated_at": "2023-11-06T06:51:18.000Z"
        }
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/tender/getAllTender

**Description:** This endpoint is used to get all the Tender info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json

    {
    "status": 200,
    "message": "Tender Fetched Successfully",
    "success": true,
    "data": {
        "id": "TENDER_0001",
        "requisition_id": "REQ_0005",
        "creator_id": 2,
        "deadline": "2025-07-03T00:00:00.000Z",
        "created_at": "2023-11-06T05:33:31.000Z",
        "updated_at": "2023-11-06T05:33:31.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "requisition": {
            "id": "REQ_0005",
            "creator_id": 2,
            "item_id": "ITEM_0002",
            "quantity": 2,
            "purpose": "this is my purpose none of your purpose",
            "project_name": "this is my project none of your project",
            "location": "this is my location none of your location",
            "created_at": "2023-11-05T10:55:47.000Z",
            "updated_at": "2023-11-05T10:55:47.000Z",
                "item": {
                    "id": "ITEM_0002",
                    "item_name": "MSPP rodbhai",
                    "created_at": "2023-11-05T09:51:37.000Z",
                    "updated_at": "2023-11-06T21:31:37.000Z"
        }
    }
}

```


## Endpoint:PATCH https://icsrmms.vercel.app/tender/TENDER_0005

**Description:** This endpoint is used to change the Property of  a tender  by Tender id for updating

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "requisition_id" : "REQ_0005",
    "creator_id" : 11
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Tender Updated Successfully",
    "success": true,
    "data": {
        "id": "TENDER_0005",
        "requisition_id": "REQ_0005",
        "creator_id": 11,
        "deadline": "2025-02-02T00:00:00.000Z",
        "created_at": "2023-11-06T05:16:11.000Z",
        "updated_at": "2023-11-06T21:13:52.000Z",
        "user": {
            "ex_id": 11,
            "ex_email": "mohaadfadfmmadhossain1011@gmail.com",
            "ex_name": "aasdf"
        },
        "requisition": {
            "id": "REQ_0005",
            "creator_id": 2,
            "item_id": "ITEM_0002",
            "quantity": 2,
            "purpose": "this is my purpose none of your purpose",
            "project_name": "this is my project none of your project",
            "location": "this is my location none of your location",
            "created_at": "2023-11-05T10:55:47.000Z",
            "updated_at": "2023-11-05T10:55:47.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            }
        }
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/tender/TENDER_0001

**Description:** This endpoint is used to get  the tender info by id(TENDER_0001)

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "Tender Fetched Successfully",
    "success": true,
    "data": {
        "id": "TENDER_0005",
        "requisition_id": "REQ_0005",
        "creator_id": 11,
        "deadline": "2025-02-02T00:00:00.000Z",
        "created_at": "2023-11-06T05:16:11.000Z",
        "updated_at": "2023-11-06T21:13:52.000Z",
        "user": {
            "ex_id": 11,
            "ex_email": "mohaadfadfmmadhossain1011@gmail.com",
            "ex_name": "aasdf"
        },
        "requisition": {
            "id": "REQ_0005",
            "creator_id": 2,
            "item_id": "ITEM_0002",
            "quantity": 2,
            "purpose": "this is my purpose none of your purpose",
            "project_name": "this is my project none of your project",
            "location": "this is my location none of your location",
            "created_at": "2023-11-05T10:55:47.000Z",
            "updated_at": "2023-11-05T10:55:47.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            }
        }
    }
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/tender/TENDER_0006

**Description:** This endpoint is used to Delete an tender by SL No

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Tender Deleted Successfully",
    "success": true,
    "data": {
        "id": "TENDER_0006",
        "requisition_id": "REQ_0005",
        "creator_id": 2,
        "deadline": "2025-02-02T00:00:00.000Z",
        "created_at": "2023-11-06T05:16:49.000Z",
        "updated_at": "2023-11-06T05:16:49.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "requisition": {
            "id": "REQ_0005",
            "creator_id": 2,
            "item_id": "ITEM_0002",
            "quantity": 2,
            "purpose": "this is my purpose none of your purpose",
            "project_name": "this is my project none of your project",
            "location": "this is my location none of your location",
            "created_at": "2023-11-05T10:55:47.000Z",
            "updated_at": "2023-11-05T10:55:47.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            }
        }
    }
}
```

# **Priced_bill**

## Endpoint:POST https://icsrmms.vercel.app/pricedBill//addPricedBill

**Description:** This endpoint is used to add a new priced bill

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "tender_id" : "TENDER_0005",
    "price" : 100,
    "status" : "PENDING"
 }

```

**Response Body**
```json
{
    "status": 200,
    "message": "Priced Bill Created Successfully",
    "success": true,
    "data": {
        "id": "PRICED_BILL_0007",
        "tender_id": "TENDER_0005",
        "creator_id": 47,
        "price": "100.00",
        "total_price": "200.00",
        "status": "PENDING",
        "created_at": "2023-11-07T18:34:11.000Z",
        "updated_at": "2023-11-07T18:34:11.000Z",
        "user": {
            "ex_id": 47,
            "ex_email": "w6486769@gmail.com",
            "ex_name": "SUPER ADMIN"
        },
        "tender": {
            "id": "TENDER_0005",
            "requisition_id": "REQ_0005",
            "creator_id": 11,
            "deadline": "2025-02-02T00:00:00.000Z",
            "created_at": "2023-11-06T05:16:11.000Z",
            "updated_at": "2023-11-06T21:13:52.000Z",
            "requisition": {
                "quantity": 2,
                "item_id": "ITEM_0002",
                "item": {
                    "id": "ITEM_0002",
                    "item_name": "MSPP rodbhai",
                    "created_at": "2023-11-05T09:51:37.000Z",
                    "updated_at": "2023-11-06T21:31:37.000Z"
                }
            }
        }
    }
}
```

## Endpoint:GET https://icsrmms.vercel.app/pricedBill/getAllPricedBill

**Description:** This endpoint is used to get all the priced_bill info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "Priced Bills fetched Successfully",
    "success": true,
    "data": [
        {
            "id": "PRICED_BILL_0001",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": 200,
            "status": "PENDING",
            "created_at": "2023-11-07T00:32:10.000Z",
            "updated_at": "2023-11-07T00:32:10.000Z",
            "user": {
                "ex_id": 2,
                "ex_email": "hafiz.sust333@gmail.com",
                "ex_name": "forhad"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        {
            "id": "PRICED_BILL_0002",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "10.00",
            "total_price": 20,
            "status": "PENDING",
            "created_at": "2023-11-07T00:34:01.000Z",
            "updated_at": "2023-11-07T05:43:29.000Z",
            "user": {
                "ex_id": 2,
                "ex_email": "hafiz.sust333@gmail.com",
                "ex_name": "forhad"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        {
            "id": "PRICED_BILL_0003",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": 200,
            "status": "PENDING",
            "created_at": "2023-11-07T00:37:57.000Z",
            "updated_at": "2023-11-07T00:37:57.000Z",
            "user": {
                "ex_id": 2,
                "ex_email": "hafiz.sust333@gmail.com",
                "ex_name": "forhad"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        {
            "id": "PRICED_BILL_0004",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": 200,
            "status": "PENDING",
            "created_at": "2023-11-07T05:52:02.000Z",
            "updated_at": "2023-11-07T05:52:02.000Z",
            "user": {
                "ex_id": 2,
                "ex_email": "hafiz.sust333@gmail.com",
                "ex_name": "forhad"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        {
            "id": "PRICED_BILL_0005",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": 200,
            "status": "PENDING",
            "created_at": "2023-11-07T05:52:06.000Z",
            "updated_at": "2023-11-07T05:52:06.000Z",
            "user": {
                "ex_id": 2,
                "ex_email": "hafiz.sust333@gmail.com",
                "ex_name": "forhad"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        {
            "id": "PRICED_BILL_0006",
            "tender_id": "TENDER_0005",
            "creator_id": 51,
            "price": "1000.00",
            "total_price": 2000,
            "status": "PENDING",
            "created_at": "2023-11-07T16:12:37.000Z",
            "updated_at": "2023-11-07T16:12:37.000Z",
            "user": {
                "ex_id": 51,
                "ex_email": "ifaz.aiman31@gmail.com",
                "ex_name": "RodSupplier"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        {
            "id": "PRICED_BILL_0007",
            "tender_id": "TENDER_0005",
            "creator_id": 47,
            "price": "100.00",
            "total_price": 200,
            "status": "PENDING",
            "created_at": "2023-11-07T18:34:11.000Z",
            "updated_at": "2023-11-07T18:34:11.000Z",
            "user": {
                "ex_id": 47,
                "ex_email": "w6486769@gmail.com",
                "ex_name": "SUPER ADMIN"
            },
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        }
    ]
}
```

## Endpoint:GET https://icsrmms.vercel.app/pricedBill/PRICED_BILL_0001

**Description:** This endpoint is used to get the priced_bill info by id(PRICED_BILL_0001)

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "Priced Bill fetched Successfully",
    "success": true,
    "data": {
        "id": "PRICED_BILL_0001",
        "tender_id": "TENDER_0005",
        "creator_id": 2,
        "price": "100.00",
        "total_price": 200,
        "status": "PENDING",
        "created_at": "2023-11-07T00:32:10.000Z",
        "updated_at": "2023-11-07T00:32:10.000Z",
        "user": {
            "ex_id": 2,
            "ex_email": "hafiz.sust333@gmail.com",
            "ex_name": "forhad"
        },
        "tender": {
            "id": "TENDER_0005",
            "requisition_id": "REQ_0005",
            "creator_id": 11,
            "deadline": "2025-02-02T00:00:00.000Z",
            "created_at": "2023-11-06T05:16:11.000Z",
            "updated_at": "2023-11-06T21:13:52.000Z",
            "requisition": {
                "id": "REQ_0005",
                "creator_id": 2,
                "item_id": "ITEM_0002",
                "quantity": 2,
                "purpose": "this is my purpose none of your purpose",
                "project_name": "this is my project none of your project",
                "location": "this is my location none of your location",
                "created_at": "2023-11-05T10:55:47.000Z",
                "updated_at": "2023-11-05T10:55:47.000Z",
                "item": {
                    "id": "ITEM_0002",
                    "item_name": "MSPP rodbhai",
                    "created_at": "2023-11-05T09:51:37.000Z",
                    "updated_at": "2023-11-06T21:31:37.000Z"
                }
            }
        }
    }
}
```

## Endpoint:PATCH https://icsrmms.vercel.app/pricedBill/PRICED_BILL_0002

**Description:** This endpoint is used to change the Property of  a priced_bill  by priced bill id for updating

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    
    "tender_id" : "TENDER_0005",
    "price" : 10,
    "status" : "PENDING"

}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Priced Bill Updated Successfully",
    "success": true,
    "data": {
        "id": "PRICED_BILL_0002",
        "tender_id": "TENDER_0005",
        "creator_id": 47,
        "price": "10.00",
        "total_price": "20.00",
        "status": "PENDING",
        "created_at": "2023-11-07T00:34:01.000Z",
        "updated_at": "2023-11-07T18:49:41.000Z",
        "user": {
            "ex_id": 47,
            "ex_email": "w6486769@gmail.com",
            "ex_name": "SUPER ADMIN"
        },
        "tender": {
            "id": "TENDER_0005",
            "requisition_id": "REQ_0005",
            "creator_id": 11,
            "deadline": "2025-02-02T00:00:00.000Z",
            "created_at": "2023-11-06T05:16:11.000Z",
            "updated_at": "2023-11-06T21:13:52.000Z",
            "requisition": {
                "id": "REQ_0005",
                "creator_id": 2,
                "item_id": "ITEM_0002",
                "quantity": 2,
                "purpose": "this is my purpose none of your purpose",
                "project_name": "this is my project none of your project",
                "location": "this is my location none of your location",
                "created_at": "2023-11-05T10:55:47.000Z",
                "updated_at": "2023-11-05T10:55:47.000Z",
                "item": {
                    "id": "ITEM_0002",
                    "item_name": "MSPP rodbhai",
                    "created_at": "2023-11-05T09:51:37.000Z",
                    "updated_at": "2023-11-06T21:31:37.000Z"
                }
            }
        }
    }
}
```

## Endpoint: DELETE https://icsrmms.vercel.app/pricedBill/PRICED_BILL_0005

**Description:** This endpoint is used to Delete an priced_bill by Id

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Priced Bill Deleted Successfully",
    "success": true,
    "data": {
        "id": "PRICED_BILL_0005",
        "tender_id": "TENDER_0005",
        "creator_id": 2,
        "price": "100.00",
        "total_price": "200.00",
        "status": "PENDING",
        "created_at": "2023-11-07T05:52:06.000Z",
        "updated_at": "2023-11-07T05:52:06.000Z",
        "tender": {
            "id": "TENDER_0005",
            "requisition_id": "REQ_0005",
            "creator_id": 11,
            "deadline": "2025-02-02T00:00:00.000Z",
            "created_at": "2023-11-06T05:16:11.000Z",
            "updated_at": "2023-11-06T21:13:52.000Z",
            "requisition": {
                "id": "REQ_0005",
                "creator_id": 2,
                "item_id": "ITEM_0002",
                "quantity": 2,
                "purpose": "this is my purpose none of your purpose",
                "project_name": "this is my project none of your project",
                "location": "this is my location none of your location",
                "created_at": "2023-11-05T10:55:47.000Z",
                "updated_at": "2023-11-05T10:55:47.000Z",
                "item": {
                    "id": "ITEM_0002",
                    "item_name": "MSPP rodbhai",
                    "created_at": "2023-11-05T09:51:37.000Z",
                    "updated_at": "2023-11-06T21:31:37.000Z"
                }
            }
        }
    }
}
```


# **CreateReceipt**

## Endpoint:POST https://icsrmms.vercel.app/receipt//createReceipt

**Description:** This endpoint is used to add a new Receipt

**Access:** user

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "priced_bill_id" : "PRICED_BILL_0001",
    "expected_delivery_date" : "2023-1-2"
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Receipt Created Successfully",
    "success": true,
    "data": {
        "id": "RECEIPT_0004",
        "priced_bill_id": "PRICED_BILL_0001",
        "expected_delivery_date": "2023-01-02T00:00:00.000Z",
        "damaged_quantity": null,
        "receiver_id": null,
        "created_at": "2023-11-11T19:12:07.000Z",
        "updated_at": "2023-11-11T19:12:07.000Z",
        "creator_id": 51,
        "priced_bill": {
            "id": "PRICED_BILL_0001",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": "200.00",
            "status": "PENDING",
            "created_at": "2023-11-07T00:32:10.000Z",
            "updated_at": "2023-11-07T00:32:10.000Z",
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            },
            "user": {
                "ex_id": 51,
                "ex_email": "ifaz.aiman31@gmail.com",
                "ex_name": "RodSupplier"
            }
        }
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/receipt/getAllReceipts

**Description:** This endpoint is used to get all receipts

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json

{
    "status": 200,
    "message": "Receipts fetched Successfully",
    "success": true,
    "data": [
        {
            "id": "RECEIPT_0001",
            "priced_bill_id": "PRICED_BILL_0002",
            "expected_delivery_date": "2023-12-31T00:00:00.000Z",
            "damaged_quantity": 100,
            "receiver_id": 50,
            "created_at": "2023-11-09T06:55:00.000Z",
            "updated_at": "2023-11-11T08:51:37.000Z",
            "creator_id": 51,
            "priced_bill": {
                "id": "PRICED_BILL_0002",
                "tender_id": "TENDER_0005",
                "creator_id": 51,
                "price": "100.00",
                "total_price": "200.00",
                "status": "PENDING",
                "created_at": "2023-11-07T00:34:01.000Z",
                "updated_at": "2023-11-11T08:33:30.000Z",
                "tender": {
                    "id": "TENDER_0005",
                    "requisition_id": "REQ_0005",
                    "creator_id": 11,
                    "deadline": "2025-02-02T00:00:00.000Z",
                    "created_at": "2023-11-06T05:16:11.000Z",
                    "updated_at": "2023-11-06T21:13:52.000Z",
                    "requisition": {
                        "id": "REQ_0005",
                        "creator_id": 2,
                        "item_id": "ITEM_0002",
                        "quantity": 2,
                        "purpose": "this is my purpose none of your purpose",
                        "project_name": "this is my project none of your project",
                        "location": "this is my location none of your location",
                        "created_at": "2023-11-05T10:55:47.000Z",
                        "updated_at": "2023-11-05T10:55:47.000Z",
                        "item": {
                            "id": "ITEM_0002",
                            "item_name": "MSPP rodbhai",
                            "created_at": "2023-11-05T09:51:37.000Z",
                            "updated_at": "2023-11-06T21:31:37.000Z"
                        }
                    }
                },
                "user": {
                    "ex_id": 51,
                    "ex_email": "ifaz.aiman31@gmail.com",
                    "ex_name": "RodSupplier"
                }
            }
        },
        {
            "id": "RECEIPT_0003",
            "priced_bill_id": "PRICED_BILL_0001",
            "expected_delivery_date": "2023-12-31T00:00:00.000Z",
            "damaged_quantity": null,
            "receiver_id": null,
            "created_at": "2023-11-09T06:59:41.000Z",
            "updated_at": "2023-11-09T06:59:41.000Z",
            "creator_id": 51,
            "priced_bill": {
                "id": "PRICED_BILL_0001",
                "tender_id": "TENDER_0005",
                "creator_id": 2,
                "price": "100.00",
                "total_price": "200.00",
                "status": "PENDING",
                "created_at": "2023-11-07T00:32:10.000Z",
                "updated_at": "2023-11-07T00:32:10.000Z",
                "tender": {
                    "id": "TENDER_0005",
                    "requisition_id": "REQ_0005",
                    "creator_id": 11,
                    "deadline": "2025-02-02T00:00:00.000Z",
                    "created_at": "2023-11-06T05:16:11.000Z",
                    "updated_at": "2023-11-06T21:13:52.000Z",
                    "requisition": {
                        "id": "REQ_0005",
                        "creator_id": 2,
                        "item_id": "ITEM_0002",
                        "quantity": 2,
                        "purpose": "this is my purpose none of your purpose",
                        "project_name": "this is my project none of your project",
                        "location": "this is my location none of your location",
                        "created_at": "2023-11-05T10:55:47.000Z",
                        "updated_at": "2023-11-05T10:55:47.000Z",
                        "item": {
                            "id": "ITEM_0002",
                            "item_name": "MSPP rodbhai",
                            "created_at": "2023-11-05T09:51:37.000Z",
                            "updated_at": "2023-11-06T21:31:37.000Z"
                        }
                    }
                },
                "user": {
                    "ex_id": 51,
                    "ex_email": "ifaz.aiman31@gmail.com",
                    "ex_name": "RodSupplier"
                }
            }
        },
        {
            "id": "RECEIPT_0004",
            "priced_bill_id": "PRICED_BILL_0001",
            "expected_delivery_date": "2023-01-02T00:00:00.000Z",
            "damaged_quantity": null,
            "receiver_id": null,
            "created_at": "2023-11-11T19:12:07.000Z",
            "updated_at": "2023-11-11T19:12:07.000Z",
            "creator_id": 51,
            "priced_bill": {
                "id": "PRICED_BILL_0001",
                "tender_id": "TENDER_0005",
                "creator_id": 2,
                "price": "100.00",
                "total_price": "200.00",
                "status": "PENDING",
                "created_at": "2023-11-07T00:32:10.000Z",
                "updated_at": "2023-11-07T00:32:10.000Z",
                "tender": {
                    "id": "TENDER_0005",
                    "requisition_id": "REQ_0005",
                    "creator_id": 11,
                    "deadline": "2025-02-02T00:00:00.000Z",
                    "created_at": "2023-11-06T05:16:11.000Z",
                    "updated_at": "2023-11-06T21:13:52.000Z",
                    "requisition": {
                        "id": "REQ_0005",
                        "creator_id": 2,
                        "item_id": "ITEM_0002",
                        "quantity": 2,
                        "purpose": "this is my purpose none of your purpose",
                        "project_name": "this is my project none of your project",
                        "location": "this is my location none of your location",
                        "created_at": "2023-11-05T10:55:47.000Z",
                        "updated_at": "2023-11-05T10:55:47.000Z",
                        "item": {
                            "id": "ITEM_0002",
                            "item_name": "MSPP rodbhai",
                            "created_at": "2023-11-05T09:51:37.000Z",
                            "updated_at": "2023-11-06T21:31:37.000Z"
                        }
                    }
                },
                "user": {
                    "ex_id": 51,
                    "ex_email": "ifaz.aiman31@gmail.com",
                    "ex_name": "RodSupplier"
                }
            }
        }
    ]
}
```

## Endpoint:GET https://icsrmms.vercel.app/receipt/RECEIPT_0001

**Description:** This endpoint is used to get the receipt info by id(RECEIPT_0001) 

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Receipt Fetched Successfully",
    "success": true,
    "data": {
        "id": "RECEIPT_0001",
        "priced_bill_id": "PRICED_BILL_0002",
        "expected_delivery_date": "2023-12-31T00:00:00.000Z",
        "damaged_quantity": 100,
        "receiver_id": 50,
        "created_at": "2023-11-09T06:55:00.000Z",
        "updated_at": "2023-11-11T08:51:37.000Z",
        "creator_id": 51,
        "priced_bill": {
            "id": "PRICED_BILL_0002",
            "tender_id": "TENDER_0005",
            "creator_id": 51,
            "price": "100.00",
            "total_price": "200.00",
            "status": "PENDING",
            "created_at": "2023-11-07T00:34:01.000Z",
            "updated_at": "2023-11-11T08:33:30.000Z",
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            },
            "user": {
                "ex_id": 51,
                "ex_email": "ifaz.aiman31@gmail.com",
                "ex_name": "RodSupplier"
            }
        }
    }
}
```


## Endpoint:PATCH https://icsrmms.vercel.app/receipt/RECEIPT_0001

**Description:** This endpoint is used to Update the receipt by by id(RECEIPT_0001)

**Access:** storekeeper and supplier

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
  "damaged_quantity": 100,
  "receiver_id": 50
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Receipt Updated Successfully",
    "success": true,
    "data": {
        "id": "RECEIPT_0003",
        "priced_bill_id": "PRICED_BILL_0001",
        "expected_delivery_date": "2023-12-31T00:00:00.000Z",
        "damaged_quantity": 150,
        "receiver_id": 50,
        "created_at": "2023-11-09T12:59:41.000Z",
        "updated_at": "2023-11-12T07:45:35.000Z",
        "creator_id": 51,
        "inventory_creation": {
            "status": 200,
            "message": "Inventory Created Successfully",
            "success": true,
            "data": {
                "id": "INVENTORY_0014",
                "item": {
                    "id": "ITEM_0002",
                    "item_name": "MSPP rodbhai",
                    "created_at": "2023-11-05T09:51:37.000Z",
                    "updated_at": "2023-11-06T21:31:37.000Z"
                },
                "quantity_in": -148,
                "quantity_out": 0,
                "manager": {
                    "ex_id": 50,
                    "ex_email": "ifaaiman17@gmail.com",
                    "ex_name": "StoreKeeper"
                }
            }
        },
        "priced_bill": {
            "id": "PRICED_BILL_0001",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": "200.00",
            "status": "PENDING",
            "created_at": "2023-11-07T00:32:10.000Z",
            "updated_at": "2023-11-07T00:32:10.000Z",
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        "user": {
            "ex_id": 51,
            "ex_email": "ifaz.aiman31@gmail.com",
            "ex_name": "RodSupplier"
        },
        "receiver": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        }
    }
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/receipt/RECEIPT_0001

**Description:** This endpoint is used to Delete a receipt by id

**Access:** user

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Receipt Deleted Successfully",
    "success": true,
    "data": {
        "id": "RECEIPT_0005",
        "priced_bill_id": "PRICED_BILL_0001",
        "expected_delivery_date": "2023-01-02T00:00:00.000Z",
        "damaged_quantity": null,
        "receiver_id": null,
        "created_at": "2023-11-12T07:50:08.000Z",
        "updated_at": "2023-11-12T07:50:08.000Z",
        "creator_id": 51,
        "priced_bill": {
            "id": "PRICED_BILL_0001",
            "tender_id": "TENDER_0005",
            "creator_id": 2,
            "price": "100.00",
            "total_price": "200.00",
            "status": "PENDING",
            "created_at": "2023-11-07T00:32:10.000Z",
            "updated_at": "2023-11-07T00:32:10.000Z",
            "tender": {
                "id": "TENDER_0005",
                "requisition_id": "REQ_0005",
                "creator_id": 11,
                "deadline": "2025-02-02T00:00:00.000Z",
                "created_at": "2023-11-06T05:16:11.000Z",
                "updated_at": "2023-11-06T21:13:52.000Z",
                "requisition": {
                    "id": "REQ_0005",
                    "creator_id": 2,
                    "item_id": "ITEM_0002",
                    "quantity": 2,
                    "purpose": "this is my purpose none of your purpose",
                    "project_name": "this is my project none of your project",
                    "location": "this is my location none of your location",
                    "created_at": "2023-11-05T10:55:47.000Z",
                    "updated_at": "2023-11-05T10:55:47.000Z",
                    "item": {
                        "id": "ITEM_0002",
                        "item_name": "MSPP rodbhai",
                        "created_at": "2023-11-05T09:51:37.000Z",
                        "updated_at": "2023-11-06T21:31:37.000Z"
                    }
                }
            }
        },
        "user": {
            "ex_id": 51,
            "ex_email": "ifaz.aiman31@gmail.com",
            "ex_name": "RodSupplier"
        },
        "receiver": []
    }
}
```

# **Inventory**

## Endpoint:POST https://icsrmms.vercel.app//inventory/itemIssue

**Description:** This endpoint is used to issue item.

**Access:** storekeeper

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
  "item_id": "ITEM_0002",
  "quantity_out": 5
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Item Issued Successfully",
    "success": true,
    "data": {
        "id": "INVENTORY_0013",
        "item_id": "ITEM_0002",
        "quantity_in": 0,
        "quantity_out": 5,
        "manager_id": 50,
        "created_at": "2023-11-16T06:59:06.000Z",
        "updated_at": "2023-11-16T06:59:06.000Z",
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        },
        "manager": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        }
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/inventory/getAllInventory

**Description:** This endpoint is used to get all the inventory info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "All Inventory Fetched Successfully",
    "success": true,
    "data": [
        {
            "id": "INVENTORY_0001",
            "item_id": "ITEM_0002",
            "quantity_in": 500,
            "quantity_out": 400,
            "manager_id": 50,
            "created_at": "2023-11-11T09:39:19.000Z",
            "updated_at": "2023-11-11T10:02:21.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0002",
            "item_id": "ITEM_0002",
            "quantity_in": 20,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-11T10:06:26.000Z",
            "updated_at": "2023-11-11T10:06:26.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0003",
            "item_id": "ITEM_0002",
            "quantity_in": 20,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-11T10:06:31.000Z",
            "updated_at": "2023-11-11T10:06:31.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0004",
            "item_id": "ITEM_0002",
            "quantity_in": 20,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-11T10:06:33.000Z",
            "updated_at": "2023-11-11T10:06:33.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0006",
            "item_id": "ITEM_0002",
            "quantity_in": 20,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-11T10:06:37.000Z",
            "updated_at": "2023-11-11T10:06:37.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0007",
            "item_id": "ITEM_0002",
            "quantity_in": 20,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-11T19:40:50.000Z",
            "updated_at": "2023-11-11T19:40:50.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0008",
            "item_id": "ITEM_0002",
            "quantity_in": 95,
            "quantity_out": 0,
            "manager_id": 50,
            "created_at": "2023-11-12T13:31:08.000Z",
            "updated_at": "2023-11-12T13:31:08.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0009",
            "item_id": "ITEM_0002",
            "quantity_in": -148,
            "quantity_out": 0,
            "manager_id": 50,
            "created_at": "2023-11-12T13:36:01.000Z",
            "updated_at": "2023-11-12T13:36:01.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0010",
            "item_id": "ITEM_0002",
            "quantity_in": -148,
            "quantity_out": 0,
            "manager_id": 50,
            "created_at": "2023-11-12T13:43:53.000Z",
            "updated_at": "2023-11-12T13:43:53.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0011",
            "item_id": "ITEM_0002",
            "quantity_in": -148,
            "quantity_out": 0,
            "manager_id": 50,
            "created_at": "2023-11-12T13:45:05.000Z",
            "updated_at": "2023-11-12T13:45:05.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0012",
            "item_id": "ITEM_0002",
            "quantity_in": 0,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-12T13:57:44.000Z",
            "updated_at": "2023-11-12T13:57:44.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "INVENTORY_0013",
            "item_id": "ITEM_0002",
            "quantity_in": 0,
            "quantity_out": 5,
            "manager_id": 50,
            "created_at": "2023-11-16T06:59:06.000Z",
            "updated_at": "2023-11-16T06:59:06.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "manager": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        }
    ]
}
```

## Endpoint:GET https://icsrmms.vercel.app/inventory/INVENTORY_0001

**Description:** This endpoint is used to get the inventory infoby id(INVENTORY_0001)

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
   {
    "status": 200,
    "message": "Inventory Fetched Successfully",
    "success": true,
    "data": {
        "id": "INVENTORY_0001",
        "item_id": "ITEM_0002",
        "quantity_in": 500,
        "quantity_out": 400,
        "manager_id": 50,
        "created_at": "2023-11-11T09:39:19.000Z",
        "updated_at": "2023-11-11T10:02:21.000Z",
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        },
        "manager": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        }
    }
}
```


## Endpoint:PATCH https://icsrmms.vercel.app/inventory/INVENTORY_0001

**Description:** This endpoint is used to update the changed Inventory Record

**Access:** storekeeper

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "quantity_out": 400,
    "quantity_in": 500

}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Inventory Record Updated Successfully",
    "success": true,
    "data": {
        "id": "INVENTORY_0001",
        "item_id": "ITEM_0002",
        "quantity_in": 500,
        "quantity_out": 400,
        "manager_id": 50,
        "created_at": "2023-11-11T09:39:19.000Z",
        "updated_at": "2023-11-11T10:02:21.000Z",
        "user": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        },
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        }
    }
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/inventory/INVENTORY_0005

**Description:** This endpoint is used to Delete Inventory by id

**Access:** storekeeper

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Inventory Deleted Successfully",
    "success": true,
    "data": {
        "id": "INVENTORY_0005",
        "item_id": "ITEM_0002",
        "quantity_in": 20,
        "quantity_out": 5,
        "manager_id": 50,
        "created_at": "2023-11-11T10:06:35.000Z",
        "updated_at": "2023-11-11T10:06:35.000Z",
        "manager": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        },
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        }
    }
}
```

# **Report**

## Endpoint:POST https://icsrmms.vercel.app/report/addReport

**Description:** This endpoint is used to add a new report

**Access:** admin and storekeeper

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "item_id": "ITEM_0002",
    "start_date": "2023-11-11 15:39:19",
    "end_date": "2023-11-11 16:06:37"
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Report Created Successfully",
    "success": true,
    "data": {
        "id": "REPORT_0010",
        "item_id": "ITEM_0002",
        "total_quantity_in": 0,
        "total_quantity_out": 0,
        "balance": 0,
        "start_date": "2023-11-11T00:00:00.000Z",
        "end_date": "2023-11-11T00:00:00.000Z",
        "creator_id": 50,
        "created_at": "2023-11-11T19:57:22.000Z",
        "updated_at": "2023-11-11T19:57:22.000Z",
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        },
        "creator": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        }
    }
}
```



## Endpoint:GET https://icsrmms.vercel.app/report/getAllReports

**Description:** This endpoint is used to get all the report info

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json

{
    "status": 200,
    "message": "Reports Retrieved Successfully",
    "success": true,
    "data": [
        {
            "id": "REPORT_0001",
            "item_id": "ITEM_0002",
            "total_quantity_in": 560,
            "total_quantity_out": 415,
            "balance": 145,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:38:09.000Z",
            "updated_at": "2023-11-11T12:13:30.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0002",
            "item_id": "ITEM_0002",
            "total_quantity_in": 0,
            "total_quantity_out": 0,
            "balance": 0,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:39:13.000Z",
            "updated_at": "2023-11-11T10:39:13.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0003",
            "item_id": "ITEM_0002",
            "total_quantity_in": 0,
            "total_quantity_out": 0,
            "balance": 0,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:41:28.000Z",
            "updated_at": "2023-11-11T10:41:28.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0004",
            "item_id": "ITEM_0002",
            "total_quantity_in": 0,
            "total_quantity_out": 0,
            "balance": 0,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:43:10.000Z",
            "updated_at": "2023-11-11T10:43:10.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0005",
            "item_id": "ITEM_0002",
            "total_quantity_in": 0,
            "total_quantity_out": 0,
            "balance": 0,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:43:27.000Z",
            "updated_at": "2023-11-11T10:43:27.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0008",
            "item_id": "ITEM_0002",
            "total_quantity_in": 600,
            "total_quantity_out": 425,
            "balance": 175,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:51:14.000Z",
            "updated_at": "2023-11-11T10:51:14.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0009",
            "item_id": "ITEM_0002",
            "total_quantity_in": 600,
            "total_quantity_out": 425,
            "balance": 175,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T10:55:07.000Z",
            "updated_at": "2023-11-11T10:55:07.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        },
        {
            "id": "REPORT_0010",
            "item_id": "ITEM_0002",
            "total_quantity_in": 0,
            "total_quantity_out": 0,
            "balance": 0,
            "start_date": "2023-11-11T00:00:00.000Z",
            "end_date": "2023-11-11T00:00:00.000Z",
            "creator_id": 50,
            "created_at": "2023-11-11T19:57:22.000Z",
            "updated_at": "2023-11-11T19:57:22.000Z",
            "item": {
                "id": "ITEM_0002",
                "item_name": "MSPP rodbhai",
                "created_at": "2023-11-05T09:51:37.000Z",
                "updated_at": "2023-11-06T21:31:37.000Z"
            },
            "creator": {
                "ex_id": 50,
                "ex_email": "ifaaiman17@gmail.com",
                "ex_name": "StoreKeeper"
            }
        }
    ]
}
```

## Endpoint:GET https://icsrmms.vercel.app/report/REPORT_0001

**Description:** This endpoint is used to get the report info by id(REPORT_0001) 

**Access:** admin

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Report Retrieved Successfully",
    "success": true,
    "data": {
        "id": "REPORT_0001",
        "item_id": "ITEM_0002",
        "total_quantity_in": 560,
        "total_quantity_out": 415,
        "balance": 145,
        "start_date": "2023-11-11T00:00:00.000Z",
        "end_date": "2023-11-11T00:00:00.000Z",
        "creator_id": 50,
        "created_at": "2023-11-11T10:38:09.000Z",
        "updated_at": "2023-11-11T12:13:30.000Z",
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        },
        "creator": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        }
    }
}
```


## Endpoint:PATCH https://icsrmms.vercel.app/report/REPORT_0001

**Description:** This endpoint is used to Update the report by id(REPORT_0002)

**Access:** admin and storekeeper

**Headers:** `Authorization` : [access_token]


**Request Body**
```json
{
    "item_id": "ITEM_0002",
    "start_date": "2023-11-11 15:39:19",
    "end_date": "2023-11-11 16:06:33"
}
```

**Response Body**
```json
{
    "status": 200,
    "message": "Report Updated Successfully",
    "success": true,
    "data": {
        "id": "REPORT_0001",
        "item_id": "ITEM_0002",
        "total_quantity_in": 0,
        "total_quantity_out": 0,
        "balance": 0,
        "start_date": "2023-11-11T00:00:00.000Z",
        "end_date": "2023-11-11T00:00:00.000Z",
        "creator_id": 50,
        "created_at": "2023-11-11T10:38:09.000Z",
        "updated_at": "2023-11-11T20:01:52.000Z",
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        },
        "creator": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        }
    }
}
```



## Endpoint: DELETE https://icsrmms.vercel.app/report/REPORT_0005

**Description:** This endpoint is used to Delete a report by id

**Access:** admin and storekeeper

**Headers:** `Authorization` : [access_token]


**Response Body**
```json
{
    "status": 200,
    "message": "Report Deleted Successfully",
    "success": true,
    "data": {
        "id": "REPORT_0005",
        "item_id": "ITEM_0002",
        "total_quantity_in": 0,
        "total_quantity_out": 0,
        "balance": 0,
        "start_date": "2023-11-11T00:00:00.000Z",
        "end_date": "2023-11-11T00:00:00.000Z",
        "creator_id": 50,
        "created_at": "2023-11-11T10:43:27.000Z",
        "updated_at": "2023-11-11T10:43:27.000Z",
        "creator": {
            "ex_id": 50,
            "ex_email": "ifaaiman17@gmail.com",
            "ex_name": "StoreKeeper"
        },
        "item": {
            "id": "ITEM_0002",
            "item_name": "MSPP rodbhai",
            "created_at": "2023-11-05T09:51:37.000Z",
            "updated_at": "2023-11-06T21:31:37.000Z"
        }
    }
}
```



