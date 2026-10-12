import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


  type Flyer = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  event_date: string | null;
  image_url: string | null;
  created_by: number;
};

function BulletinBoard() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlyers() {
      try {
        const response = await fetch("http://localhost:3000/flyers");

        if (!response.ok) {
          throw new Error("Unable to retrieve flyers.");
        }

        const data: Flyer[] = await response.json();
        setFlyers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFlyers();
  }, []);

  return (
    <main style={{ textAlign: "center" }}>
      <h1 className="board-title" style={{ fontSize: "80px" }}>Campus Bulletin Board</h1>

      <Link to="/upload" style={{margin: "0 auto", padding: "14px 32px", fontSize: "20px", width: "220px"}}>Upload Flyer</Link>

      <section>
        {loading && <p>Loading flyers...</p>}

        {error && (
          <p style={{ color: "red" }}>
            Error: {error}
          </p>
)}

{!loading && !error && flyers.length === 0 && (
  <p>No flyers available yet.</p>
)}
{flyers.map((flyer) => (
    <article key={flyer.id}>
        <Link to={`/flyers/${flyer.id}`}>
          {flyer.image_url ? (
  <img
    src={flyer.image_url}
    alt={flyer.title}
    width="200"
  />
) : (
  <div
    style={{
      width: "200px",
      minHeight: "150px",
      backgroundColor: "#f5e6c8",
      border: "2px dashed #8b5a2b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      color: "#5c3b1e",
    }}
  >
    No flyer image available
  </div>
)}

              <h2>{flyer.title}</h2>
              <p>{flyer.description}</p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default BulletinBoard;