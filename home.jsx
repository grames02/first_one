import React, { useContext, useState, useEffect } from 'react';
import { MusicianContext } from "../MusicianContext";
import { artistData } from "../ArtistData";

export function Home() {
  const { musician } = useContext(MusicianContext);
  const artistInfo = artistData[musician];

  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState({
    good: 0,
    no: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);

      // Load vote from localStorage for this user & artist
      const storedVote = localStorage.getItem(`${storedUser}_vote_${musician}`);
      if (storedVote) {
        setVotes(JSON.parse(storedVote));
      }
    }
  }, [musician]);

  const handleVote = (voteType) => {
    if (!user) return;
    const newVotes = {
      good: voteType === "good" ? 1 : 0,
      no: voteType === "no" ? 1 : 0,
    };
    setVotes(newVotes);
    localStorage.setItem(`${user}_vote_${musician}`, JSON.stringify(newVotes));
  };

  const voteDecision = () => {
    if (votes.good === 1) return "You Voted Yes for this Artist!";
    if (votes.no === 1) return "You Voted No for this Artist!";
    return "You Haven't Voted for this Artist!";
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Today's Artist: {musician}</h1>

      {artistInfo && <h2>-{artistInfo.bio}</h2>}
      <br />

      <section>
        {artistInfo && (
          <div>
            <img src={artistInfo.imageUrl} alt={musician} width="400" />
          </div>
        )}
      </section>
      <br />

      {artistInfo && (
        <div>
          <iframe
            src={artistInfo.spotifyUrl}
            width="300"
            height="80"
            allowtransparency="false"
            allow="encrypted-media"
          ></iframe>
        </div>
      )}
      <br />

      {!user && (
        <h3 className="text-warning">You must be logged in to vote!</h3>
      )}

      <div className="left-image" style={{ display: "inline-block", marginRight: "50px" }}>
        <button
          onClick={() => handleVote("good")}
          disabled={!user}
          style={{ background: "transparent", border: "none" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png"
            width="150"
            alt="Vote Yes"
            style={{ opacity: 0.85 }}
          />
        </button>
      </div>

      <div className="right-image" style={{ display: "inline-block" }}>
        <button
          onClick={() => handleVote("no")}
          disabled={!user}
          style={{ background: "transparent", border: "none" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eo_circle_red_arrow-down.svg/2048px-Eo_circle_red_arrow-down.svg.png"
            width="150"
            alt="Vote No"
            style={{ opacity: 0.85 }}
          />
        </button>
      </div>

      <br /><br />
      <h2>{user ? voteDecision() : "Login to vote!"}</h2>
      <br /><br />
    </main>
  );
}
