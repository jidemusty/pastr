import Link from "next/link";
import type { PasteResponse } from "@/lib/types";
import { getApiUrl } from "@/lib/env";

async function getAllPastes() {
  try {
    const res = await fetch(getApiUrl(`/api/pastes/list`), {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching pastes", error);
    return [];
  }
}

export default async function PastesBody() {
  const pastes = await getAllPastes();

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
    <div className="list-container fade-in">
      <div className="list-header">
        <h2>ALL PASTES</h2>
        <p style={{ marginTop: "8px", color: "var(--muted)" }}>
          RECENT PASTES • {pastes?.length} TOTAL
        </p>
      </div>

      {pastes?.length === 0 ? (
        <div className="list-empty">
          <p>NO PASTES FOUND</p>
          <p style={{ marginTop: "8px" }}>
            <Link href="/">[CREATE YOUR FIRST PASTE]</Link>
          </p>
        </div>
      ) : (
        <div className="list-grid">
          {pastes?.map((paste: PasteResponse) => (
            <Link
              key={paste.id}
              href={`/${paste.shortId}`}
              className="list-item"
            >
              <div className="list-item-title">
                {paste.title || "[UNTITLED PASTE]"}
              </div>
              <div className="list-item-meta">
                <span>LANG: {paste.language.toUpperCase()}</span>
                <span>CREATED: {formatDate(paste.createdAt)}</span>
                <span>VIEWS: {paste.views}</span>
                {paste.expiresAt && (
                  <span>EXPIRES: {formatDate(paste.expiresAt)}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
