/*
  Warnings:

  - Made the column `authorId` on table `TokenPair` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TokenPair" DROP CONSTRAINT "TokenPair_authorId_fkey";

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "quantity_sold" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TokenPair" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TokenPair" ADD CONSTRAINT "TokenPair_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
