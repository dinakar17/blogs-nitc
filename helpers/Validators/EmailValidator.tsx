export const EmailValidator = (
  email: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  // regex to check whether the email is valid or not
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const re = new RegExp(regex);
  if (re.test(email)) {
    setError("");
  } else {
    setError("Invalid Email. Please enter a valid email");
  }
};
