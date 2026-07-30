import express from 'express';

const task = [
  { id: 1, title: "Walk Dawg", done: true },
  { id: 2, title: "Cook Meal", done: true },
  { id: 3, title: "Study", done: true }
]

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ name: "Task API", version: "1.0", enpoints: ["/tasks"] })
  return;
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" })
  return;
})

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params

  const foundId = task.filter((elem) => {
    return elem.id === parseInt(id);
  })

  if (foundId.length === 0) {
    res.status(404).json(`Error Task ${id} not found`);
    return;
  }

  res.status(200).json({ task : foundId[0] });
  return

})

app.post('/tasks', (req, res) => {
  const { title } = req.body;

  try {
    if (!title || !title.trim()) {
      res.status(400).json({ error: "Bad Request : Please define a title" });
      return;
    }

    let newObj = {
      id: task.length - 1,
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
})

app.get('/tasks', (req, res) => {
  res.status(200).json({ tasks: task });
  return;
})

app.listen(3000, () => {
  console.log("Hello World, Server is at 3000")
})
