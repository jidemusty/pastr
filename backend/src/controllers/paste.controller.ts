import { Request, Response, NextFunction } from 'express';
import { pasteService } from '../services/paste.service';
import type { CreatePasteRequest } from '../types/api';

export class PasteController {
  async createPaste(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreatePasteRequest = req.body;
      const paste = await pasteService.createPaste(data);
      res.status(201).json(paste);
    } catch (error) {
      next(error);
    }
  }

  async getPaste(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { shortId } = req.params;
      const paste = await pasteService.getPasteByShortId(Array.isArray(shortId) ? shortId[0] : shortId);

      if (!paste) {
        res.status(404).json({
          error: 'Not Found',
          message: 'Paste not found or has expired',
          statusCode: 404,
        });
        return;
      }

      res.status(200).json(paste);
    } catch (error) {
      next(error);
    }
  }

  async getRawPaste(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { shortId } = req.params;
      const content = await pasteService.getRawContent(Array.isArray(shortId) ? shortId[0] : shortId);

      if (!content) {
        res.status(404).json({
          error: 'Not Found',
          message: 'Paste not found or has expired',
          statusCode: 404,
        });
        return;
      }

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(200).send(content);
    } catch (error) {
      next(error);
    }
  }

  async getAllPastes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const pastes = await pasteService.getAllPastes(limit);
      res.status(200).json(pastes);
    } catch (error) {
      next(error);
    }
  }
}

export const pasteController = new PasteController();
