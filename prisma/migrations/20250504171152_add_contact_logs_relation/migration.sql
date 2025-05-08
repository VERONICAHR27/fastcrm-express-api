-- CreateTable
CREATE TABLE "ContactLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "template" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "ContactLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactLog" ADD CONSTRAINT "ContactLog_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
