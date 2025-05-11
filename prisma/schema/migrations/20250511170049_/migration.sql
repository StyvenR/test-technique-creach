-- CreateTable
CREATE TABLE "SurveyAnswers" (
    "id" SERIAL NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyAnswers_pkey" PRIMARY KEY ("id")
);
