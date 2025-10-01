# Advanced Gmail
## Overview
My Gmail is a gmail application created by Matan Badichi, Yakir Sharabi, and Roi Meiri, the three founders of the platform. It allows users to register, log in, and engage in conversations with others using mails. Whether you want to have a chat with friends or an institution, My Gmail is the perfect place for you!

---
## Features

- **User Registration**: Create an account by providing your username, and password.  
  **Note**: Each username is unique, ensuring a distinct identity for every user so if you enter with an exsiting username the application will login to the existing user.

- **User Authentication**: Log in to the application using your registered credentials.

- **Mailbox Management**:
  - **Inbox**: View all incoming emails.  
  - **Sent**: Check the emails you’ve sent.  
  - **Drafts**: Save the mails that you consider as drafts.  
  - **Spam**: Manage emails identified as unwanted or harmful.  
  - **Trash**: Access and manage deleted emails.

- **Modern Design**: Enjoy a clean, user-friendly interface built with Android best practices.

---

 ## Database

Advanced Gmail uses **MongoDB** as its database to store user and email information. MongoDB is a popular NoSQL database known for its scalability and flexibility in managing large amounts of data.

### Using MongoDB

To use MongoDB with Advanced Gmail, follow these steps:

1. **Install MongoDB**:
   - Visit the [MongoDB website](https://www.mongodb.com/try/download/community) and download the latest version of MongoDB suitable for your operating system.
   - Follow the installation instructions provided by MongoDB to set up and configure the database on your system.

2. **Start MongoDB**:
   - Once installed, start MongoDB by running the appropriate command for your operating system:
     ```bashs
     docker run -d --name mongo -p 27017:27017 mongo:6
     ```

3. **Connect to MongoDB**:
   - Advanced Gmail will automatically connect to the running MongoDB instance and use it to store and retrieve data.

---

## Requirements

Before running Advanced Gmail, ensure that you have the following requirements fulfilled:

1. **Node.js**:  
   Make sure you have Node.js installed on your system. You can download and install it from the official website: [Node.js](https://nodejs.org).

2. **MongoDB**:  
   Install MongoDB to set up the database for Advanced Gmail. Follow the steps mentioned in the "Using MongoDB" section above to install and configure MongoDB.
---
You are now all set to run Advanced Gmail and start managing your emails with the help of MongoDB! Enjoy the seamless email experience.

## 🚀 Running the server

Clone the project repository to your local machine.
Open the terminal or command prompt and navigate to the server's directory.
Follow the steps below to run the application:

1. **Start MongoDB**: (if you didnt already) 
   To run MongoDB, use the following Docker command:
   ```bash
   docker run -d --name mongo -p 27017:27017 mongo:6

2. If MongoDB is already running:
If you have already run the above command previously, you can start MongoDB with:
```bash
docker start mongo
```

3. Install required dependencies:  dotenv, mongoose, express
```bash
npm install dotenv
npm install mongoose
npm install express
```

4. Start the server:
Note: Ensure you're in the initial directory advanced_system_programing/App/src/node.
if you are in directory advanced_system_programing/App, use:
```bash
cd src/node
```
After that run the server with the following command:
```bash
node server.js
```


## Running the client
## Login for emulator
 
- Enter your **email** and **password**.
- If you don’t have an account yet, click **Create account** to register first.
- Click **Next** to continue and sign in.
- **Becuse you are running on the emulator dont press the running on phone button**
- **Dark Mode Support**: Users can switch the login screen to Dark Mode for a more comfortable viewing experience in low-light environments.

![Login Screenshot](https://github.com/RoyMeiri/Advanced_Gmail/raw/yakir_branch/screenshots/sign_in.png)


## Login for phone
- **Becuse you are running on your phone you need to press the running on phone button first, even if you are going to create a new accont you need to press on the running on phone button** (it looks like nothing happend but believe us a lot have changed in the universe ;) )
- Enter your **email** and **password**.
- If you don’t have an account yet, click **Create account** to register first.
- Click **Next** to continue and sign in.
- **Dark Mode Support**: Users can switch the login screen to Dark Mode for a more comfortable viewing experience in low-light environments.


## Create Account

From the login screen, click **Create account** and complete the registration form:

![Create account](https://github.com/RoyMeiri/Advanced_Gmail/raw/yakir_branch/screenshots/Create_Account.png)


- **Username** — choose a unique username.  
  The system will automatically generate your email address from it and display it beneath the field  
  (e.g., `user205` → `user205@mail.com`).
- **Full name**
- **Date of birth** (dd/mm/yyyy)
- **Password** and **Confirm password**
- **Gender**
- **Avatar** — pick one of the available avatars.

Click **Create account** to finish. Your new credentials can then be used to sign in.

** Username suggestion**

If the chosen **username** is already taken, the app proposes an available alternative (e.g., `user2051`).  
Click **Use suggested** to apply it — the derived email address updates accordingly.



## Inbox  (Home)
 
![Mailbox home](https://github.com/RoyMeiri/Advanced_Gmail/raw/yakir_branch/screenshots/Mailbox.png)

After signing in, you land on your personal Inbox .

- The **sidebar** at the top-left corner provides quick access to Inbox, Starred, Snoozed, Important, Sent, Drafts, Spam, and custom **Labels**.
- Use the **search bar** at the top-right corner to find messages.
- At the bottom of the screen, there's a **Compose** button that allows users to create and send new messages.
- The Inbox is organized as a **linear list of received emails**, with each email having three action buttons: **Spam**, **Draft**, and **Delete**.
- By clicking on any email, you can read its content.

## Sidebar Navigation

The application provides a **sidebar** for easy navigation. It includes the following buttons:

![Sidebar Navigation](https://github.com/RoyMeiri/Advanced_Gmail/raw/yakir_branch/screenshots/sidebar.png)


- **Inbox**: View all received emails in your inbox.
- **Send**: Access the sent emails.
- **Drafts**: View and manage emails you've saved as drafts.
- **Spam**: Manage emails marked as spam.
- **Trash**: View and manage deleted emails.
- **Logout**: Log out of the application.

These buttons provide quick access to different sections of the email system, making it easy to manage your emails and navigate through the app.

## Reading a Message 

 ![ReadMail](https://github.com/RoyMeiri/Advanced_Gmail/raw/yakir_branch/screenshots/ReadingMessge.png)


## Compose a Message
 
![Compose new message](https://github.com/RoyMeiri/Advanced_Gmail/raw/yakir_branch/screenshots/Compose.png)
- Click **Compose** to open the new-message panel.
- In the **To** field, type username of users in the system.
- Enter your message and click **Send**.
- A confirmation appears once the email is sent successfully.


## 👤 Authors

* Roy Meiri (Scrum Master)
* Matan Badichi
* Yakir Sharabi



