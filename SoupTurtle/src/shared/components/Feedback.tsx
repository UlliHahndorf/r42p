import { Alert } from "@mui/material";

type Props = {
  text: string;
  level: 'error' | 'warning' | 'info' | 'success'
};

const Feedback: React.FC<Props> = ({ text, level }) => {
  return (
    <Alert severity={level}>{text}</Alert>
  );
};

export default Feedback;
