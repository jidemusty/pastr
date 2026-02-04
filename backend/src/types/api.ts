export interface CreatePasteRequest {
  title?: string;
  content: string;
  language?: string;
  expiresIn: '1hr' | '1d' | '1w' | '1m' | 'never'
}

export interface PasteResponse {
  id: string;
  shortId: string;
  title?: string;
  content: string;
  language?: string;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  url?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}