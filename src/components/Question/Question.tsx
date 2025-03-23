import React, { useState } from 'react';
import { Question as QuestionType } from '../../types';

interface QuestionProps {
  question: QuestionType;
}

export function Question({ question }: QuestionProps) {
  // Which answer the user has selected
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  // Whether the user has submitted yet
  const [submitted, setSubmitted] = useState(false);
  // Any error messages (e.g., user clicked “Svara” without choosing an answer)
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswerId === null) {
      setError('Vinsamlegast veldu svar áður en þú svarar.'); // "Please select an answer"
      return;
    }
    setError('');
    setSubmitted(true);
  };

  // The user’s chosen answer
  const userAnswer = question.answers.find(
    (answer) => answer.id === selectedAnswerId
  );

  return (
    <div>
      <h2>{question.text}</h2>
      <form onSubmit={handleSubmit}>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {question.answers.map((answer) => {
            // Decide CSS classes or inline styles based on correctness
            let listItemStyle: React.CSSProperties = {};

            if (submitted) {
              // If this answer is the one the user selected
              if (answer.id === selectedAnswerId) {
                listItemStyle = {
                  backgroundColor: answer.correct ? '#c8f7c5' : '#f7c5c5',
                };
              }
              // If this answer is the correct one (reveal it after submit)
              else if (answer.correct) {
                listItemStyle = {
                  backgroundColor: '#c8f7c5',
                };
              }
            }

            return (
              <li key={answer.id} style={listItemStyle}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={answer.id}
                    checked={selectedAnswerId === answer.id}
                    onChange={() => setSelectedAnswerId(answer.id)}
                  />
                  {answer.text}
                </label>
              </li>
            );
          })}
        </ul>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {submitted && (
          <div style={{ marginTop: '1em' }}>
            {userAnswer?.correct ? (
              <p style={{ color: 'green' }}>Rétt svar! (“Correct answer!”)</p>
            ) : (
              <p style={{ color: 'red' }}>Rangt svar. (“Incorrect answer.”)</p>
            )}
          </div>
        )}

        <button type="submit" style={{ marginTop: '1em' }}>
          Svara
        </button>
      </form>
    </div>
  );
}
