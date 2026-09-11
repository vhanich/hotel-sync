/*
  Warnings:

  - You are about to drop the column `name` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `reservatinStatus` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Guest_phone_key";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "reservatinStatus",
ADD COLUMN     "reservationStatus" "ReservationStatus" NOT NULL DEFAULT 'PENDING';
