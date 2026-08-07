import db from '../db.js'
import fs from 'fs';
import path from 'path'

const schemaPath = path.join(import.meta.dirname, "..", "schema/task.schema.sql")
const taskschema = fs.readFileSync(schemaPath).toString();

// check if table exists, sqlite_master is the list of your tables within the database
const tableExists = db.prepare(`SELECT name FROM sqlite_master
  WHERE type='tables' AND name = ?`).get('tasks')


if (!tableExists) {
  // this method for creating a table
  db.exec(taskschema)
}

const tasks = [
  { id: 1, title: "Touch some grass"},
  { id: 2, title: "Cook some dinner"},
  { id: 3, title: "Walk a dawg"}
]

const mockTasks = db.prepare("INSERT INTO tasks(id, title) VALUES(?,?)")

for (const e of tasks) {
  mockTasks.run(e.id, e.title)
}
