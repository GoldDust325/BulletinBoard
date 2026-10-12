import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type Flyer = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  created_by: number;
};

function EditFlyer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const storedUserId = sessionStorage.getItem("userId");
  const currentUserId = storedUserId ? Number(storedUserId) : null;
  const [flyerOwnerId, setFlyerOwnerId] = useState<number | null>(null);

const isOwner =
  currentUserId !== null &&
  flyerOwnerId !== null &&
  currentUserId === flyerOwnerId;

  useEffect(() => {
    async function loadFlyer() {
      try {
        const response = await fetch(
          `http://localhost:3000/flyers/${id}`
        );

        if (!response.ok) {
          throw new Error("Unable to load flyer.");
        }

        const flyer: Flyer = await response.json();
        setFlyerOwnerId(flyer.created_by);

        setTitle(flyer.title);
        setDescription(flyer.description ?? "");
        setCategory(flyer.category ?? "General");
        setEventDate(flyer.event_date ?? "");
        setLocation(flyer.location ?? "");
        setImageUrl(flyer.image_url ?? "");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadFlyer();
    } else {
      setError("No flyer ID provided.");
      setLoading(false);
    }
  }, [id]);

  return (
    <main style={{ textAlign: "center" }}>
      <h1>Edit Flyer</h1>

      {loading ? (
        <p>Loading flyer...</p>
      ) : error ? (
        <p role="alert" style={{ color: "red" }}>{error}</p>
      ) : (
        <form
  onSubmit={(event) => event.preventDefault()}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    maxWidth: "450px",
    margin: "20px auto",
  }}
>
  <label>
    Flyer Title
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

  <button type="submit" disabled>
    Save Changes
  </button>
</form>
      )}

      <Link to={`/flyers/${id}`}>Back to Flyer Details</Link>
    </main>
  );
}

export default EditFlyer;