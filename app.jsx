import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { MusicianProvider } from "./MusicianContext";
import { artistData, ArtistDataContext } from "./ArtistData";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
import { Past_Artists } from "./past_artists/past_artists";
import { Top_albums } from "./top_albums/top_albums";
import { Trivia_game } from "./trivia_game/trivia_game";

export default function App() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[usernameInput] === passwordInput) {
      localStorage.setItem("user", usernameInput);
      setUser(usernameInput);
      setUsernameInput("");
      setPasswordInput("");
      window.location.reload();
    } else {
      alert("Invalid login");
    }
  };

  const handleCreate = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[usernameInput]) {
      alert("User already exists");
      return;
    }
    users[usernameInput] = passwordInput;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", usernameInput);
    setUser(usernameInput);
    setUsernameInput("");
    setPasswordInput("");
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <ArtistDataContext.Provider value={artistData}>
        <MusicianProvider>
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
                      <button type="button" onClick={handleCreate}>Create</button>
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
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/top_albums" element={<Top_albums />} />
              <Route path="/past_artists" element={<Past_Artists />} />
              <Route path="/trivia_game" element={<Trivia_game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <br />

            <footer>
              <br />
              <span className="text-reset">George Ames</span>
              <a href="https://github.com/grames02/first_one">GitHub</a>
            </footer>
          </div>
        </MusicianProvider>
      </ArtistDataContext.Provider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
