# Hola Spain

## Description

This is a website which will help to apply for the Spanish visa easily and help connect with people from your country who are already in Spain.



## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anon I can sign up in the platform so that I can start playing into competition
- **Login:** As a user I can login to the platform so that I can play competitions 
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Add Contacts:** As a user I can add a contact if they are accepted
- **Edit User profiles:** As a user I can edit my user profile.
- **Remove Contacts:** As a user I can remove the contact.
- **Filling application:** As a user I can fill the visa application form.
- **Request:** As a user I can accept or reject the request to add the contact
- **View Profiles:** As a user I can view the profile of the contact if it is added to my contacts list.
- **View Application:** As an admin I can view all the applications of the user.
- **Set the application Status:** As an admin I can set the status of the application of the user.

## Backlog

User profile:

- See the notices added by the admin
- Live chat
- For other types of visa

Admin profile:

- Add the notices that will be visible for the user



# Client / Frontend

## React Router Routes (React App)

| Path                          | Component             | Permissions                      | Behavior                                                     |
| ----------------------------- | --------------------- | -------------------------------- | ------------------------------------------------------------ |
| `/`                           | SplashPage            | Public `<Route>`                 | Home                                                         |
| `/signup`                     | SignupPage            | Anon only `<AnonRoute>`          | Signup form, link to login, navigate to homepage after signup |
| `/login`                      | LoginPage             | Anon only `<AnonRoute>`          | Login form, link to signup, navigate to homepage after login |
| `/home`                       | HomePage              | User only `<PrivateRoute>`       | Shows the home page after logged in                          |
| `/application`                | ApplicationPage       | User only `<PrivateRoute>`       | Shows the application page to upload your forms and files    |
| `/contacts`                   | ContactPage           | User only `<PrivateRoute>`       | Shows the list of contacts                                   |
| `/contacts/:id`               | UserProfilePage       | User only `<PrivateRoute>`       | Shows the profile of your contacts                           |
| `/profile`                    | MyProfilePage         | User only `<PrivateRoute>`       | Shows your profile page                                      |
| `/status`                     | ApplicationStatusPage | User only `<PrivateRoute>`       | Shows the status of your profile                             |
| `/admin`                      | AdminHomePage         | Admin only `<PrivateRoute>`      | Shows the admins home page                                   |
| `/admin/applications`         | ApplicationsPage      | Admin only `<PrivateRoute>`      | Shows the list of application                                |
| `/admin/applications/:userid` | UserApplicationPage   | Admin only `<PrivateRoute>`      | Shows the application of the specific user and setting the status of the user |
| `/logout`                     | n/a                   | Users and admin `<PrivateRoute>` | Navigate to homepage after logout, expire session            |
| `/contacts/add/:id`           | ContactPage           | User only `<PrivateRoute>`       | Add the user contact                                         |
| `/contacts/remove/:id`        | UserProfilePage       | User only `<PrivateRoute>`       | Remove the contact from the user's contact list              |
| `/notice`                     | Notice                | User only `<PrivateRoute>`       | Shows the notices added by the admin                         |



## Components

- LoginPage
- SignupPage
- HomePage
- SplashPage
- ApplicationPage
- ContactPage
- UserApplicationPage
- UserProfilePage
- MyProfilePage
- ApplicationStatusPage
- AdminHomePage
- ApplicationsPage



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser()
- User service
  - user.list()
  - user.detail(id)
- Contact service
  - contact.add(id)
  - contact.remove(id)



# Server/ Backend

## Models

User Model

```javascript
{
  Name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  IsAdmin: {type: Boolean, required: true},
  Number: {type: Number},
  City: {type: String},
  StatusOfApplication:{type: String, enum:["Application Accepted and send the passport","Resubmit my application Please"]
  },
  Friends: [{type: Schema.Types.ObjectId,ref:'User'}],
  Requests: [{type: Schema.Types.ObjectId,ref:'User'}],
  Notices: [{type: Schema.Types.ObjectId, ref: 'Notice'}]
}
```

Notice Model

```javascript
{
  adminId: {type: Schema.Types.ObjectId,ref:'User'},
  title: {type: String, required: true},
  content: {type: String, required: true}
}
```



## API Endpoints (backend routes)

| HTTP Method | URL                       | Request Body                      | Success status | Error Status | Description                                                  |
| ----------- | ------------------------- | --------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`                | Saved session                     | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`            | {name, email, password}           | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`             | {username, password}              | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`            | (empty)                           | 204            | 400          | Logs out the user                                            |
| GET         | `/user`                   |                                   |                | 400          | Show all contacts                                            |
| GET         | `/user/:id`               | {id}                              |                |              | Show specific contact                                        |                    |
| GET         | `/admin`                  |                                   |                | 400          | Shows the homepage of an admin                               |                                            |
| GET         | `/notice`                 |                                   |                | 400          | Shows the notice to the user                                 |
| DELETE      | `/notice/delete/:id`      | {id}                              | 200            | 400          | Delete the notice                                            |
| GET         | `/admin/applications`     |                                   |                | 400          | Gets the application of the user                             |
| GET         | `/admin/applications/:id` | {id}                              |                | 400          | Shows the applicationn by id                                 |
| GET         | `/contacts/add/:id`       | {id}                              |                | 400          | Sends the request to the user                                |
| GET         | `/contacts/remove/:id`    | {id}                              |                | 400          | Remove the user from the contact list                        |



## Links

### Trello/Kanban

[Link to my trello board](https://trello.com/b/sXN8VoJi/hola-spain)



### Git

URLs for the project repo and deploy



### Slides

URLs for the project presentation (slides)
