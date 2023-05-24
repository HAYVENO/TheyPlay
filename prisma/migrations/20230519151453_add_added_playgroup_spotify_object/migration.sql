-- CreateTable
CREATE TABLE "AddedPlaygroupSpotify" (
    "id" TEXT NOT NULL,
    "playgroupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "playgroupName" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddedPlaygroupSpotify_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddedPlaygroupSpotify" ADD CONSTRAINT "AddedPlaygroupSpotify_playgroupId_fkey" FOREIGN KEY ("playgroupId") REFERENCES "Playgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddedPlaygroupSpotify" ADD CONSTRAINT "AddedPlaygroupSpotify_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
