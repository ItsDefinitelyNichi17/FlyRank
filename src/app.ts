import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

let task = [
  { id: 1, title: "Walk Dawg", done: true },
  { id: 2, title: "Cook Meal", done: true },
  { id: 3, title: "Study", done: true }
]

const app = express();

const openapiSpec = JSON.parse(
  fs.readFileSync(new URL('./openapi.json', import.meta.url), 'utf-8')
);

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.get('/', (req, res) => {
  res.status(200).json({ name: "Task API", version: "1.0", enpoints: ["/tasks"] })
  return;
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" })
  return;
});

//TASKS
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params

  const foundId = task.filter((elem) => {
    return elem.id === parseInt(id);
  })

  if (foundId.length === 0) {
    res.status(404).json(`Error Task ${id} not found`);
    return;
  }

  res.status(200).json({ task: foundId[0] });
  return

});

app.get('/tasks', (req, res) => {
  res.status(200).json({ tasks: task });
  return;
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;

  try {
    if (!title || !title.trim()) {
      res.status(400).json({ error: "Bad Request : Please define a title" });
      return;
    }

    let newObj = {
      id: task.length + 1,
      title: title,
      done: false
    }

    task.push(newObj);
    res.status(201).json({ newtask: newObj })

  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Internal Server Error" })
  }
  return;
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  let findId = task.findIndex((e) => {
    return (e.id === parseInt(id))
  });

  if (title) {
    if (!title.trim()) {
      res.status(400).json({ message: "Bad Request: Invalid Body" })
      return;
    }
  }

  if (findId === -1) {
    res.status(404).json({ message: "Not found" })
    return;
  }
  task[findId] = {
    id: parseInt(id),
    title: title ?? task[findId]!.title,
    done: done ?? task[findId]!.done
  };

  res.status(200).json({ updatedTask : task[findId] });
})

app.delete('/tasks/:id', (req, res) => {

  const { id } = req.params;

  const indexToRemove = task.findIndex((e) => e.id === parseInt(id));

  if (indexToRemove === -1) {
    res.status(404).json({ message: "Not found" })
    return;
  }
  const removedItem = task.splice(indexToRemove, 1);
  res.status(204).send();
  return;
})

app.listen(3000, () => {
  console.log("Hello World, Server is at 3000")
})
