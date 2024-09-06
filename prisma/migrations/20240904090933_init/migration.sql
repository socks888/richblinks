-- CreateTable
CREATE TABLE "Blink" (
    "id" SERIAL NOT NULL,
    "blink_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "amount1" DOUBLE PRECISION NOT NULL,
    "amount2" DOUBLE PRECISION NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blink_pkey" PRIMARY KEY ("id")
);
