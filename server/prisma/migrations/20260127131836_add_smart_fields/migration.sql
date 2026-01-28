-- AlterTable
ALTER TABLE "Link" ADD COLUMN "endDate" DATETIME;
ALTER TABLE "Link" ADD COLUMN "startDate" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT DEFAULT '/assets/profile.jpg',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "accentColor" TEXT NOT NULL DEFAULT '#eab308',
    "pageTitle" TEXT,
    "metaDescription" TEXT,
    "directMode" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("accentColor", "avatarUrl", "bio", "createdAt", "email", "fullName", "id", "metaDescription", "pageTitle", "password", "theme", "updatedAt", "username", "verified") SELECT "accentColor", "avatarUrl", "bio", "createdAt", "email", "fullName", "id", "metaDescription", "pageTitle", "password", "theme", "updatedAt", "username", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
