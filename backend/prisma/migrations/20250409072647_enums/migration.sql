/*
  Warnings:

  - The `tStatus` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tPriorities` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Priorities" AS ENUM ('low', 'high', 'medium', 'urgent');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('todo', 'inProgress', 'completed', 'stuck');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tStatus",
ADD COLUMN     "tStatus" "Status" NOT NULL DEFAULT 'todo',
DROP COLUMN "tPriorities",
ADD COLUMN     "tPriorities" "Priorities" NOT NULL DEFAULT 'medium';
