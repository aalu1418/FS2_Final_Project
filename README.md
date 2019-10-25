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
- [x] Authentication via Firebase using custom UI
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
  - [x] create permissions in database for structure
- [ ] integrate with existing framework
  - [x] login functionality
  - [x] new user functionality
  - [ ] function for sending messages
    - [ ] unique chat identifier
  - [ ] function for getting messages
  - [ ] get user list (people who you can send messages to, and get images)
  - [ ] set user profile picture

#### Deepanshu
- [x] experiment with Bootstrap
  - [x] login page
  - [x] Register page
  - [x] Chat page layout
  - [x] css styling files and images for all pages
  - [x] profile picture and icons
  - [x] Message send bar and button with an icon
  - [x] Styling for Chatbox content
- [x] Register page
    [x] password and confirm password check
    [x] already a user link and render to login page
- [x] Login page
  - [x] provided the link if user is new
  - [x] forgot password option
- [x] Get the message and create message object for corresponding user (Chat page)
  - [x] Message to be entered as comma separated format (2 parameters: ethersToSent and receiver'saddress)
  - [x] Validations if anyone of the parameter is not null
  - [x] create msg objects
  - [x] get username/userid
  - [x] create msg objects array
  - [x] link username/userid with an array of msg objects 
  - [ ] Validation for if no/wrong msg is entered
  - [ ] Dsiplay users on left sidepanel after getting the users list from db
  - [ ] create navbar, if time persists
  - [ ] On leftpanel, open chat for particular user on clicking particular user's conversation box
  - [ ] function for getting chat users for current logged in user

---

### Tools List
- [Bootstrap](https://getbootstrap.com/) for HTML/CSS/JS framework
- [Firebase](https://firebase.google.com/) for database & webhosting
- [JQuery](https://jquery.com/) for DOM content (not really used yet)
---

### Notes Section
- [Aaron] make sure to add error handling for .then functions
- [Aaron] 404 handling?
- [Deepanshu] Make sure to arrange the chat page layout acc to browser screen.
- [Deepanshu] Make sure to remove the uncommented which is kept, as of now, for reference.
- [Aaron] setup validation in database?
