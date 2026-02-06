import type { CreatePasteRequest, PasteResponse } from "./types";

const API_BASE_URL = "/api";

export const pasteApi = {
  create: async (data: CreatePasteRequest): Promise<PasteResponse> => {
    const res = await fetch(`${API_BASE_URL}/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res
        .json()
        .catch(() => ({ message: "Failed to create paste" }));
      throw new Error(error.message || "Failed to create paste");
    }

    return res.json();
  },

  getShortById: async (shortId: string): Promise<PasteResponse> => {
    const res = await fetch(`${API_BASE_URL}/pastes/${shortId}`);

    if (!res.ok) {
      if (res.status === 410) {
        throw new Error("Paste expired");
      }

      if (res.status === 404) {
        throw new Error("Paste not found");
      }

      throw new Error("Failed to fetch paste");
    }

    return res.json();
  },

  getRawContent: async (shortId: string): Promise<PasteResponse> => {
    const res = await fetch(`${API_BASE_URL}/pastes/${shortId}/raw`);

    if (!res.ok) {
      if (res.status === 410) {
        throw new Error("Paste expired");
      }

      if (res.status === 404) {
        throw new Error("Paste not found");
      }

      throw new Error("Failed to fetch paste");
    }

    return res.json();
  },

  getAll: async (limit?: number): Promise<PasteResponse[]> => {
    const url = limit
      ? `${API_BASE_URL}/pastes/list?limit=${limit}`
      : `${API_BASE_URL}/pastes/list`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch pastes");
    }

    return res.json();
  },
};
