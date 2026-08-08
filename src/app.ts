import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import { deleteTask, getTask, getTaskWithID, postTask, updateTask} from './controllers/task.controller.js';

let task = [
  { id: 1, title: "Walk Dawg", done: true },
  { id: 2, title: "Cook Meal", done: false },
  { id: 3, title: "Study", done: true }
]

const app = express();

const openapiSpec = JSON.parse(
  fs.readFileSync(new URL('./openapi.json', import.meta.url), 'utf-8')
);

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.get('/', (req, res) => {
  res.status(200).json({ name: "Task API", version: "1.0", enpoints: ["/tasks", "/stats", "/health", "/tasks/:id"] })
  return;
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" })
  return;
});

app.get('/tasks/:id', getTaskWithID);

app.get('/tasks', getTask);

app.post('/tasks', postTask);

app.put('/tasks/:id', updateTask);

app.delete('/tasks/:id', deleteTask);

app.get('/stats', (req, res) => {
  const totalTasks = task.length;
  const doneTasks = task.filter((e) => e.done).length;
  const openTasks = totalTasks - doneTasks;
  res.status(200).json({ total: totalTasks, done: doneTasks, open: openTasks });
});

app.listen(3000, () => {  console.log("Hello World, Server is at 3000");});
