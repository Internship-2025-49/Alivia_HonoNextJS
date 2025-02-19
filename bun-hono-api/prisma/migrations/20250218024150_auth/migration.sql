/*
  Warnings:

  - The primary key for the `auth` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `auth` DROP PRIMARY KEY,
    MODIFY `key` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`key`);
