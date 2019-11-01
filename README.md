# Fullstack II Final Project
Deployed Website: https://gb-fullstackii-project.web.app/  
Github Repo: https://github.com/aalu1418/FS2_Final_Project

### Developer Information
- Deepanshu Gupta
- Aaron Lu - 101278524
---

### Project Description & Specifications
A simple chat application that incorporates the Firebase Realtime Database for messaging & user conversations and Metamask for sending ether in the chat. Additionally, the application uses Firebase storage, authentication, and hosting for purposes from user management to profile image storage.

Must contain the following Client-side functionality:
- Entry page with intuitive navigation
  - Entry page is the login page with options for forgotten passwords and registering a new user
  - Simple chat navigation screen similar to common chat platforms
- Authentication - can be Firebase, basic, simulated, external, etc.
  - Use of firebase to manage the user registration and authentication process
  - Forgotten passwords & password reset are handled via an email from Firebase.
- User profile page
  - User profile page is accessed by click on the users name or picture.
  - Allows access to reset password, upload a profile picture, and attach a public key using Metamask
- Main App page with access that is different for authenticated users from nonauthenticated users
  - Authenticated users will see all available chats and messages in chat.html, and are automatically redireceted to chat.html from the login or registration page.
  - Nonauthenticated users will be automatically redirected to login.html. The framework of chat.html is visible for a moment but they have no access to the database.

About page with:
- Team info including mini-bio with pic for each team member
  - Short bios and links to github pages, etc are included
- Contact info placeholder
  - Email links are included in an icon using ```mailto:<example>@gmail.com```

Must contain the following Server-side functionality:
- Serving of content based on user requests
  - User request include the different chats, viewing their own profiles, receiving messages
  - Controlled via read permissions for the Firebase database & storage
- Handling of user submitted data
  - User submitted data includes sending messages, and uploading profile pictures
  - Controlled via write permissions for the database & storage
- Error handling
  - Various forms of error handling are included for the various listeners, function calls, etc
---

### Testing Information
- Basic Instructions:
  1. Visit the deployed [website](https://gb-fullstackii-project.web.app/) and either login or register.
  2. Once logged in, the user can send messages to other registered users or send ether (if Metamask is present) using the two buttons in the bottom right corner.
  3. Click on the arrow next to the user's name to bring up the user profile. Here you can upload a profile image and connect your profile with Metamask. (A user must have their profile connected to Metamask to receive ether)
  4. There is an About and Logout button in the bottom right.
- Sending Message:
  1. Message is typed in the appropriate box and either the \<enter\> key or send button press will send it
  2. Realtime display of message will appear without refresh
  3. The sidebar with conversations automatically updates as well
  4. Conversations with the latest messages will move to the top of the list.
- Sending Ether:
  1. Select the button with a money icon in correct conversation
  2. Enter the amount and press send.
  3. Metamask will automatically start and guide a user through the process.
  4. The recipient must have their public key stored in the application by either registering (via profile page) or previously sending ether.
- Authenticated vs. Nonauthenticated
  - Authenticated:
    1. After authentication on the login or register page, user is automatically redirected to the chat page.
    2. If the user goes back to the login or register page, an automatic redirect will occur.
  - Nonauthenticated:
    1. If user visits chat page, an automatic redirect to the login page will occur.
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
