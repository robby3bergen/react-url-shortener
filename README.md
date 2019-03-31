# Project Name
Url Shortener

## Description
Enter a url and use the result as a short link in your messages. Anyone who uses the short link will be redirected to the original destination.

## Production environment
- https://artificial-shortener.herokuapp.com

## User Stories

### Sprint 1
- As a user I want to enter a destination url and receive a shortened url in return
- As a user I want to be redirected to the destination url after visiting the shortened url
- As a user I want to be able to create an account
- As a user I want to be able to login to the website
- As a logged-in user I want to see a list of url’s that I have shortened while logged in
- As a logged-in user I want to be able to delete a url from the list

### Sprint 2 (bonus) Backlog

- As a logged-in user I want to see how many times my url’s have been visited
- As a logged-in user I want to be able to edit my url destinations
- As a logged-in user I want to be able to specify a second destination where a custom percentage
- of the traffic will be send to instead of the original destination


# Front end

- GitHub repo : https://github.com/robby3bergen/react-url-shortener
- Library     : React.js

## Routes

- public  : `/`
- private : `/new-url`
- public  : `/:short-url-path` => Redirect to destination
- public  : `/signup`
- public  : `/login`
- private : `/my-urls`
- private : `/my-urls/:id/delete`
- public  : `/page-not-found`
- public  : `/server-error`

## Components

- App       : navigation, description
- Shortener : form (input: 'destination url', button: 'submit'), 'short url'
- Signup    : form (input: 'username', input: 'password', button: 'submit')
- Login     : form (input: 'username', input: 'password', button: 'submit')
- Url-list  : list (listitem: 'destination url', 'short url', button: 'delete')


## Services
- Auth Service
  - auth.signup(user)
  - auth.login(user)
  - auth.sessionUser()
  - auth.logout(user)
- Shortener Service
  - create(shortUrlPath, destinationUrl, optional:secondDestinationUrl, userId)
  - find(shortUrl)
  - update(shortUrl)
  - delete(shortUrl)


# Backend

- GitHub repo : https://github.com/robby3bergen/express-url-shortener
- Framework   : Express


## Models

### User model
```
{
  username  : string, required, unique
  password  : string, required
  urlIds    : array of objects {url_id: relation_object}
}
```

### Url model
```
{
  shortUrlPath  : string, required, unique
  destination   : string, required
  visited       : int
  userId        : int, required {user_id: relation_object}
}
```


## API Endpoints (backend routes)
### Authorisation
- `GET: /auth/session-user`
  - return 404 if no user in session
  - return 200 with user object
- `POST: /auth/signup`
  - check user is not logged in
  - validation: username and password should not be empty
  - check if username already exists
  - create user
  - store user in session
  - return user
- `POST: /auth/login`
  - check user is not logged in
  - validation: username and password should not be empty
  - check if user exists
  - match password
  - store user in session
  - return user
- `POST: /auth/logout`
  - check user is logged in
  - remove user from session

### Shortener
- `POST: /url/add`
  - create a short url path and store it's destination Url
  - return short url path
- `GET: /url/:path`
  - get the destination url
- `GET: /url/list`
  - get list of url's of the user in session
- `PUT: /url/:path/:destination`
  - check if short url belongs to the user in session
  - update the destination
- `DELETE: /url/:path`
  - check if short url belongs to the user in session
  - delete a url if it belongs to the user in session
