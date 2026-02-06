"use client";

import { pasteApi } from "@/lib/api";
import {
  type CreatePasteRequest,
  EXPIRATION_OPTIONS,
  SUPPORTED_LANGUAGES,
} from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function PasteEditor() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreatePasteRequest>({
    title: "",
    content: "",
    language: "text",
    expiresIn: "never",
  });

  const createPasteMutation = useMutation({
    mutationFn: (data: CreatePasteRequest) => pasteApi.create(data),
    onSuccess: (paste) => {
      router.push(`/${paste.shortId}`);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      return;
    }

    createPasteMutation.mutate(formData);
  };

  const charCount = formData.content.length;
  const maxChars = 100000;
  const lines = formData.content.split("\n").length;

  return (
    <form onSubmit={handleSubmit} className="editor-container">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="editor-toolbat-group" style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Untitled paste..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            maxLength={200}
            style={{ flex: 1, maxWidth: "400px" }}
          />
        </div>

        <div className="editor-toolbat-group">
          <label>LANG</label>
          <select
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-toolbat-group">
          <label>EXPIRES</label>
          <select
            value={formData.expiresIn}
            onChange={(e) =>
              setFormData({
                ...formData,
                expiresIn: e.target.value as CreatePasteRequest["expiresIn"],
              })
            }
          >
            {EXPIRATION_OPTIONS.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {createPasteMutation.error && (
          <div
            style={{
              padding: "12px 24px",
              background: "var(--bg)",
              borderBottom: "1px solid var(--border",
              color: "var(--fg)",
              fontSize: "12px",
            }}
          >
            ERROR:{" "}
            {createPasteMutation.error instanceof Error
              ? createPasteMutation.error.message
              : "Failed to create paste"}
          </div>
        )}

        <div className="editor-main">
          <div className="editor-textarea">
            <textarea
              placeholder="Start typing..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              spellCheck={false}
            />
          </div>
        </div>

        <div className="editor-statusbar">
          <div className="editor-statusbar-left">
            <span>LINES: {lines}</span>
            <span>
              CHARS: {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
          </div>
          <div className="editor-statusbar-right">
            {formData.language?.toUpperCase()} ·{" "}
            {formData.expiresIn === "never"
              ? "NO EXPIRATION"
              : `EXPIRES IN ${formData.expiresIn?.toUpperCase()}`}
          </div>
        </div>

        <div className="editor-actions">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={createPasteMutation.isPending || !formData.content.trim()}
          >
            {createPasteMutation.isPending ? (
              <>
                <span className="spinner" />
                CREATING...
              </>
            ) : (
              "[CREATE PASTE]"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
