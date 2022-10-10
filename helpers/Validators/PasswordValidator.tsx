import React from 'react'


export const PasswordValidator = ((password: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    // const regex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    // just check only whether the password length is minium of 6 characters
    const regex = /^(?=.{6,})/;

    const re = new RegExp(regex);
    if (re.test(password)) {
      setError("");
    } else if (password.length < 6) {
      setError("Password should be at least 6 characters long");
    } else if (password.includes(" ")) {
      setError("Password should not contain spaces");
    }
    //  else if (!password.match(/[a-z]/g)) {
    //   setError("Password should contain at least one lowercase letter");
    // } else if (!password.match(/[A-Z]/g)) {
    //   setError("Password should contain at least one uppercase letter");
    // } else if (!password.match(/[0-9]/g)) {
    //   setError("Password should contain at least one number");
    // } else if (!password.match(/[!@#\$%\^&\*]/g)) {
    //   setError(
    //     "Password should contain at least one special character"
    //   );
    // }
});

export const ConfirmPasswordValidator = ((password: string, confirmPassword: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    if (password === confirmPassword) {
      setError("");
    } else {
      setError("Passwords do not match");
    }
});

