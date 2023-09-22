import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type SingInData = {
  username: string;
  password: string;
};

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
    const response = await login({ username, password });
    if (response === "success") navigate("/bookshelf");
    else setErrorMessage(response);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
