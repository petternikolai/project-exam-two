import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-white bg-accent hover:bg-accent/50 font-bold py-2 px-2 rounded"
    >
      Back
    </button>
  );
}
