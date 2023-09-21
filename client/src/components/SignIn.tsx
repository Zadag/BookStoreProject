import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

type SingInData = {
  username: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SingInData>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const verifyCredentials = async () => {
    const { username, password } = formData;
    axios
      .request({
        method: "POST",

        url: "http://localhost:3001/api/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: { username, password },
      })
      .then((response) => {
        // The token will be somewhere within the response
        console.log(response.data.token); // e.g.
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          console.log("Invalid username or password");
          setErrorMessage("Invalid username or password");
        }
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here, you can add code to handle the form submission, such as sending the data to a server or performing client-side validation.
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);
    verifyCredentials();
  };

  return (
    <>
      <h1>Welcome to sign in</h1>
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      {errorMessage && <p id="error-message">{errorMessage}</p>}
    </>
  );
};

export default SignIn;
