/*
  Warnings:

  - You are about to drop the `Axis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PieChart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SignleLineChart` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChartType" AS ENUM ('singleLine', 'pie');

-- DropForeignKey
ALTER TABLE "PieChart" DROP CONSTRAINT "PieChart_apiFiltersId_fkey";

-- DropForeignKey
ALTER TABLE "PieChart" DROP CONSTRAINT "PieChart_cardInfoId_fkey";

-- DropForeignKey
ALTER TABLE "PieChart" DROP CONSTRAINT "PieChart_yAxisId_fkey";

-- DropForeignKey
ALTER TABLE "SignleLineChart" DROP CONSTRAINT "SignleLineChart_apiFiltersId_fkey";

-- DropForeignKey
ALTER TABLE "SignleLineChart" DROP CONSTRAINT "SignleLineChart_cardInfoId_fkey";

-- DropForeignKey
ALTER TABLE "SignleLineChart" DROP CONSTRAINT "SignleLineChart_xAxisId_fkey";

-- DropForeignKey
ALTER TABLE "SignleLineChart" DROP CONSTRAINT "SignleLineChart_yAxisId_fkey";

-- DropTable
DROP TABLE "Axis";

-- DropTable
DROP TABLE "PieChart";

-- DropTable
DROP TABLE "SignleLineChart";

-- CreateTable
CREATE TABLE "Chart" (
    "id" SERIAL NOT NULL,
    "type" "ChartType" NOT NULL,
    "apiFiltersId" INTEGER NOT NULL,
    "cardInfoId" INTEGER NOT NULL,
    "xAxisLabel" VARCHAR(20) NOT NULL,
    "yAxisLabel" VARCHAR(20) NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_apiFiltersId_fkey" FOREIGN KEY ("apiFiltersId") REFERENCES "ApiFilters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_cardInfoId_fkey" FOREIGN KEY ("cardInfoId") REFERENCES "CardInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
