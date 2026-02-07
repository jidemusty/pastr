import { PasteResponse } from "@/lib/types";
import CopyButton from "./CopyButton";
import Link from "next/link";

interface PasteViewerProps {
  paste: PasteResponse;
  highlightedCode: string;
}

export default function PasteViewer({
  paste,
  highlightedCode,
}: PasteViewerProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="viewer-container fade-in">
      <div className="viewer-header">
        <h1 className="viewer-title">{paste.title || "[UNTITLED PASTE]"}</h1>

        <div className="viewer-meta">
          <div className="viewer-meta-item">
            <span className="viewer-meta-label">LANGUAGE:</span>
            <span className="viewer-meta-value">
              {paste.language.toUpperCase()}
            </span>
          </div>
          <div className="viewer-meta-item">
            <span className="viewer-meta-label">CREATED:</span>
            <span className="viewer-meta-value">
              {formatDate(paste.createdAt)}
            </span>
          </div>
          {paste.expiresAt && (
            <div className="viewer-meta-item">
              <span className="viewer-meta-label">EXPIRES:</span>
              <span className="viewer-meta-value">
                {formatDate(paste.expiresAt)}
              </span>
            </div>
          )}
          <div className="viewer-meta-item">
            <span className="viewer-meta-label">VIEWS:</span>
            <span className="viewer-meta-value">{paste.views}</span>
          </div>
        </div>

        <div className="viewer-actions">
          <CopyButton text={paste.content} />
          <a
            href={`/api/pastes/${paste.shortId}/raw`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            [RAW]
          </a>
          <Link href="/" className="btn">
            [NEW PASTE]
          </Link>
          <a href="/pastes" className="btn">
            [ALL PASTES]
          </a>
        </div>
      </div>

      <div className="viewer-code">
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </div>
    </div>
  );
}
