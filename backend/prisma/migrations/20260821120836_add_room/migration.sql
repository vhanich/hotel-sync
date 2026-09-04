/*
  Warnings:

  - You are about to drop the column `housekeeping` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `maintenance` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `occupancy` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "housekeeping",
DROP COLUMN "maintenance",
DROP COLUMN "occupancy",
ADD COLUMN     "housekeepingStatus" "HousekeepingStatus" NOT NULL DEFAULT 'CLEAN',
ADD COLUMN     "maintenanceStatus" "RoomMaintenance" NOT NULL DEFAULT 'OPERATIONAL',
ADD COLUMN     "occupancyStatus" "RoomOccupancy" NOT NULL DEFAULT 'VACANT';
