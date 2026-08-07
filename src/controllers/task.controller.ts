import type { Request, Response } from "express";
import db from "../db.js";

export function getTask(req: Request, res: Response) {
  const { done, title } = req.query;

  const result = db.prepare("SELECT * FROM tasks").all();

  res.status(200).json({ tasks : result})
}
