/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fName" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "tName" TEXT NOT NULL,
    "tDesc" TEXT NOT NULL,
    "tStatus" TEXT NOT NULL,
    "tPriorities" TEXT NOT NULL,
    "tCategory" TEXT NOT NULL,
    "tAssignedToId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_tAssignedToId_fkey" FOREIGN KEY ("tAssignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
