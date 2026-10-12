import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    // Save the user's information for this browser tab.
    sessionStorage.setItem("userId", String(data.userId));
    sessionStorage.setItem("username", data.username);

    navigate("/board");
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Unable to log in."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main style={{ textAlign: "center" }}>
      <h1 className="board-title" style={{ fontSize: "80px" }}>Campus Bulletin Board</h1>

      <form onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
        <label className="board-title" style={{ fontSize: "40px" }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label className="board-title" style={{ fontSize: "40px" }}>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

         {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
         </p>
      )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
       <Link to="/register">Create Account</Link>
      </p>
    </main>
  );
}

export default Welcome;