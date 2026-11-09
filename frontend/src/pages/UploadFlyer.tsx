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
  const [imageFile, setImageFile] = useState<File | null>(null);
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
const formData = new FormData();

formData.append("title", title);
formData.append("description", description);
formData.append("category", category);
formData.append("event_date", eventDate);
formData.append("location", location);
formData.append("created_by", String(userId));

if (imageFile) {
  formData.append("image", imageFile);
}

const response = await fetch("http://localhost:3000/flyers", {
  method: "POST",
  body: formData,
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
    <main className="upload-page">
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
        Flyer image
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setImageFile(event.target.files?.[0] ?? null)
          }
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