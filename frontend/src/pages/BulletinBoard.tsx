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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPastFlyers, setShowPastFlyers] = useState(false);
  const username = sessionStorage.getItem("username");


async function handleLogout() {
    try {
        const response = await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Unable to log out.");
        }

        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed:", error);
        window.alert("Logout failed. Please try again.");
    }
}


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

const today = new Date();
const todayString = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const filteredFlyers = flyers.filter((flyer) => {
  const matchesCategory =
    selectedCategory === "All" ||
    (flyer.category ?? "General") === selectedCategory;

  const isPast =
    flyer.event_date !== null && flyer.event_date < todayString;

  const matchesDateFilter = showPastFlyers ? isPast : !isPast;

  return matchesCategory && matchesDateFilter;
});

  return (
    <main className="board-page" style={{ textAlign: "center" }}>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    gap: "15px",
  }}
>
<span className="welcome-message">
  {username ? `Welcome, ${username}!` : "Welcome, visitor!"}
</span>

  {username ? (
    <button type="button" onClick={handleLogout}>
      Log Out
    </button>
  ) : (
    <Link to="/">Log In</Link>
  )}
</div>
      <h1
  className="board-title"
  style={{
    fontSize: "80px",
    marginTop: "0",
  }}
>Campus Bulletin Board</h1>

      {username && (
  <Link
    to="/upload"
    style={{
      margin: "0 auto",
      padding: "14px 32px",
      fontSize: "20px",
      width: "220px"
    }}
  >
    Upload Flyer
  </Link>
)}

  <button
    type="button"
    onClick={() => setShowPastFlyers(!showPastFlyers)}
    style={{
      padding: "14px 32px",
      fontSize: "20px",
      width: "220px",
    }}
  >
    {showPastFlyers ? "Current Flyers" : "Past Flyers"}
  </button>


      <label className="category-filter">
        Filter by category:
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Academic">Academic</option>
          <option value="Clubs">Clubs & Organizations</option>
          <option value="Events">Campus Events</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <section>
        {loading && <p>Loading flyers...</p>}

        {error && (
          <p style={{ color: "red" }}>
            Error: {error}
          </p>
)}

{!loading && !error && filteredFlyers.length === 0 && (
  <p>No flyers available yet.</p>
)}
{filteredFlyers.map((flyer) => (
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