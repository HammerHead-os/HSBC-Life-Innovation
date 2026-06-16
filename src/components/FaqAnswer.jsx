import { faqAnswerText } from '../data/faq';

function FaqAnswer({ answer }) {
  return (
    <div className="space-y-3">
      {answer.map((block, index) => {
        if (Array.isArray(block)) {
          return (
            <ul key={index} className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              {block.map((item) => (
                <li key={item} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-sm text-gray-600 leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export { FaqAnswer, faqAnswerText };
