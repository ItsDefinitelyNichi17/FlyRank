# CRUD EXPRESS
A to-do list that manage data usng SQLite. It involves the creation, deletion, filtering, update and getting the task status/statistics. Check endpoint `/docs` to read all the request of this API using `swagger-ui-express`.

## Note to the Evaluator
I compile all of my tasks in this repository, you can check each history through its designated branches named after
the task week, act number, and my current course : `W1A1BE`.

## How to run
* install dependencies using : `npm install`
* run using : `npm run dev`
* to insert mock data on table : `npm run seed`

## Table of all Enpoints

| Method | Endpoint  | Description                                                                                                         |
|--------|-----------|---------------------------------------------------------------------------------------------------------------------|
| GET    | /         | Details about the API                                                                                               |
| GET    | /health   | Is the API successfully running?                                                                                    |
| GET    | /task/:id | Find task via ID                                                                                                    |
| GET    | /task     | get all the task, you can also retrieve <br>an object filtered out by `search` query                             |
| POST   | /task     | Create a task, given a .json of `{title, done}`<br>Auto incremented ID based of the total length <br>of the dataset |
| PUT    | /task/:id | Update a record given the parameter id. <br>pass a .json with `title` and/or `done` status.                         |
| DELETE | /task/:id | Delete a task given the id parameter                                                                                |
| GET    | /stats    | Returns the status of the to-do list, `{total, done, open}`                                                         |

## TRY IT!
* Using curl : `curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'`

## Swagger UI
End point `/docs` <br>
![Image](src/assets/swagger-screenshot.png)

## SQLite
### Why SQLite
SQLite is used for this project because of its persistency. Single file, zero setup, and survive server restarts.

### Test it
To test the database using SQLite, you can run these command on your respective engine viewer.
* `SELECT * FROM tasks;` : This displays the table consist of all tasks
* `DROP TABLE tasks;` : This drops the table named tasks, you can create a table using `npm run seed` which also creates mock data. You can also check the [schema.sql](src/schema/task.schema.sql) to create a table
* `DELETE FROM tasks;`: Delete all record inside the table
<br>
<br>
if you are running this on sqlite3, you can connect to the task.db by running this inside the project:
<br>

```
sqlite3 task.db
.open task.db`
```

<br>
Then run the commands above to try the database!
### Sample
Sample Table from with the use of sqlite3 CLI 
<br>

`SELECT * FROM this tasks;` 

<br>
    
![sampledb](src/assets/sampledb.png)
