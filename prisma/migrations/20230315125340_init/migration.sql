-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'SUSPENDED', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('SOUND_EXPLORER', 'RISING_CONTRIBUTOR', 'MUSIC_AFICIONADO', 'TUNE_TITAN', 'SOUND_MAESTRO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "accountStatus" "Status" NOT NULL DEFAULT 'ACTIVE',
    "rank" "Rank" NOT NULL DEFAULT 'SOUND_EXPLORER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "weeklyPoints" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSong" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playgroupId" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "songPopularity" INTEGER,

    CONSTRAINT "UserSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artists" JSONB NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "FirstAddedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likedById" TEXT,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playgroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "groupImage" TEXT NOT NULL,
    "description" TEXT,
    "groupStatus" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Playgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaygroupToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlaygroupToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSong_songId_userId_key" ON "UserSong"("songId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaygroupToSong_AB_unique" ON "_PlaygroupToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaygroupToSong_B_index" ON "_PlaygroupToSong"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaygroupToUser_AB_unique" ON "_PlaygroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaygroupToUser_B_index" ON "_PlaygroupToUser"("B");

-- AddForeignKey
ALTER TABLE "UserSong" ADD CONSTRAINT "UserSong_playgroupId_fkey" FOREIGN KEY ("playgroupId") REFERENCES "Playgroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSong" ADD CONSTRAINT "UserSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSong" ADD CONSTRAINT "UserSong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaygroupToSong" ADD CONSTRAINT "_PlaygroupToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Playgroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaygroupToSong" ADD CONSTRAINT "_PlaygroupToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaygroupToUser" ADD CONSTRAINT "_PlaygroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Playgroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaygroupToUser" ADD CONSTRAINT "_PlaygroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
