

# Quiz App Read Me

## Features

- **Interactive Quizzes**: Engage with various quizzes covering different topics. Users can select quizzes, answer questions, and receive instant feedback on their performance.

- **Create Quizzes**: Admins can create new quizzes by adding questions along with multiple-choice answers and correct options.


## Tech Stack

### Backend

- **Node.js**: A JavaScript runtime used for building the server-side of the application.

- **Express.js**: A fast, minimal, and flexible Node.js web application framework that is used for creating middleware and routing.

- **MySQL**: A relational database management system used to store quiz data.

### Frontend

- **React**: A popular JavaScript library for building user interfaces. The frontend of the app is built using React, providing a smooth and responsive user experience.

- **React Router DOM**: The application uses React Router DOM for handling client-side routing. This allows for seamless navigation between different sections of the app, including taking quizzes and viewing results, all without requiring a full page reload.

- **Tailwind CSS**: A utility-first CSS framework for quickly building custom designs. Tailwind CSS is used for styling the frontend components.

- **Radix**: A collection of design primitives and utilities for building React components. Radix helps in creating accessible and composable UI components.

## Screenshots

### Home Page
<img width="1440" alt="home" src="https://github.com/xyz-rahul/quizz-app/assets/77181531/bfd1650f-b4a0-4151-9e39-9b49705b9ed6">


### Quiz Page
<img width="1440" alt="quiz" src="https://github.com/xyz-rahul/quizz-app/assets/77181531/201cf4d6-2490-4cb4-8c2c-c7376454b890">



## Setup

Follow these steps to set up the Quiz App on your local machine:

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

- For the backend (Node.js and Express), navigate to the `backend` directory and run:

```
cd backend
npm install
```

3. Set up your MySQL database:

- Create a MySQL database and configure the connection details in the `backend/.env` file.

4. Import sample data (optional):

- If provided, import sample quiz data into your MySQL database.

5. Start the server:

- In the `backend` directory, run:

```
npm --env-file=.env start
```

6. Start the React frontend:

- In the `frontend` directory, run:

```
cd ../frontend
npm install
npm start
```

7. Open your web browser and go to `http://localhost:5173` to access the Quiz App.

---

Feel free to adjust the content as needed for your specific Quiz App project!
