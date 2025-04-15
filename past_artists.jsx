import React, { useEffect, useState } from 'react';
import './past_artists.css';

export function Past_Artists() {
  const [voteTotals, setVoteTotals] = useState({});

  const artists = [
    { name: "Bruce Springsteen", img: "https://npr.brightspotcdn.com/dims4/default/c2c61aa/2147483647/strip/true/crop/599x596+0+0/resize/880x876!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F46%2Fda%2Ff5a5231149c8bd622cbc659f5e2f%2Ftryiimrjekgwrth2fo2a.jpg" },
    { name: "Billy Joel", img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Thestranger1977.jpg/220px-Thestranger1977.jpg" },
    { name: "The Beatles", img: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg" },
    { name: "Fleetwood Mac", img: "https://media.npr.org/assets/img/2013/01/29/highres-fleetwood-mac-rumours_sq-496d22b156d14a8c7e5fbfd77ab1d54790d019b3.jpg?s=1100&c=50&f=jpeg" },
    { name: "The Beach Boys", img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/PetSoundsCover.jpg/220px-PetSoundsCover.jpg" },
    { name: "Michael Jackson", img: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png" },
    { name: "Simon and Garfunkel", img: "https://upload.wikimedia.org/wikipedia/en/4/41/Simon_and_Garfunkel%2C_Bridge_over_Troubled_Water_%281970%29.png" },
    { name: "Oasis", img: "https://upload.wikimedia.org/wikipedia/en/d/d4/OasisDefinitelyMaybealbumcover.jpg" },
    { name: "The Killers", img: "https://upload.wikimedia.org/wikipedia/en/1/17/The_Killers_-_Hot_Fuss.png" },
    { name: "Electric Light Orchestra", img: "https://upload.wikimedia.org/wikipedia/en/5/5a/ELO-Out_of_the_Blue_Lp.jpg" },
  ];

  useEffect(() => {
    fetch("/api/vote-totals", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setVoteTotals(data))
      .catch((err) => console.error("Failed to load vote totals", err));
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Artist Scores</h1>
      <br />
      <div className='middle'>
        {artists.map((artist) => {
          const votes = voteTotals[artist.name] || { yes: 0, no: 0 };

          return (
            <div key={artist.name}>
              <div className="card">{artist.name}</div>
              <div className="card">{votes.yes} Yes / {votes.no} No</div>
              <br />
              <div className="card"><img src={artist.img} width="250" alt={artist.name} /></div>
              <br />
            </div>
          );
        })}
      </div>
    </main>
  );
}
