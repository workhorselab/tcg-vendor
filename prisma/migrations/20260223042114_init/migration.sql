-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('graded_card', 'graded_guard', 'raw_card', 'sealed_product');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('owned', 'sold', 'traded', 'grading');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('buy', 'sell', 'trade', 'grade_submission', 'grade_return');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "TransactionAssetRole" AS ENUM ('incoming', 'outgoing');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "account_status" "AccountStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "asset_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "asset_type" "AssetType" NOT NULL,
    "notes" TEXT,
    "metadata" JSONB,
    "asset_status" "AssetStatus" NOT NULL DEFAULT 'owned',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("asset_id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "transaction_fees_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "cash_in_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "cash_out_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "transaction_status" "TransactionStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "transacted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "TransactionAsset" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "role" "TransactionAssetRole" NOT NULL,
    "market_value_amount" DECIMAL(10,2) NOT NULL,
    "agreed_value_amount" DECIMAL(10,2) NOT NULL,
    "fees_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TransactionAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Asset_user_id_idx" ON "Asset"("user_id");

-- CreateIndex
CREATE INDEX "Transaction_user_id_idx" ON "Transaction"("user_id");

-- CreateIndex
CREATE INDEX "TransactionAsset_transaction_id_idx" ON "TransactionAsset"("transaction_id");

-- CreateIndex
CREATE INDEX "TransactionAsset_asset_id_idx" ON "TransactionAsset"("asset_id");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAsset" ADD CONSTRAINT "TransactionAsset_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAsset" ADD CONSTRAINT "TransactionAsset_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("asset_id") ON DELETE RESTRICT ON UPDATE CASCADE;
