/*
  Warnings:

  - The primary key for the `auth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `auth` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Auth_key_key` ON `auth`;

-- AlterTable
ALTER TABLE `auth` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`key`);
