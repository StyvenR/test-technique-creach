import { questions } from "./question-template";

export interface FormResponse {
  id: string;
  timestamp: string;
  answers: {
    questionId: number;
    question: string;
    answer: string | string[] | number | null;
  }[];
}

export async function processFormSubmission(
  formData: FormData,
): Promise<FormResponse> {
  // Créer l'objet de réponse
  const answers = questions.map((q) => {
    let answer;

    if (q.type === "MULTI_SELECTION") {
      answer = q.options.filter(
        (option) => formData.get(`question_${q.id}_${option}`) !== null,
      );
    } else if (q.type === "number") {
      const val = formData.get(`question_${q.id}`)?.toString();
      answer = val ? Number(val) : null;
    } else {
      answer = formData.get(`question_${q.id}`)?.toString() || "";
    }

    return {
      questionId: q.id,
      question: q.question,
      answer,
    };
  });

  // Créer l'objet de réponse complet
  const response: FormResponse = {
    id: `form_${Date.now()}`,
    timestamp: new Date().toISOString(),
    answers,
  };

  try {
    const apiResponse = await fetch("/api/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    const result = await apiResponse.json();

    if (!result.success) {
      throw new Error(result.error || "Échec de l'enregistrement des données");
    }

    console.log("Réponse enregistrée avec succès dans la base de données");
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement dans la base de données:",
      error,
    );
    throw new Error(
      "Échec de l'enregistrement des données dans la base de données",
    );
  }

  return response;
}
