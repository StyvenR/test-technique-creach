import { Question } from "./question-template";

export const renderQuestionInput = (question: Question) => {
  switch (question.type) {
    case "RADIO":
      return (
        <div className="mt-2">
          {question.options.map((option: string, index: number) => (
            <label key={index} className="mr-4 flex items-center">
              <input
                type="radio"
                name={`question_${question.id}`}
                value={option}
                required={question.required}
                className="mr-2 accent-blue-500"
              />
              {option}
            </label>
          ))}
        </div>
      );
    case "MULTI_SELECTION":
      return (
        <div className="mt-2">
          {question.options.map((option: string, index: number) => (
            <label key={index} className="block flex items-center">
              <input
                type="checkbox"
                name={`question_${question.id}_${option}`}
                className="mr-2 accent-blue-500"
              />
              {option}
            </label>
          ))}
        </div>
      );
    case "TEXTAREA":
      return (
        <textarea
          name={`question_${question.id}`}
          className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required={question.required}
          rows={4}
        />
      );
    default:
      return (
        <input
          type={question.type}
          name={`question_${question.id}`}
          className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required={question.required}
        />
      );
  }
};
