import React, { useState } from 'react';
import { X, Award, CheckCircle2, ChevronRight, HelpCircle, ArrowLeft, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { mockQuizzes } from '../mockData';
import { Quiz, QuizQuestion } from '../types';

interface TestPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestPortal({ isOpen, onClose }: TestPortalProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    if (currentQuestionIdx < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;
    let computedScore = 0;
    selectedQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        computedScore += 1;
      }
    });
    setScore(computedScore);
    setIsSubmitted(true);

    // Save test performance to local storage for progress tracking
    const history = JSON.parse(localStorage.getItem('student_test_scores') || '[]');
    history.push({
      quizTitle: selectedQuiz.title,
      subject: selectedQuiz.subject,
      score: `${computedScore}/${selectedQuiz.questions.length}`,
      percentage: Math.round((computedScore / selectedQuiz.questions.length) * 100),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('student_test_scores', JSON.stringify(history));
  };

  const handleRestart = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl relative z-10 flex flex-col h-[550px] border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Header banner */}
        <div className="bg-slate-950 p-5 shrink-0 border-b border-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm tracking-tight text-white">
                Veritas Mock Test Portal
              </h3>
              <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest font-bold">
                Online practice exams
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950/40">
          {!selectedQuiz ? (
            /* Choose quiz lists screen */
            <div className="space-y-6 max-w-lg mx-auto py-4">
              <div className="text-center space-y-1.5">
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
                  Evaluate Your Conceptual Strengths
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Select a practice mock paper below created by Dr. Hajeera and Prof. Arish. Receive instantaneous results, and explanations to boost your board scores.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {mockQuizzes.map(quiz => (
                  <button
                    key={quiz.id}
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full text-left p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border border-slate-100 dark:border-slate-800/80 hover:border-indigo-200 shadow-sm transition-all hover:scale-[1.01] flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        {quiz.subject} Exam
                      </span>
                      <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                        {quiz.title}
                      </h5>
                      <p className="text-[10px] text-slate-400">
                        Contains {quiz.questions.length} critical NCERT/JEE questions • Time: 5 Mins
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Testing flow active screen */
            <div className="h-full flex flex-col justify-between max-w-2xl mx-auto">
              {!isSubmitted ? (
                /* Interactive quiz taking */
                <div className="space-y-6 flex-1 flex flex-col justify-between pb-4">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between shrink-0 border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        Active Exam: {selectedQuiz.subject}
                      </span>
                      <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-100 mt-0.5">
                        {selectedQuiz.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                      Question {currentQuestionIdx + 1} of {selectedQuiz.questions.length}
                    </span>
                  </div>

                  {/* Active Question Body */}
                  <div className="flex-1 py-4 flex flex-col justify-center space-y-5">
                    <div className="flex gap-2.5 items-start">
                      <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-relaxed">
                        {selectedQuiz.questions[currentQuestionIdx].question}
                      </p>
                    </div>

                    {/* Multiple Options checklist */}
                    <div className="space-y-2.5">
                      {selectedQuiz.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                        const isSelected = userAnswers[selectedQuiz.questions[currentQuestionIdx].id] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(selectedQuiz.questions[currentQuestionIdx].id, oIdx)}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span>
                              <b className="font-mono tracking-wider mr-2 font-bold uppercase">
                                {String.fromCharCode(65 + oIdx)}.
                              </b>
                              {opt}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nav Footer Actions */}
                  <div className="flex justify-between items-center shrink-0 border-t border-slate-200/60 dark:border-slate-800/80 pt-4">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                    >
                      Previous
                    </button>

                    {currentQuestionIdx === selectedQuiz.questions.length - 1 ? (
                      <button
                        id="btn-quiz-submit"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(userAnswers).length < selectedQuiz.questions.length}
                        className="px-6 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-55 cursor-pointer shadow-md shadow-emerald-500/10"
                      >
                        Submit Answer Sheet
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer flex items-center gap-1.5"
                      >
                        Next Question
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Test completed view with correct answers breakdown and explanations */
                <div className="space-y-6 flex flex-col justify-between h-full py-2">
                  <div className="text-center space-y-2 shrink-0 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="inline-flex w-12 h-12 bg-indigo-50 dark:bg-indigo-950 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 shadow-inner">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-800 dark:text-white">
                      Mock Exam Evaluation Sheet
                    </h4>
                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {score} / {selectedQuiz.questions.length} Score
                    </p>
                    <p className="text-xs text-slate-400">
                      You scored <span className="font-bold text-indigo-600 dark:text-indigo-400">{Math.round((score / selectedQuiz.questions.length) * 100)}%</span> in our specialized test.
                    </p>
                  </div>

                  {/* Review lists scroll */}
                  <div className="flex-1 overflow-y-auto space-y-5 pr-1 py-2">
                    {selectedQuiz.questions.map((q, idx) => {
                      const userAns = userAnswers[q.id];
                      const isCorrect = userAns === q.correctAnswer;
                      return (
                        <div key={q.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3 text-xs leading-relaxed">
                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            Q{idx + 1}. {q.question}
                          </p>
                          <div className="space-y-1 text-[11px]">
                            <p className={`flex items-center gap-1.5 font-medium ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                              <span>Your answer: <b>{q.options[userAns] || 'Not answered'}</b> ({isCorrect ? 'Correct' : 'Incorrect'})</span>
                            </p>
                            {!isCorrect && (
                              <p className="text-slate-500">
                                Correct answer: <b className="text-emerald-600">{q.options[q.correctAnswer]}</b>
                              </p>
                            )}
                          </div>
                          {/* Rich explanation block */}
                          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-xl">
                            <span className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 font-mono tracking-wider">Expert Analysis:</span>
                            <p className="text-[11px] text-slate-500 mt-1">{q.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions restart */}
                  <div className="flex gap-3 shrink-0 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <button
                      onClick={handleRestart}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Subjects
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl cursor-pointer transition-colors text-center"
                    >
                      Done, Exit Test
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
