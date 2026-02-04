import { prisma } from '../lib/prisma'
import { generateShortId } from '../utils/nanoid'
import type { CreatePasteRequest, PasteResponse } from '../types/api'

const MAX_CONTEXT_SIZE = 100 * 1024 // 100KB

const calculateExpiresAt = (expiresIn?: string): Date | null => {
  if (!expiresIn || expiresIn == 'never') {
    return null;
  }

  const now = new Date();
  switch (expiresIn) {
    case '1h':
      return new Date(now.getTime() + 60 * 60 * 1000);
    case '1d':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case '1w':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case '1m':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}

export class PasteService {
  async createPaste(data: CreatePasteRequest): Promise<PasteResponse> {
    if (!data.content || data.content.trim().length === 0) {
      throw new Error('Content is required');
    }

    if (Buffer.byteLength(data.content, 'utf8') > MAX_CONTEXT_SIZE) {
      throw new Error('Content exceeds maximum size of 100KB');
    }

    const shortId = generateShortId();
    const expiresAt = calculateExpiresAt(data.expiresIn);

    const paste = await prisma.paste.create({
      data: {
        shortId,
        title: data.title,
        content: data.content,
        language: data.language || 'text',
        expiresAt
      }
    });

    return {
      ...paste,
      title: paste.title ?? undefined,
      url: `pastes${paste.shortId}`
    }
  }

  async getPasteByShortId(shortId: string): Promise<PasteResponse | null> {
    const paste = await prisma.paste.findUnique({
      where: { shortId }
    });

    if (!paste) {
      return null;
    }

    if (paste.expiresAt && paste.expiresAt < new Date()) {
      return null;
    }

    await prisma.paste.update({
      where: { id: paste.id },
      data: { views: paste.views + 1}
    });

    return {
      ...paste,
      title: paste.title ?? undefined,
      views: paste.views + 1
    }
  }

  async getRawContent(shortId: string): Promise<string | null> {
    const paste = await prisma.paste.findUnique({
      where: { shortId },
      select: { content: true, expiresAt: true }
    });

    if (!paste) {
      return null;
    }

    if (paste.expiresAt && paste.expiresAt < new Date()) {
      return null;
    }

    return paste.content
  }

  async getAllPastes(limit: number = 50): Promise<PasteResponse[]> {
    const pastes = await prisma.paste.findMany({
      where: {
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() }}
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: limit 
    })

    return pastes.map(paste => ({
      ...paste,
      title: paste.title ?? undefined,
      url: `/pastes/${paste.shortId}`
    }))
  }
}

export const pasteService = new PasteService();