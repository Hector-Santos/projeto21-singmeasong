import { Request, Response } from "express";
import * as e2eService from "../services/e2eService";

export async function reset(req: Request, res: Response) {
  await e2eService.truncate();
  res.sendStatus(200);
}

export async function populate(req: Request, res: Response) {
  await e2eService.populate();
  res.sendStatus(200);
}