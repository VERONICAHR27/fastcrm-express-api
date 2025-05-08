/*
  Warnings:

  - Added the required column `templateId` to the `ContactLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactLog" DROP CONSTRAINT "ContactLog_contactId_fkey";

-- AlterTable
ALTER TABLE "ContactLog" ADD COLUMN     "templateId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ContactLog" ADD CONSTRAINT "ContactLog_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
