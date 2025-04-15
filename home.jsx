import React, { useContext, useState, useEffect } from "react";
import { MusicianContext } from "../MusicianContext";
import { artistData } from "../ArtistData";


export function Home() {
  const { musician } = useContext(MusicianContext);
  const artistInfo = artistData[musician];

  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState({ good: 0, no: 0 });
  const [quote, setQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  // Load user + vote
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
      fetch(`/api/votes/${musician}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.vote) {
            setVotes({
              good: data.vote === "yes" ? 1 : 0,
              no: data.vote === "no" ? 1 : 0,
            });
          }
        });
    }
  }, [musician]);

  // Load inspirational quote
  useEffect(() => {
    fetch("https://quote.cs260.click")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch((err) => console.error("Failed to fetch quote", err));
  }, []);


  // Here we're handling the Vote
  const handleVote = async (voteType) => {
    if (!user) return;

    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist: musician, vote: voteType }),
    });

    if (res.ok) {
      setVotes({
        good: voteType === "yes" ? 1 : 0,
        no: voteType === "no" ? 1 : 0,
      });
    } else {
      alert("Failed to submit vote");
    }
  };

  const voteDecision = () => {
    if (votes.good === 1) return "You Voted Yes for this Artist!";
    if (votes.no === 1) return "You Voted No for this Artist!";
    return "You Haven't Voted for this Artist!";
  };

  return (
    <main className="container-fluid bg-secondary text-center text-white p-4">
      <h1>Today's Artist: {musician}</h1>
      {artistInfo && <h2 className="mb-4">– {artistInfo.bio}</h2>}

      
      {artistInfo && (
        <section>
          <img src={artistInfo.imageUrl} alt={musician} width="400" />
        </section>
      )}
      <br />

      {artistInfo && (
        <div>
          <iframe
            src={artistInfo.spotifyUrl}
            width="300"
            height="80"
            allowtransparency="false"
            allow="encrypted-media"
            title="Spotify Player"
          ></iframe>
        </div>
      )}

      {!user && <h3 className="text-warning">You must be logged in to vote!</h3>}

      <div className="mb-4">
        <button
          onClick={() => handleVote("yes")}
          disabled={!user}
          style={{ background: "transparent", border: "none", marginRight: "30px" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png"
            width="100"
            alt="Vote Yes"
            style={{ opacity: 0.85 }}
          />
        </button>

        <button
          onClick={() => handleVote("no")}
          disabled={!user}
          style={{ background: "transparent", border: "none" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eo_circle_red_arrow-down.svg/2048px-Eo_circle_red_arrow-down.svg.png"
            width="100"
            alt="Vote No"
            style={{ opacity: 0.85 }}
          />
        </button>
      </div>

      <h2>{user ? voteDecision() : "Login to vote!"}</h2>

      <section className="mt-5 p-4 bg-dark rounded">
        <h2>Enjoy an Inspirational Quote While You're Here!</h2>
        {quote && (
          <>
            <p className="fst-italic fs-4">"{quote}"</p>
            <p className="fw-bold">– {quoteAuthor}</p>
          </>
        )}
      </section>
    </main>
  );
}
