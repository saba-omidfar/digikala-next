const useOtpForm = ({ userInput }) => {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  return {
    code,
    setCode,
    timeLeft,
    setTimeLeft,
  };
};
