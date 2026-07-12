/*
  Warnings:

  - You are about to drop the column `password` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `pinCode` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedPassword]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Staff_password_key";

-- DropIndex
DROP INDEX "Staff_pinCode_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "password",
DROP COLUMN "pinCode",
ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "hashedPinCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_hashedPassword_key" ON "Staff"("hashedPassword");
