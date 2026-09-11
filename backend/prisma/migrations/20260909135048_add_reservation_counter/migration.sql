-- CreateTable
CREATE TABLE "ReservationCounter" (
    "year" INTEGER NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReservationCounter_pkey" PRIMARY KEY ("year")
);
