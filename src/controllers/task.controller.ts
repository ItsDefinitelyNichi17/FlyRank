import type { Request, Response } from "express";
import db from "../db.js";



export function getTask(req: Request, res: Response) {
  const { done, title } = req.query;

  const query = db.prepare("SELECT * FROM tasks").all() as Array<{id : number, title : string, done : boolean}>;

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
  let result = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id) as {id : number, title : string, done : boolean}
  result = { ...result, done : result.done ? true: false }

  if (!result) {
    res.status(404).json({message: "Not found"})
    return;
  }

  res.status(200).json({result : result})
}


export function postTask(req: Request, res: Response) {
  const { title } = req.body
  try {
    if (!title || !title.trim()) {
      res.status(400).json({ message: 'Cannot process the request, title should be define' });
      return;
    }
    const task = db.prepare('INSERT INTO tasks(title) VALUES (?)').run(title);

    res.status(201).json({task : task})
    return
  } catch (e) {
    console.log(e)
  }
}
