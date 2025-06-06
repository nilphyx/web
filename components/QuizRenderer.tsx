'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { Quiz, QuizQuestion, UserQuizSubmission } from '@/lib/types';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from './Button';
import { CheckCircleIcon, XCircleIcon, LightBulbIcon } from '@/components/icons'; // Assuming you have these icons

interface QuizRendererProps {
  quiz: Quiz;
  onQuizComplete: (submission: UserQuizSubmission) => void;
}

interface UserAnswers {
  [questionId: string]: string | string[];
}

const QuizRenderer: React.FC<QuizRendererProps> = ({ quiz, onQuizComplete }) => {
  const { user, submitQuiz, getQuizSubmission } = useAuth();
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState<UserQuizSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const existingSubmission = getQuizSubmission(quiz.id);
      if (existingSubmission) {
        setSubmitted(existingSubmission);
        const prevAnswers: UserAnswers = {};
        existingSubmission.answers.forEach(ans => {
          prevAnswers[ans.questionId] = ans.answer;
        });
        setUserAnswers(prevAnswers);
      }
    }
  }, [quiz.id, user, getQuizSubmission]);

  const handleAnswerChange = (questionId: string, answer: string, questionType: QuizQuestion['type']) => {
    if (submitted) return; // Don't allow changes after submission

    setUserAnswers(prev => {
      if (questionType === 'multiple-choice') { // Assuming single choice MCQs for now. For multi-select, this needs adjustment.
        return { ...prev, [questionId]: answer };
      }
      return { ...prev, [questionId]: answer };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || Object.keys(userAnswers).length !== quiz.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    setIsLoading(true);
    const answersToSubmit = quiz.questions.map(q => ({
      questionId: q.id,
      answer: userAnswers[q.id] || '', // Default to empty string if somehow not answered
    }));

    const submissionResult = await submitQuiz(quiz.id, answersToSubmit);
    setIsLoading(false);
    if (submissionResult) {
      setSubmitted(submissionResult);
      onQuizComplete(submissionResult);
    } else {
      alert('Failed to submit quiz. Please try again.');
    }
  };

  const getOptionStyle = (question: QuizQuestion, optionId: string) => {
    if (!submitted) return 'border-neutral-300 hover:border-primary';
    
    const userAnswer = userAnswers[question.id];
    const isCorrect = question.correctAnswer === optionId;
    const isSelected = userAnswer === optionId;

    if (isCorrect) return 'border-green-500 bg-green-50 ring-2 ring-green-500';
    if (isSelected && !isCorrect) return 'border-red-500 bg-red-50 ring-2 ring-red-500';
    if (isSelected) return 'border-primary'; // Selected but not necessarily correct/incorrect if not the answer
    return 'border-neutral-300';
  };
  
  const getTrueFalseStyle = (question: QuizQuestion, value: string) => {
     if (!submitted) return 'border-neutral-300 hover:border-primary';
    
    const userAnswer = userAnswers[question.id];
    const isCorrect = question.correctAnswer === value;
    const isSelected = userAnswer === value;

    if (isCorrect) return 'border-green-500 bg-green-50 ring-2 ring-green-500';
    if (isSelected && !isCorrect) return 'border-red-500 bg-red-50 ring-2 ring-red-500';
    return 'border-neutral-300';
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">{quiz.title}</h2>
      
      {submitted && (
        <div className={`p-4 mb-6 rounded-md text-center ${submitted.score >= 70 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          <h3 className="text-xl font-semibold">Quiz Submitted!</h3>
          <p className="text-2xl font-bold my-2">Your Score: {submitted.score}%</p>
          {submitted.score >= 70 ? (
             <p className="flex items-center justify-center"><CheckCircleIcon className="w-5 h-5 mr-2"/>Congratulations, you passed!</p>
          ) : (
             <p className="flex items-center justify-center"><XCircleIcon className="w-5 h-5 mr-2"/>You did not pass. Please review the material and try again.</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="mb-8 p-4 border border-neutral-200 rounded-md bg-neutral-50/50">
            <p className="text-lg font-medium text-neutral-700 mb-3">
              Question {index + 1}: {question.text}
            </p>
            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-2">
                {question.options.map(option => (
                  <label
                    key={option.id}
                    className={`block p-3 border rounded-md cursor-pointer transition-all ${getOptionStyle(question, option.id)}`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={userAnswers[question.id] === option.id}
                      onChange={() => handleAnswerChange(question.id, option.id, question.type)}
                      className="mr-3 accent-primary"
                      disabled={!!submitted}
                    />
                    {option.text}
                    {submitted && question.correctAnswer === option.id && <CheckCircleIcon className="w-5 h-5 text-success inline-block ml-2" />}
                    {submitted && userAnswers[question.id] === option.id && question.correctAnswer !== option.id && <XCircleIcon className="w-5 h-5 text-danger inline-block ml-2" />}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'true-false' && (
              <div className="flex space-x-4">
                {['true', 'false'].map(value => (
                  <label
                    key={value}
                    className={`flex-1 p-3 border rounded-md cursor-pointer transition-all text-center ${getTrueFalseStyle(question, value)}`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={value}
                      checked={userAnswers[question.id] === value}
                      onChange={() => handleAnswerChange(question.id, value, question.type)}
                      className="mr-2 accent-primary"
                      disabled={!!submitted}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                    {submitted && question.correctAnswer === value && <CheckCircleIcon className="w-5 h-5 text-success inline-block ml-2" />}
                    {submitted && userAnswers[question.id] === value && question.correctAnswer !== value && <XCircleIcon className="w-5 h-5 text-danger inline-block ml-2" />}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'short-answer' && (
              <div>
                <input
                  type="text"
                  value={(userAnswers[question.id] as string) || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value, question.type)}
                  className="w-full p-2 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
                  disabled={!!submitted}
                />
                 {submitted && (
                    <p className={`mt-2 text-sm ${ (userAnswers[question.id] as string)?.toLowerCase() === question.correctAnswer.toString().toLowerCase() ? 'text-success' : 'text-danger'}`}>
                      Correct Answer: {question.correctAnswer.toString()}
                    </p>
                )}
              </div>
            )}
             {submitted && question.type !== 'short-answer' && question.correctAnswer !== userAnswers[question.id] && (
                <div className="mt-2 text-sm text-neutral-600 bg-blue-50 p-2 rounded-md flex items-start">
                    <LightBulbIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5"/>
                    <span>Correct answer was: {question.options?.find(opt => opt.id === question.correctAnswer)?.text || question.correctAnswer.toString()}</span>
                </div>
            )}
          </div>
        ))}
        {!submitted && (
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Quiz'}
          </Button>
        )}
        {submitted && (
             <Button onClick={() => { setSubmitted(null); setUserAnswers({}); }} variant="outline" size="lg" className="ml-4">
                Retake Quiz (Answers will be cleared)
            </Button>
        )}
      </form>
    </div>
  );
};

export default QuizRenderer;
