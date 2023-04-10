/*
  Warnings:

  - A unique constraint covering the columns `[songId,userId,playgroupId]` on the table `UserSong` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserSong_songId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserSong_songId_userId_playgroupId_key" ON "UserSong"("songId", "userId", "playgroupId");
