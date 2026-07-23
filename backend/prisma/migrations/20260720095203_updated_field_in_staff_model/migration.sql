/*
  Warnings:

  - Made the column `staffId` on table `Staff` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "staffId" SET NOT NULL;
