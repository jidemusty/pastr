import type { Request, Response, NextFunction } from "express";
import { z } from 'zod';

const createPasteSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().min(1, 'Content is required').max(100000, 'Content is too large'),
  language: z.string().max(50).optional(),
  expiresIn: z.enum(['1hr', 'id', '1w', 'never']).optional()
});

export const validateCreatePaste = (req: Request, next: NextFunction): void => {
  try {
    createPasteSchema.parse(req.body);
    next()
  } catch (error) {
    next(error);
  }
}