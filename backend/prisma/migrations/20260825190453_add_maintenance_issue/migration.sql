/*
  Warnings:

  - The `maintenanceStatus` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `occupancyStatus` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoomOccupancyStatus" AS ENUM ('VACANT', 'OCCUPIED');

-- CreateEnum
CREATE TYPE "RoomMaintenanceStatus" AS ENUM ('OPERATIONAL', 'UNDER_MAINTENANCE', 'OUT_OF_ORDER');

-- CreateEnum
CREATE TYPE "MaintenanceIssueStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "maintenanceStatus",
ADD COLUMN     "maintenanceStatus" "RoomMaintenanceStatus" NOT NULL DEFAULT 'OPERATIONAL',
DROP COLUMN "occupancyStatus",
ADD COLUMN     "occupancyStatus" "RoomOccupancyStatus" NOT NULL DEFAULT 'VACANT';

-- DropEnum
DROP TYPE "RoomMaintenance";

-- DropEnum
DROP TYPE "RoomOccupancy";

-- CreateTable
CREATE TABLE "MaintenanceIssue" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "status" "MaintenanceIssueStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "MaintenanceIssue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaintenanceIssue" ADD CONSTRAINT "MaintenanceIssue_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceIssue" ADD CONSTRAINT "MaintenanceIssue_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
