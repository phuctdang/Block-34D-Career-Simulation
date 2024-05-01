/*
  Warnings:

  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "userId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
