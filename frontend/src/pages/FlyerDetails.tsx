import { useEffect, useState } from "react";
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

function FlyerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedUserId = sessionStorage.getItem("userId");
  const currentUserId = storedUserId ? Number(storedUserId) : null;
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  const isOwner =
  flyer !== null &&
  currentUserId !== null &&
  flyer.created_by === currentUserId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlyer() {
      setLoading(true);
      setError(null);
      setFlyer(null);

      try {
        const response = await fetch(
          `http://localhost:3000/flyers/${id}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Flyer not found."
              : "Unable to retrieve flyer."
          );
        }

        const data: Flyer = await response.json();
        setFlyer(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchFlyer();
    } else {
      setError("No flyer ID provided.");
      setLoading(false);
    }
  }, [id]);

  async function handleDelete() {
  if (!id || !flyer || !isOwner || currentUserId === null) {
    window.alert("You can only delete your own flyers.");
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to delete this flyer? This cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/flyers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserId,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Unable to delete flyer.");
    }

    navigate("/board");
  } catch (err) {
    window.alert(
      err instanceof Error ? err.message : "Something went wrong."
    );
  }
}

  if (loading) {
  return (
    <main>
      <p>Loading flyer details...</p>
    </main>
  );
}

if (error || !flyer) {
  return (
    <main>
      <h1>{error || "Flyer not found."}</h1>
      <Link to="/board">Back to Bulletin Board</Link>
    </main>
  );
}

  return (
  <main>
    {flyer.image_url ? (
      <img
        src={flyer.image_url}
        alt={flyer.title}
        width="400"
      />
    ) : (
      <div
        style={{
          width: "400px",
          maxWidth: "100%",
          minHeight: "250px",
          backgroundColor: "#f5e6c8",
          border: "2px dashed #8b5a2b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5c3b1e",
        }}
      >
        No flyer image available
      </div>
    )}

    <h1>{flyer.title}</h1>
    <p>{flyer.description}</p>
    <p>
  Date: {flyer.event_date
    ? flyer.event_date.split("-").map((_, index, parts) =>
        index === 0 ? parts[1] : index === 1 ? parts[2] : parts[0]
      ).join("/")
    : "Not specified"}
</p>
    <p>Location: {flyer.location || "Not specified"}</p>
     {isOwner && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    }}
  >
    <Link to={`/edit/${flyer.id}`}>
  <button type="button">
    Edit Flyer
  </button>
</Link>

    <button type="button" onClick={handleDelete}>
  Delete Flyer
</button>
  </div>
)}

    <Link to="/board">Back to Bulletin Board</Link>
  </main>
);

}

export default FlyerDetails;