-- CreateEnum
CREATE TYPE "StaffStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "StaffAvailability" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'VACATION', 'SICK_LEAVE', 'DAY_OFF');

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "availability" "StaffAvailability" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "status" "StaffStatus" NOT NULL DEFAULT 'ACTIVE';
