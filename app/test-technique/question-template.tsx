export interface Question {
  id: number;
  question: string;
  required: boolean;
  type: "text" | "number" | "RADIO" | "MULTI_SELECTION" | "TEXTAREA";
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Quel est ton prénom ?",
    required: true,
    type: "text",
    options: [],
  },
  {
    id: 2,
    question: "Quel âge as-tu ?",
    required: true,
    type: "number",
    options: [],
  },
  {
    id: 3,
    question: "Connaissez-vous le framework React ?",
    required: true,
    type: "RADIO",
    options: ["Oui", "Non"],
  },
  {
    id: 4,
    question:
      "Quel langage de programmation maîtrisez-vous ? (plusieurs choix possibles)",
    required: true,
    type: "MULTI_SELECTION",
    options: ["JavaScript", "Python", "Java", "C#", "Ruby"],
  },
  {
    id: 5,
    question: "Comment connaisez-vous l'entreprise ?",
    required: true,
    type: "TEXTAREA",
    options: [],
  },
];

export const formData = {
  title: "Test Technique",
  description: "Veuillez remplir le formulaire ci-dessous.",
  questions: questions,
};