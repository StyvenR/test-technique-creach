/*
  Warnings:

  - You are about to drop the column `answers` on the `SurveyAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SurveyAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SurveyAnswers` table. All the data in the column will be lost.
  - Added the required column `answer` to the `SurveyAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formSubmissionId` to the `SurveyAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `SurveyAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `SurveyAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurveyAnswers" DROP COLUMN "answers",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "answer" JSONB NOT NULL,
ADD COLUMN     "formSubmissionId" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyAnswers" ADD CONSTRAINT "SurveyAnswers_formSubmissionId_fkey" FOREIGN KEY ("formSubmissionId") REFERENCES "FormSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
