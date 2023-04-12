# Project Title

## Task manager app

## Description

This is a REST API application that allows users to manage tasks. Users can add tasks, change the name of existing tasks, delete tasks, and get a list of all tasks. Users can also update the completion status of their tasks. This API is built using Node.js and Express.js, and uses MongoDB as the database to store task information.

## Used Technologies

In this build I used Node.js, Express.js, Mongodb, Mongoose, Typecript, Nodemon, Morgan, Dotenv, Axios.

## How to install

Download and run npm install.

Then First you need to create .env file in root directory. Create there Variable
MONGO_URI= Here you need to write your MongoDb cluster connect key
exapmle:

```bash
MONGO_URI=mongodb+srv://giorgi:yourClusterPassword@yourClusterName.zi9vxpj.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```

## API Reference

#### Get all tasks

```http
  GET /api/v1/tasks
```

#### Get(search) concrete task

```http
  GET /api/v1/tasks/{id}
```

you need to provide the id of the task that you want to Get(search)

#### Create task

```http
  POST /api/v1/tasks
```

| Parameter   | Type      | Description                                 |
| :---------- | :-------- | :------------------------------------------ |
| `name`      | `string`  | **Required**. Your task name                |
| `completed` | `boolean` | **Optional**. Your task is completed or not |

#### Change task name

```http
  PATCH /api/v1/tasks/{id}
```

| Parameter   | Type      | Description                                 |
| :---------- | :-------- | :------------------------------------------ |
| `name`      | `string`  | **Required**. Write new name of your task   |
| `completed` | `boolean` | **Required**. Write new status of your task |

#### Delete task

```http
  DELETE /api/v1/tasks/{id}
```

you need to provide the id of the task that you want to Delete
