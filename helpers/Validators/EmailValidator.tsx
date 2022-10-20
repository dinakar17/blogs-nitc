export const EmailValidator = (
  email: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  // const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // check whether the email is valid and ends with "@nitc.ac.in"
  const regex = /^([a-zA-Z0-9_\-\.]+)@nitc\.ac\.in$/;
  const re = new RegExp(regex);
  if (re.test(email)) {
    setError("");
  } else {
    setError("Please enter a valid NITC email");
  }
};

// Note: https://regex101.com/ is a great tool to test your regex
