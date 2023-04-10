-- DropForeignKey
ALTER TABLE "UserSong" DROP CONSTRAINT "UserSong_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userSongId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSongId_fkey" FOREIGN KEY ("userSongId") REFERENCES "UserSong"("id") ON DELETE SET NULL ON UPDATE CASCADE;
