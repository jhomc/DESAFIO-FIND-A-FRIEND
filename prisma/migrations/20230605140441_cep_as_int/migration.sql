/*
  Warnings:

  - Changed the type of `cep` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "cep",
ADD COLUMN     "cep" INTEGER NOT NULL;
