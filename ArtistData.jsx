import React, { createContext, useEffect, useState } from "react";

export const ArtistDataContext = createContext();

export const artistData = {
    "Billy Joel": {
      bio: "An American Singer/Songwriter nicknamed the Piano Man.",
      album: "The Stranger",
      triviaQuestion: "Billy Joel said an error on his first album made him sound like what animal?",
      triviaAnswer: "Chipmunk",
      imageUrl: "https://www.rollingstone.com/wp-content/uploads/2025/03/billy-joel-doc.jpg",
      spotifyUrl: "https://open.spotify.com/embed/track/70C4NyhjD5OZUMzvWZ3njJ?si=xIfPCFlkQcilW_Zznwglaw",
    },

    "The Beatles": {
      bio: "The Four Lads From Liverpool who changed the world of music forever.",
      album: "Abbey Road",
      triviaQuestion: "What Beatles song is written regarding the Civil Rights movement in the United States?",
      triviaAnswer: "Blackbird",
      imageUrl: "https://variety.com/wp-content/uploads/2023/11/RS317_18_1969-1.jpg",
      spotifyUrl: "https://open.spotify.com/embed/track/2EqlS6tkEnglzr7tkKAAYD?si=JHDR4Xj-TLqkkr0Sc7vE7Q",
    },

    "Oasis": {
    bio: "The classic 1990's British Rock Band.",
    album: "Definitely Maybe",
    triviaQuestion: "What year did the brothers break up?",
    triviaAnswer: "2009",
    imageUrl: "https://d3i6fh83elv35t.cloudfront.net/static/2024/08/2024-08-27T072221Z_1576757315_RC26O9A7T1N2_RTRMADP_3_MUSIC-OASIS-1024x628.jpg",
    spotifyUrl: "https://open.spotify.com/embed/track/17z8eLCkciVamEqXJS6Ri8?si=a_uJ4fjGRCmJ4mTf4zkF7Q",
    },

    "Bruce Springsteen": {
        bio: "He's the Boss. Nothing more to say.",
        album: "Born In The USA",
        triviaQuestion: "One of Bruce Springsteens albums is named after an American State. What is that album?",
        triviaAnswer: "Nebraska",
        imageUrl: "https://www.rollingstone.com/wp-content/uploads/2025/04/Springsteen-Tracks-II-Announcement.jpg?w=1581&h=1054&crop=1",
        spotifyUrl: "https://open.spotify.com/embed/track/7FwBtcecmlpc1sLySPXeGE?si=xfLJd8WBSMGNumlcpGHpqw",
        },
        
    "The Beach Boys": {
        bio: "The Surfer Rockers from the USA.",
        album: "Pet Sounds",
        triviaQuestion: "What Beach Boys album was scrapped and released as a 'toned-down' version?",
        triviaAnswer: "Smile",
        imageUrl: "https://people.com/thmb/C0WS3WboJYJDnwl05GbWzEe6dQ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x359:1001x361)/beach-boys-1-ac85df6fc01644bfb2be6890c20671d5.jpg",
        spotifyUrl: "https://open.spotify.com/embed/track/17QTsL4K9B9v4rI8CAIdfC?si=XD68MeehSeabI20IXq2Tiw",
        },

    "The Killers": {
        bio: "Inspired by the likes of 'The Cars' and 'U2', they're good ol' Rock & Roll.",
        album: "Hot Fuss",
        triviaQuestion: "They got their name for the band from the music video for what song?",
        triviaAnswer: "Crystal",
        imageUrl: "https://i.scdn.co/image/ab6761610000e5eb207b21f3ed0ee96adce3166a",
        spotifyUrl: "https://open.spotify.com/embed/track/003vvx7Niy0yvhvHt4a68B?si=lll3UdtpRPeB0P9EZXOUBQ",
        },

    "Electric Light Orchestra": {
        bio: "An Orchestra equal parts Rock and Classical, and 100% awesome.",
        album: "Out of The Blue",
        triviaQuestion: "How many weeks did it take Jeff Lynne to write 'Out of The Blue' (note: this goes down to a half)?",
        triviaAnswer: "3.5",
        imageUrl: "https://www.liveabout.com/thmb/eZska3uW5Fp-IH_EUDD3MuazNYc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/elo-56ac58673df78cf772b61c71.jpg",
        spotifyUrl: "https://open.spotify.com/embed/track/2RlgNHKcydI9sayD2Df2xp?si=jEYB1uViS1ysgggS9LJ18g",
        },

    "Michael Jackson": {
        bio: "The self-proclaimed King of Pop!",
        album: "Thriller",
        triviaQuestion: "How old was Michael Jackson when he made his first record?",
        triviaAnswer: "9",
        imageUrl: "https://preen.ph/files/2018/08/MJackson.png",
        spotifyUrl: "https://open.spotify.com/embed/track/7J1uxwnxfQLu4APicE5Rnj?si=mQ0-OSFTTnOEZcpX9JKC_A",
        },

    "Fleetwood Mac": {
        bio: "One of the greatest bands of the 1970's.",
        album: "Rumours",
        triviaQuestion: "How many number 1 hits did Fleetwood Mac have?",
        triviaAnswer: "1",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Fleetwood_Mac_Billboard_1977.jpg",
        spotifyUrl: "https://open.spotify.com/embed/track/5TDZyWDfbQFQJabbPwImVY?si=qx-3GXgaSR-F4ysUd_zkHA",
        },

    "Simon and Garfunkel": {
        bio: "The duo that inspired millions.",
        album: "Bridge Over Troubled Water",
        triviaQuestion: "What were Simon & Garfunkel known as originally?",
        triviaAnswer: "Tom & Jerry",
        imageUrl: "https://twostorymelody.com/wp-content/uploads/2024/03/simon.jpeg",
        spotifyUrl: "https://open.spotify.com/embed/track/6QhXQOpyYvbpdbyjgAqKdY?si=2Dso0yL8RAiSYnYp6TTgMg",
        },
  };
  