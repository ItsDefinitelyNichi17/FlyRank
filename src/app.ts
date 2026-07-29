import express from 'express';
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ name: "Task API", version: "1.0", enpoints: ["/tasks"] })
});

app.get('/health', (req, res) => {
  res.json({ status: "ok" })
})

app.listen(3000, () => {
  console.log("Hello World, Server is at 3000")
})
