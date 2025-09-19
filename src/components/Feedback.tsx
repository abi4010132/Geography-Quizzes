import React from "react";

type FeedbackProps = {
  correct: boolean;
  message: string;
};

const Feedback: React.FC<FeedbackProps> = ({ correct, message }) => {
  const className = correct ? "feedback correct" : "feedback incorrect";
  return <p className={className}>{message}</p>;
};

export default Feedback;