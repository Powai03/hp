/*
  Warnings:

  - You are about to drop the column `house` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `pers` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `rarete` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Card` DROP COLUMN `house`,
    DROP COLUMN `image`,
    DROP COLUMN `pers`,
    DROP COLUMN `rarete`,
    DROP COLUMN `resume`;
