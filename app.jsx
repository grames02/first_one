import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
import { Past_Artists as PastArtists } from "./past_artists/past_artists";
import { Top_albums as TopAlbums } from "./top_albums/top_albums";
import { Trivia_game as TriviaGame } from "./trivia_game/trivia_game";

import { MusicianContext, MusicianProvider } from "./MusicianContext";

export default function App() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [voteTotals, setVoteTotals] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);

    fetch("/api/vote-totals")
  .then(async (res) => {
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      setVoteTotals(data);
    } else {
      throw new Error("Received non-JSON response");
    }
  })
  .catch((err) => console.error("Failed to load vote totals:", err));


    // WebSocket setup
    const socket = new WebSocket("ws://localhost:4000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("Hello from the client!");
    };

    socket.onmessage = (event) => {
      console.log("Received from server:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.voteTotals) {
          setVoteTotals(data.voteTotals);
        } else {
          setMessage(event.data);
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
        setMessage(event.data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usernameInput, password: passwordInput }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.email);
        localStorage.setItem("user", data.email);
        setUsernameInput("");
        setPasswordInput("");
        window.location.reload();
      } else {
        alert("Invalid login");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
      window.location.reload();
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("/auth/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usernameInput, password: passwordInput }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.email);
        localStorage.setItem("user", data.email);
        setUsernameInput("");
        setPasswordInput("");
        window.location.reload();
      } else if (res.status === 409) {
        alert("User already exists");
        window.location.reload();
      } else {
        alert("Account creation failed");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Error creating account");
    }
  };

  const handleLogout = async () => {
    await fetch("/auth/logout", { method: "DELETE" });
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  function NotFound() {
    return (
      <main className="container-fluid bg-secondary text-center">
        <h2>404: Page Not Found</h2>
      </main>
    );
  }

  return (
    <MusicianProvider>
      <BrowserRouter>
        <div className="app bg-dark text-light">
          <header>
            <br />
            <form className="form" onSubmit={handleLogin}>
              <div>
                <span>@</span>
                <input
                  type="text"
                  onChange={(e) => setUsernameInput(e.target.value)}
                  value={usernameInput}
                  placeholder="Username"
                />
              </div>
              <div>
                <span>🔒</span>
                <input
                  type="password"
                  onChange={(e) => setPasswordInput(e.target.value)}
                  value={passwordInput}
                  placeholder="Password"
                />
              </div>
              <div className="button-line">
                {!user ? (
                  <>
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleCreate}>
                      Create
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </form>

            <h1 className="top-middle-image">
              DailyRocker.click<sup>&reg;</sup>
              <br />
              Current Logged in User:
              <br />
              {user || "None"}
            </h1>

            <nav className="nav">
              <menu className="nav">
                <li className="nav">
                  <NavLink className="nav" to="/home">
                    <img
                      src="https://png.pngtree.com/png-vector/20221108/ourmid/pngtree-cartoon-house-illustration-png-image_6434928.png"
                      width="50"
                      alt="Home"
                    />
                  </NavLink>
                </li>
                <li className="nav">
                  <NavLink className="nav" to="/top_albums">
                    <img
                      src="https://images.vexels.com/content/238073/preview/turntable-record-player-543697.png"
                      width="50"
                      alt="Top Albums"
                    />
                  </NavLink>
                </li>
                <li className="nav">
                  <NavLink className="nav" to="/past_artists">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/023/985/119/non_2x/trophy-award-cartoon-cute-isolated-clipart-free-png.png"
                      width="50"
                      alt="Past Artists"
                    />
                  </NavLink>
                </li>
                <li className="nav">
                  <NavLink className="nav" to="/trivia_game">
                    <img
                      src="https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-comic-speech-bubbles-with-text-quiz-png-image_4667086.png"
                      width="50"
                      alt="Trivia Game"
                    />
                  </NavLink>
                </li>
              </menu>
            </nav>

            <br />
            <img
              src="record_logo_ruT_icon.ico"
              width="260"
              className="top-right-image"
              alt="Record Logo"
            />
          </header>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/top_albums" element={<TopAlbums />} />
            <Route path="/past_artists" element={<PastArtists />} />
            <Route path="/trivia_game" element={<TriviaGame />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <br />

          <footer className="footer mt-5">

            {/* Display vote totals in footer */}
            {voteTotals && Object.keys(voteTotals).length > 0 && (
              <div className="vote-totals-footer">
                <h4>Live Vote Totals</h4>
                <ul>
                  {Object.entries(voteTotals).map(([artist, counts]) => (
                    <li key={artist}>
                      {artist}: Yes - {counts.yes}, No - {counts.no}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <br />
            <span className="text-reset">George Ames</span>
            <a href="https://github.com/grames02/first_one">GitHub</a>
          </footer>
        </div>
      </BrowserRouter>
    </MusicianProvider>
  );
}
