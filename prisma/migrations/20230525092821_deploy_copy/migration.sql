/*
  Warnings:

  - You are about to drop the `AddedPlaygroupSpotify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddedPlaygroupSpotify" DROP CONSTRAINT "AddedPlaygroupSpotify_playgroupId_fkey";

-- DropForeignKey
ALTER TABLE "AddedPlaygroupSpotify" DROP CONSTRAINT "AddedPlaygroupSpotify_userId_fkey";

-- DropTable
DROP TABLE "AddedPlaygroupSpotify";

-- CreateTable
CREATE TABLE "AddedPlaygroupsSpotify" (
    "id" TEXT NOT NULL,
    "playgroupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "playgroupName" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddedPlaygroupsSpotify_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddedPlaygroupsSpotify" ADD CONSTRAINT "AddedPlaygroupsSpotify_playgroupId_fkey" FOREIGN KEY ("playgroupId") REFERENCES "Playgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddedPlaygroupsSpotify" ADD CONSTRAINT "AddedPlaygroupsSpotify_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
