# Task Management Application

A task management application built with React for the frontend and Node.js with Express for the backend, using PostgreSQL as the database. The project is organized with separate directories for the server and frontend code.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
  
## Installation

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/yared67/task_manager.git
   ```
2. Install backend dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm start
   ```
   ### Frontend Setup
1. Navigate to the frontend directory:
```
cd ../frontend
```
2. Install frontend dependencies:
```
 npm install
```
3. Start the frontend development server
   ```
   npm start
   ```
## Usage
Here's an example of how to use the task management application:

### adding a new task
1. Open the deployed application in your browser at https://task-manager-taupe-seven.vercel.app
2. Click on the "ADD NEW" button to open the new task form.
3. Fill in the task details and click "Add Task".
### Editing a Task
1. In the task list, click on "EDIT" button the task you want to edit.
2. Update the task details and click "submit".
###  SIGN OUT
Click on the "SIGN OUT" button to leave the dashboard.

## Features
-Add new tasks with details.
- Edit existing tasks.
- View a list of all tasks.
## Deployment
### Deploying to Render

1. Log in to your Render account and create a new Web Service for your backend:
   -Connect your repository.
   -Set the build and start command

 ```
   Build Command: npm install
   Start Command: npm start
  ```
   - Set environment variables in the Render dashboard.
2. Deploy your frontend to Vercel:

    -Log in to your Vercel account and create a new project.
    -Select your repository and configure the project settings.
    -set the build and output settings
     ```
     Build Command: npm run build
     Output Directory: build
     ```
3. Ensure that your frontend is configured to make API requests to your Render backend URL.
  ## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
```
git checkout -b feature
```
3. commit your changes:
```
git commit -m 'Add your feature'
```
4. push to branch:
```
git push origin feature
``
 ## License
This project is licensed under the MIT License - see the LICENSE file for details.

## contact 
Yared Abebe - yareda292gmail.com
Project Link: https://github.com/yared67/task-manager
 




   

