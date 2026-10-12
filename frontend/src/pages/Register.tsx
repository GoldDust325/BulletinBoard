import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // Account created. User can now log in.
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to register."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ textAlign: "center" }}>
      <h1>Create an Account</h1>

      <form
         onSubmit={handleSubmit}
         style={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "15px",
         width: "100%",
         maxWidth: "450px",
         margin: "0 auto",
        }}
    >
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </label>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </main>
  );
}

export default Register;