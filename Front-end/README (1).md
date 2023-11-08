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
            "updated_at": "2023-11-05T10:55:47.000Z"
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



