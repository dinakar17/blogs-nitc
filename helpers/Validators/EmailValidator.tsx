export const EmailValidator = (
  email: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (email.endsWith("@nitc.ac.in")) {
    setError("");
  } else {
    setError("Email should end with @nitc.ac.in");
  }
};
