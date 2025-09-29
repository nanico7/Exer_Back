-- CreateTable
CREATE TABLE "livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO livros (title, author, available) VALUES 
('1984', 'George Orwell', 1),
('Dom Casmurro', 'Machado de Assis', 1),
('Harry Potter', 'J.K. Rowling', 0),
('Clean Code', 'Robert Martin', 1);