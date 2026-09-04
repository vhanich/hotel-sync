-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('STANDARD', 'SUPERIOR', 'DELUXE', 'PREMIUM', 'LUXURY');

-- CreateEnum
CREATE TYPE "RoomOccupancy" AS ENUM ('VACANT', 'OCCUPIED');

-- CreateEnum
CREATE TYPE "HousekeepingStatus" AS ENUM ('CLEAN', 'DIRTY', 'CLEANING', 'INSPECTION_REQUIRED');

-- CreateEnum
CREATE TYPE "RoomMaintenance" AS ENUM ('OPERATIONAL', 'UNDER_MAINTENANCE', 'OUT_OF_ORDER');

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "type" "RoomType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "occupancy" "RoomOccupancy" NOT NULL DEFAULT 'VACANT',
    "housekeeping" "HousekeepingStatus" NOT NULL DEFAULT 'CLEAN',
    "maintenance" "RoomMaintenance" NOT NULL DEFAULT 'OPERATIONAL',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_number_key" ON "Room"("number");
