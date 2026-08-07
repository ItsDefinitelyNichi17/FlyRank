import type { Request, Response } from "express";
import db from "../db.js";

export function getTask(req: Request, res: Response) {
  const { done, title } = req.query;

  const result = db.prepare("SELECT * FROM tasks").all();

  res.status(200).json({ tasks: result })
  return;
}

export function getTaskWithID(req: Request, res: Response) {
  const { id } = req.params
  const result = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id);
  if (!result) {
    res.status(404).json({message: "Not found"})
    return;
  }
  res.status(200).json({result : result})
}
