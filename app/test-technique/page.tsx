"use client";

import { useState } from "react";
import { formData, questions } from "./question-template";
import { renderQuestionInput } from "./question-input";
import { processFormSubmission, FormResponse } from "./form-handler";

export default function TestTechnique() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formResponse, setFormResponse] = useState<FormResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);

      const response = await processFormSubmission(formData);

      setFormResponse(response);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Erreur lors de la soumission du formulaire:", err);
      setError("Une erreur est survenue lors de l'enregistrement des données.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex p-4 w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">{formData.title}</h1>
        <p className="text-gray-600">{formData.description}</p>

        {error && (
          <div className="mb-4 w-full rounded-md bg-red-100 p-4 text-red-700">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {isSubmitted ? (
          <div className="w-full">
            <div className="mb-4 rounded-md bg-green-100 p-4 text-green-700">
              <p className="font-medium">Formulaire soumis avec succès!</p>
              <p className="text-sm">
                Les données ont été enregistrées dans la base de données.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Soumettre à nouveau
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            {formData.questions.map((question) => (
              <div key={question.id} className="mb-6">
                <p className="text-lg font-medium text-gray-700">
                  {question.question}{" "}
                  {question.required && <span className="text-red-500">*</span>}
                </p>
                {renderQuestionInput(question)}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? "Enregistrement en cours..." : "Soumettre"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
