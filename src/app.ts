import express from 'express';

const task = [
  { id: 0, title: "Fly", done: true },
  { id: 1, title: "Rank", done: true },
  { id: 2, title: "AI", done: true }
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

app.listen(3000, () => {
  console.log("Hello World, Server is at 3000")
})
