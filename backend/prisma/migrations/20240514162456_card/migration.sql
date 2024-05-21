/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Card` table. All the data in the column will be lost.
  - Added the required column `house` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pers` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarete` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `house` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pers` VARCHAR(191) NOT NULL,
    ADD COLUMN `rarete` VARCHAR(191) NOT NULL,
    ADD COLUMN `resume` VARCHAR(191) NOT NULL;
