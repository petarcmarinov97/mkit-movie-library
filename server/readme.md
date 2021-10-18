# REST-api for Angular course in SoftUni

## Getting started
Let's make our first API request to the REST-api!

In the example below, we're trying to get information about the REST-api:

```https://localhost:3000/api/test```

Here is the response we get:

```
{
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of React",
    "main": "index.js",
}
```

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://localhost:5000/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints: Users

* ```/register``` -- signing up;
* ```/login``` -- signing in;
* ```/logout``` -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL --> ```/register```

### Method --> ```POST```

### Body -->

```
{
    "email":"john@email.com",
    "username":"Johny",
    "password":"12345",
    "rePassword":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required and must be unique;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z",
    "movies":[{},{},{}, ....],
    "moviePosts":[{},{},{}, ....]
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This email/username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> ```/login```

### Method --> ```POST```

### Body -->

```
{
    "username":"Johny",
    "password":"12345"
}
```

Required:

```username``` : [string] -- The username of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z",
    "movies":[{},{},{}, ....],
    "moviePosts":[{},{},{}, ....]
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> ```/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

# Endpoints: movies

Here stays the user's favorites movies

* ```/movies/favorites/:id```
* ```/movies/favorites/add```
* ```/movies/favorites/remove```

## Get Themes
Returns all favorites movies

### URL --> ```/movies/favorites/:id```

as for id we are passing the userId which we can get from the localstorage at the front-end

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
[
    {
        "movieId":"10707",
	"title":"The Squid and the Whale",
	"imgUrl":"/9NbXn1NMdfGM491V3EFjZADR9SX.jpg",
	"year":"2005-10-05",
	"updatedAt":"2021-10-17T17:25:16.040+00:00",
	"created_at":"2021-10-17T17:25:16.040+00:00"
    }
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Post favorite movie
Add new favorite movie to the favorites.

### URL --> ```/movies/favorites/add```

### Method --> ```POST```

### Body -->

```

Example:

{
    {
            "movieId":"2050,
            "title": "Dragon Fury II",
            "imgUrl": "/6WcJ4cV2Y3gnTYp5zHu968TYmTJ.jpg",
            "year": "2021-06-15",
            "userId":"1254325345d13e"
        }
}
```

### Success Response:

Code: 200

Content: 
``` 
[
    {
        "movieId":"10707",
	"title":"The Squid and the Whale",
	"imgUrl":"/9NbXn1NMdfGM491V3EFjZADR9SX.jpg",
	"year":"2005-10-05",
	"updatedAt":"2021-10-17T17:25:16.040+00:00",
	"created_at":"2021-10-17T17:25:16.040+00:00"
    },
    {"movieId":"2050,
            "title": "Dragon Fury II",
            "imgUrl": "/6WcJ4cV2Y3gnTYp5zHu968TYmTJ.jpg",
            "year": "2021-06-15",
            "userId":"1254325345d13e",
	    "updatedAt":"2021-10-17T17:25:16.040+00:00",
	    "created_at":"2021-10-17T17:25:16.040+00:00"
    },
	......
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Remove Favorite Movie
Removing Favorite movie from the Favorites

### URL --> ```/movies/favorites/remove```

### Method --> ```POST```

### Body -->
{
"movieId":"2050,
"title": "Dragon Fury II",
"imgUrl": "/6WcJ4cV2Y3gnTYp5zHu968TYmTJ.jpg",
"year": "2021-06-15",
"userId":"1254325345d13e"
}

```

### Success Response:

Code: 200

Content: 
``` 
Returning all the movies after the post request is done
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```
<!-- users
.post /register - register new user
.post /login - login user
.post /logout - logout user

movies
.get /movies/favorites/:id - lists all favorites movies 
.post /movies/favorites/add- adding the new favorite movie into current favorites movies 
.post /movies/favorites/remove - removing the movie from the current favorites movies 


<!-- http://localhost:3000/api/register
<!-- http://localhost:3000/api/login
<!-- http://localhost:3000/api/logout
<!-- http://localhost:3000/api/movies/favorites/:id ---> here the :id is equal to the userId
<!-- http://localhost:3000/api/movies/favorites/add
<!-- http://localhost:3000/api/movies/favorites/remove
