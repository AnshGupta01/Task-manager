# Task Management Application
A simple Task Management application with Node.js, Express.js, and MongoDB for data persistence.

### Prerequisites
- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
   `git clone https://github.com/AnshGupta01/Task-manager.git`
2. Navigate to the directory
    `cd "folder_name"`
3. Install the dependencies
    `npm install`
4. Create a .env file in the project root with your MongoDB connection string:
    `MONGODB_URI=mongodb://localhost:27017/todoapp`

### Usage
Simply run with `npm start`
The application will be accessible at `http://localhost:3000`.

### API Usage
The API has the following endpoints:

1. `GET /tasks`: Get all tasks.
2. `GET /tasks/category/:category`: Get all tasks with defined category.
3. `POST /tasks`: Create a new task.
4. `PUT /tasks/:id`: Update a task.
5. `PUT /tasks/:id/complete`: Mark a task as completed.
6. `DELETE /tasks/:id`: Delete a task.


### Code Structure & Key Decisions

1. **Dependencies:**
   - The project uses the following dependencies:
     - `express`: A popular web framework for Node.js.
     - `mongoose`: An ODM (Object-Document Mapper) for MongoDB, simplifying interaction with the database.
     - `body-parser`: Middleware for parsing JSON requests.
     - `dotenv`: To process the env file

2. **Environment Variables:**
   - The MongoDB connection string is stored in a `.env` file, and the application uses the `dotenv` package to load environment variables.

3. **Database Model:**
   - A simple `Task` model is defined using Mongoose, representing tasks in the MongoDB collection. It includes fields for `title`, `description`,`completed` and `dueDate`.

4. **EndPoints:**
     - `GET /tasks`: Retrieve all tasks.
     - `GET /tasks/category/:category`: Get all tasks with defined category.
     - `POST /tasks`: Create a new task.
     - `PUT /tasks/:id`: Update a task.
     - `PUT /tasks/:id/complete`: Mark a task as completed.
     - `DELETE /tasks/:id`: Delete a task.

5. **Error Handling:**
   - The code includes error handling for database operations and provides meaningful error messages in case of failures.

6. **Validation:**
   - Basic validation is implemented to ensure that task titles are not empty.
   - Users cannot mark a task as complete if it's already marked as such.

7. **README:**
   - The `README.md` file provides clear instructions on how to set up and use the application. 


### Postman Screenshot
![Screenshot 7 00 16 PM](https://github.com/AnshGupta01/Task-manager/assets/26479077/5149bbdf-1813-4b9d-8e89-ab0b80451b8f)
