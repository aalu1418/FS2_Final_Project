# Fullstack II Final Project
Deployed Website: https://gb-fullstackii-project.web.app/  
Github Repo: https://github.com/aalu1418/FS2_Final_Project

### Developer Information
- Deepanshu Gupta
- Aaron Lu - 101278524
---

### Project Specifications & Description
This Fullstack II project is a simple chat where a registered user is able to message any current user in real-time.

Must contain the following Client-side functionality:
- Entry page with intuitive navigation
  - Simple chat navigation screen similar to common chat platforms
- Authentication - can be Firebase, basic, simulated, external, etc.
  - Use of firebase to manage the user registration and authentication process
- User profile page
  - User profile page is accessed by click on the users name or picture.
  - Allows access to reset password, upload a profile picture, and attach a public key using Metamask
- Main App page with access that is different for authenticated users from nonauthenticated users
  - Authenticated users will see all available chats and messages in chat.html
  - Nonauthenticated users will be automatically redirected to login.html. The framework of chat.html is visible for a moment but they have no access to the database.

About page with:
- Team info including mini-bio with pic for each team member
- Contact info placeholder
Must contain the following Server-side functionality:
- Serving of content based on user requests
  - User request include the different chats, viewing their own profiles, receiving messages
- Handling of user submitted data
  - User submitted data includes sending messages, and uploading profile pictures
- Error handling
  - Various forms of error handling are included for the various listeners, function calls, etc
---

### Ideas List: Ether transfer via chat app
- [x] Realtime database for storing messages & transactions
- [x] Authentication via Firebase using custom UI
- [x] HTML Layout
  - [x] Chat page (includes list of all chats, all possible conversations, conversation profile)
  - [x] Personal profile page
  - [x] About page
- [x] Chat Functionality
- [ ] Ether transfer
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
- [x] integrate with existing framework
  - [x] login functionality
  - [x] new user functionality
  - [x] function for sending messages
    - [x] unique chat identifier
  - [x] function for getting messages
  - [x] get user list (people who you can send messages to, and get images)
  - [x] set user profile picture & profile page
- [x] metamask integration
  - [x] get and save users public key
  - [x] use metamask to send ether to a public address
- [x] fix redirecting
  - [x] login page as default
  - [x] password reset
  - [x] 404 page handling
  - [x] auto-redirect depending on auth status
  - [x] ico image

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
