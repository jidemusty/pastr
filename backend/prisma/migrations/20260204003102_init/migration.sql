-- CreateTable
CREATE TABLE "Paste" (
    "id" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'text',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Paste_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paste_shortId_key" ON "Paste"("shortId");

-- CreateIndex
CREATE INDEX "Paste_shortId_idx" ON "Paste"("shortId");

-- CreateIndex
CREATE INDEX "Paste_expiresAt_idx" ON "Paste"("expiresAt");
