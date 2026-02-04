import type { Request, Response, NextFunction } from "express";

export class pasteController {
  async createPaste(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreatePasteRequest = req.body;
      const paste = await pas
    }
  }
}