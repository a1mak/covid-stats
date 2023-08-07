/*
  Warnings:

  - You are about to drop the `DashboardCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Structure" AS ENUM ('areaCode', 'areaName', 'date', 'newCasesByPublishDate', 'newDeaths28DaysByPublishDate', 'cumCasesByPublishDate', 'cumDeaths28DaysByPublishDate');

-- DropTable
DROP TABLE "DashboardCard";

-- CreateTable
CREATE TABLE "SignleLineChart" (
    "id" SERIAL NOT NULL,
    "apiFiltersId" INTEGER NOT NULL,
    "cardInfoId" INTEGER NOT NULL,
    "xAxisId" INTEGER NOT NULL,
    "yAxisId" INTEGER NOT NULL,
    "page" INTEGER,

    CONSTRAINT "SignleLineChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PieChart" (
    "id" SERIAL NOT NULL,
    "apiFiltersId" INTEGER NOT NULL,
    "cardInfoId" INTEGER NOT NULL,
    "yAxisId" INTEGER NOT NULL,
    "latestBy" "Structure" NOT NULL,

    CONSTRAINT "PieChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Axis" (
    "id" SERIAL NOT NULL,
    "structureParam" "Structure" NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Axis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiFilters" (
    "id" SERIAL NOT NULL,
    "areaType" TEXT NOT NULL,
    "areaName" TEXT NOT NULL,

    CONSTRAINT "ApiFilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardInfo" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "cardAvatarId" INTEGER NOT NULL,

    CONSTRAINT "CardInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardAvatar" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,

    CONSTRAINT "CardAvatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Axis_title_structureParam_key" ON "Axis"("title", "structureParam");

-- AddForeignKey
ALTER TABLE "SignleLineChart" ADD CONSTRAINT "SignleLineChart_apiFiltersId_fkey" FOREIGN KEY ("apiFiltersId") REFERENCES "ApiFilters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignleLineChart" ADD CONSTRAINT "SignleLineChart_cardInfoId_fkey" FOREIGN KEY ("cardInfoId") REFERENCES "CardInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignleLineChart" ADD CONSTRAINT "SignleLineChart_xAxisId_fkey" FOREIGN KEY ("xAxisId") REFERENCES "Axis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignleLineChart" ADD CONSTRAINT "SignleLineChart_yAxisId_fkey" FOREIGN KEY ("yAxisId") REFERENCES "Axis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PieChart" ADD CONSTRAINT "PieChart_apiFiltersId_fkey" FOREIGN KEY ("apiFiltersId") REFERENCES "ApiFilters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PieChart" ADD CONSTRAINT "PieChart_cardInfoId_fkey" FOREIGN KEY ("cardInfoId") REFERENCES "CardInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PieChart" ADD CONSTRAINT "PieChart_yAxisId_fkey" FOREIGN KEY ("yAxisId") REFERENCES "Axis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardInfo" ADD CONSTRAINT "CardInfo_cardAvatarId_fkey" FOREIGN KEY ("cardAvatarId") REFERENCES "CardAvatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
