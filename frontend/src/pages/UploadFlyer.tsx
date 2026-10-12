import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


function UploadFlyer() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("General");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");

  const storedUserId = sessionStorage.getItem("userId");
  const userId = Number(storedUserId);

  if (!storedUserId || !Number.isInteger(userId) || userId <= 0) {
    setError("Please log in before uploading a flyer.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:3000/flyers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        event_date: eventDate,
        location,
        image_url: imageUrl || null,
        created_by: userId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to create flyer.");
    }

    navigate("/board");
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main style={{ textAlign: "center" }}>
      <h1>Upload a Flyer</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Flyer title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
            required
          />
        </label>

        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </label>

        <label>
         Category
         <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="General">General</option>
          <option value="Academic">Academic</option>
          <option value="Clubs">Clubs & Organizations</option>
          <option value="Events">Campus Events</option>
          <option value="Other">Other</option>
        </select>
      </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/flyer.jpg"
          />
        </label>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving Flyer..." : "Upload Flyer"}
        </button>
      </form>

      <Link to="/board">Back to Bulletin Board</Link>
    </main>
  );
}

export default UploadFlyer;