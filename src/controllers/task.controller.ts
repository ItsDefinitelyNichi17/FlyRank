import type { Request, Response } from "express";
import db from "../db.js";


export function getTask(req: Request, res: Response) {
  const { search } = req.query;
  let query = db.prepare("SELECT * FROM tasks").all() as Array<{ id: number, title: string, done: boolean }>;
  if (search) {
    query = db.prepare("SELECT * FROM tasks WHERE title LIKE ?").all(search + '%') as Array<{id : number, title : string, done : boolean}>;
  }
  const result = query.map((e) => {
    return {
      ...e,
      done : e.done ? true : false
    }
  })
  res.status(200).json({ tasks: result })
  return;
}

export function getTaskWithID(req: Request, res: Response) {
  const { id } = req.params
  const findId = db.prepare("SELECT * FROM tasks WHERE id = ?").get(parseInt(id as string))

  if (!findId) {
    res.status(404).json({ message: "Not found" })
    return;
  }
  try {
    let result = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id) as {id : number, title : string, done : boolean}
    result = { ...result, done: result.done ? true : false }
    res.status(200).json({ result: result })
    return;
  } catch (e) {
    res.status(500)
    return;
  }
}

export function postTask(req: Request, res: Response) {
  const { title } = req.body
  try {
    if (!title || !title.trim()) {
      res.status(400).json({ message: 'Cannot process the request, title should be define' });
      return;
    }
    const task = db.prepare('INSERT INTO tasks(title) VALUES (?) RETURNING *').get(title);

    res.status(201).json({task : task})
    return
  } catch (e) {
    res.status(500).send()
  }
}

export function updateTask(req: Request, res: Response) {
  let { id } = req.params;
  let { title, done} = req.body;

  const findId = db.prepare("SELECT * FROM tasks WHERE id = ?").get(parseInt(id as string)) as {id : number, title : string, done : number}

  if (!findId) {
    res.status(404).json({ message: "Could not find the id" })
    return;
  }

  if (title || title.length === 0){
    if (!title.trim()) {
      res.status(400).json({ message: "Bad Request: Invalid Body" })
      return;
    }
  }

  done = done ? 1 : 0;
  title = title ? title : findId.title

  let updaterec = db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ? RETURNING *;")
    .get(title, done, parseInt(id as string)) as { id: number, title: string, done: boolean };

  updaterec = { ...updaterec, done: updaterec.done ? true : false }
  res.status(200).json({task : updaterec});
  return;
}

export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const findId = db.prepare("SELECT * FROM tasks WHERE id = ?").get(parseInt(id as string))

  if (!findId) {
    res.status(404).json({ message: "Could not find the id" })
    return;
  }

  const del = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  res.status(204).send();
}
