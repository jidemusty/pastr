import PasteViewer from "@/components/PasteViewer";
import { highlightCode } from "@/lib/highlighter";
import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/env";

async function getPaste(shortId: string) {
  try {
    const res = await fetch(getApiUrl(`/api/pastes/${shortId}`), {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching paste:", error);
    return null;
  }
}

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paste = await getPaste(id);

  if (!paste) {
    notFound();
  }

  const highlightedCode = await highlightCode(paste.content, paste.language);

  return <PasteViewer paste={paste} highlightedCode={highlightedCode} />;
}
