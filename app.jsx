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

  // On component mount, check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser); // Set user if found in localStorage
  }, []);

  // Handle user login
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
        setUser(data.email); // Save email to state
        localStorage.setItem("user", data.email); // Save email to localStorage
        setUsernameInput(""); // Clear input
        setPasswordInput(""); // Clear input
        window.location.reload()
      } else {
        alert("Invalid login");
        window.location.reload()
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
      window.location.reload()
    }
  };

  // Handle account creation
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
        window.location.reload()
      } else if (res.status === 409) {
        alert("User already exists");
        window.location.reload()
      } else {
        alert("Account creation failed");
        window.location.reload()
      }
    } catch (err) {
      console.error(err);
      alert("Error creating account");
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await fetch("/auth/logout", { method: "DELETE" });
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload()
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
              {!user && (
                <>
                  <button type="submit">Login</button>
                  <button type="button" onClick={handleCreate}>
                    Create
                  </button>
                </>
              )}
              {user && (
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
        <footer>
          <br />
          <span className="text-reset">George Ames</span>
          <a href="https://github.com/grames02/first_one">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
    </MusicianProvider>
  );
}
