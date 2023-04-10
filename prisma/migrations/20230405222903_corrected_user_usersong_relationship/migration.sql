/*
  Warnings:

  - You are about to drop the column `userSongId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userSongId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userSongId";

-- CreateTable
CREATE TABLE "_likedUserSongs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedUserSongs_AB_unique" ON "_likedUserSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_likedUserSongs_B_index" ON "_likedUserSongs"("B");

-- AddForeignKey
ALTER TABLE "_likedUserSongs" ADD CONSTRAINT "_likedUserSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedUserSongs" ADD CONSTRAINT "_likedUserSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "UserSong"("id") ON DELETE CASCADE ON UPDATE CASCADE;
