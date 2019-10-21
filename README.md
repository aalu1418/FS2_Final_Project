# Fullstack II Final Project

### Project Specifications
Must contain the following Client-side functionality:
- Entry page with intuitive navigation
- Authentication - can be Firebase, basic, simulated, external, etc.
- User profile page
- Main App page with access that is different for authenticated users from nonauthenticated users

About page with:
- Team info including mini-bio with pic for each team member
- Contact info placeholder
Must contain the following Server-side functionality:
- Serving of content based on user requests
- Handling of user submitted data
- Error handling
---

### Project Overview
---

### Developer Information
##### Deepanshu Gupta  
##### Aaron Lu
---

### Ideas List: Ether transfer via chat app
- [ ] Realtime database for storing messages & transactions
- [ ] Authentication via Firebase using prebuilt UI
- [ ] HTML Layout
  - [ ] Chat page (includes list of all chats, current conversation, conversation profile)
  - [ ] Personal profile page
  - [ ] About page
- [ ] Chat Functionality
- [ ] Ether transfer
- [ ] Authentication via Firebase using custom UI
- [ ] Transfer media functionality
---

### Task List
#### Aaron
- [x] experiment with Firebase
  - [x] write to database
  - [x] read from database
  - [x] store image in bucket
  - [x] get image in bucket - can access URL & display, not sure if need to download from storage
  - [x] setup authentication
    - [x] create login system to generate user
    - [x] access user data from a different page
    - [x] logout functionality
  - [x] secure database & retain functionality
    - [x] all authenticated users can pull everything from database
    - [x] all authenticated users can view everything from storage
    - [x] authenticated user can see info about everyone, but only specific data
    - [x] authenticated user can only see specific objects in storage
- [x] determine data (storage & database) storage structure
  - store in "sessions" (identified by users)
- [ ] integrate with existing framework
  - [ ] login functionality
  - [ ] new user functionality
  - [ ] function for sending messages
  - [ ] function for getting messages

#### Deepanshu
- [ ] experiment with Bootstrap
---

### Tools List
- [Bootstrap](https://getbootstrap.com/) for HTML/CSS/JS framework
- [Firebase](https://firebase.google.com/) for database & webhosting
- [JQuery](https://jquery.com/) for DOM content
---

### Notes Section
- [Aaron] make sure to add error handling for .then functions
- [Aaron] 404 handling?
