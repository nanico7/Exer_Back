/*
  Warnings:

  - You are about to drop the `livros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "livros";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);
