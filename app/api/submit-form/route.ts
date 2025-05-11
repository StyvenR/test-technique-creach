import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Créer un nouvel enregistrement pour le formulaire soumis
    const formSubmission = await prisma.formSubmission.create({
      data: {
        id: data.id,
        timestamp: new Date(data.timestamp),
      },
    });

    // Créer UNIQUEMENT les réponses pour CETTE soumission
    for (const answer of data.answers) {
      await prisma.surveyAnswers.create({
        data: {
          questionId: answer.questionId,
          question: answer.question,
          answer: answer.answer,
          formSubmissionId: formSubmission.id, 
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      id: formSubmission.id 
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save form data" },
      { status: 500 }
    );
  }
}