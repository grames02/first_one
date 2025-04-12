import React, { useContext, useState } from 'react'; // Don't forget to import useContext
import './trivia_game.css';
import { MusicianContext } from "../MusicianContext"; // Make sure you're accessing the context
import { artistData } from "../ArtistData"; // Import the artistData object

export function Trivia_game() {
  // Accessing the musician name from the MusicianContext
  const { musician } = useContext(MusicianContext);
  
  // Access the artist data for the selected musician
  const artistInfo = artistData[musician];

  // State to store the user's answer and feedback
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer.toLowerCase() === artistInfo.triviaAnswer.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect. The correct answer was: ${artistInfo.triviaAnswer}`);
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>{musician} Trivia Game</h1>
      <br />
      <br />
      {/* Display trivia question dynamically based on the selected musician */}
      <h2>{artistInfo.triviaQuestion}</h2>
      <br />
      <br />
      <div>
        <span>Your Response: </span>
        <input 
          type="text" 
          placeholder="enter here" 
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)} // Update state with user input
        />
      </div>
      <br />
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Display feedback after submitting the answer */}
      {feedback && <p>{feedback}</p>}
      <br />
      <br />
      <br />
      <br />
    </main>
  );
}
