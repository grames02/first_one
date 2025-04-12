# DailyRocker
### The place for music lovers to come together!

## Elevator Pitch:
It's cool how everyone loves doing the wordle. Wouldn't it be neat if there was a website for music that was fun to visit like that? Daily Rocker is a website that lets people learn about musicians of the past and present. Every week a new musician will be chosen from its database, and an album will even be listed as a recommendation to the user. On top of that, users can vote on different artists and answer a fun trivia question relating to each artist. We could even give each month a theme!

## Key Features:
My website is for music educational & entertainment purposes. Every week it will feature a different musician from a particular decade (the decades will vary monthly). Along with the musicians' there will also be fun facts, a recommended album to listen to, and a fun trivia question.

## How Technology Will Be Utilized:
### HTML
Will have proper HTML formatting for the webpage, and for the additional pages (musician leaderboard, trivia game).

### CSS
Will have a simple but classic website appearance. Good look for smartphones and computers.

### React
Allow users to vote on artists they like/dislike. And the trivia question.

### Service
Backend service for login, votes, and new trivia questions.

### DB/Login
We will have the user's votes stored for the artist leaderboard.

### WebSocket
The votes will be viewable for all users on the leaderboard page.

## Early Concept of DailyRocker.com
![Screenshot 2025-01-14 201122](https://github.com/user-attachments/assets/73a1f5ac-c5fa-4000-85a4-4b449d7f50eb)


# With the HTML Deliverable
## Main Things I did:
I went into the Simon example and swapped out a lot. I mainly used the formula given and renamed things for my page. It actually worked fairly well.
I am excited to keep learning. I created sections such as Past Artists, Top Artists, and a fun Trivia Game. All of these will be more fleshed out in the future.

## Experience:
After going through the initial tasks, I downloaded the Simon files and began to become familiar with them. From looking at the layout, it all made sense to me. I decided to utilize the Simon layout for my website. They both include four pages, and I could see similarities between Simon and how I would want my website to look. So I went through and gutted out all the unnecessary code, and began to create the layout for my eventual website. This included the index page, past artist page, top artist page, and the trivia game page. My eventual goal is that users will be able to vote on these artists. I also included a link to the artist's wikipedia page and a link to one of their albums on Spotify.

One third-party resource I plan to utilize is Spotify. I think it'd be cool if you could listen to a clip of one of the artist's songs. Just a quick little sample on the page. I have yet to dive into the logistics, but it's my plan as of now.

## Realizations:
One thing I find fascinating is the organization of HTML. It makes a lot more sense than I thought it would. Oftentimes when going into the world of coding, it can be challenging to know where to begin. Or rather how to make sense of it all.

However, when it comes to HTML, it reminds me of writing an essay. The simple layout of the header, body, and footer all click with me. When writing my webpages I made sure to keep the heading and footer uniform across all three pages. While I could change the body to my liking.

## Lesson learned:
One thing that took me forever, was getting it to publish properly. I didn't see the note about PowerShell. Eventually, I finally changed the terminal and was able to publish it properly.

## Deliverable:
This is my website link: https://startup.dailyrocker.click/

# With the CSS Deliverable
## Main Things I did:
After going through all the steps listed in the instructions, I reviewed the CSS files for the Simon website. By tinkering around, I came to better understand how to use CSS with HTML.

## Experience:
My experience was fairly positive. I think the main things I struggled with was trying to center different things. Throughout the process I envisioned different features being in different spots, and initally found moving them around to be tedious. One other thing I did was find a logo that I liked for my website. I converted this image to an ico file, and set it as the logo for all my websites pages.

## Realizations:
Through this experience, I realized that the organization of HTML pages are crucial. Otherwise trying to implement CSS can be a major headache. This led me to reorganize many of the sections throughout my HTML code.

## Lesson learned:
Through this experience I realized that I want to do better at organizing my code the first time (in order to simplify the process for applying CSS elements).

## Delivarable:
Here is my website link: https://startup.dailyrocker.click/home.html
I've also included the updated code for my website pages and their css pages in different pages here on GitHub.

# Inbetween these two deliverables
## Updating my CSS for my Website
After getting feedback back for my CSS submission, I decided to make some changes per the recommendations. I went in and tried to make my navigation menu more appealing. I accomplished this by using icons for transportation that I found on Google (and implemented via img tags.)

I also went through and centered heading, and fixed the footer to all be on one line. I'm glad I did, I think it looks much better.

# With the React Phase 1 Deliverable
## Main Things I did:
First of all, I watched the Simon React part 1 video, and followed the necessary steps. Upon completion, I then went back to my code and began to go through a siliar process. At first, I tried to do it all on my own simply through memory. However, I quickly realized that wasn't a very successful strategy. So I rewatched the video, and made necessary adjustments to my own code as I went through.

## Experience:
The experience was fairly positive. I mainly utilized resources from Simon, but also had to make some changes. Specifically with things like my file names. In fact one of the challenges I was facing near the end was that my 'top_albums' page wouldn't go through to my React website. After digging deeper, I learned that it had to be Capitalized at the beginning for .jsx.

## Realizations:
I realized some other things as well. Mainly that jsx needs to be formatted in a certain way. When I was copying my html's into the respective jsx files, I kept getting a lot of errors. Many of these were due to the fact that I was using "br", when I should've been using "/br". Fixing these resulted in my code working.

I also made an error in that I forgot to set one of the routes as the default. So when I first published it, there was a 5th page (which displyed little to nothing.) I fixed this by going back into my routes, and setting the home page as the default.

## Lesson learned:
The main lesson I learned was that the devil is in the details. I know I say that a lot, but I think it's an important lesson to learn over and over again (especially within Computer Science.) I also learned that formatting is different between files (especially .jsx).

## Delivarable:
Here's the link to my website. I've also included all of my code in different files here within the repository. All of the files relating to this deliverable will be labeled: REACT 1, at the beginning.

Website link: https://startup.dailyrocker.click/
Simon Link: https://simon.dailyrocker.click/

# With the React Phase 2 Deliverable
## Disclaimer:
First off, I want to note the obvious. Yes, I am very late to this, however, I have been working on my website throughout the last week. I've been able to add just about all of the reactions I want (as of writing this, I'm just doing the finishing touches.) Lesson learned, stay on top of things, and don't fall behind. I will ensure to have all of my assignments submitted by the final deadline though. For starters, I'll go ahead and explain the main things I did below.

## Reaction Implementations, New Artist Every Day:
I went through the list of my desired specs and began to break things down one at a time. First of all, my website will require having a different Musician every day. Depending on the musician, multiple pages will change. So I decided it'd make the most sense to make one file that would select the musician, and then connect it to the main app.jsx file. For transparency, I did google to learn what functions can be utilized regarding content that changes daily. I found my answer with the syntax of: Date().

From here, I created a file known as: MusiciansContext.jsx. This file has 10 artists put into a list, and via utilizing the Date() syntax, I was able to create a function that selects a new artist from the list of 10 at random (while avoiding to choose the previous day's musician.) Once again, for transparency, I did troubleshoot with AI, but it did not write my code for me.

## Reaction Implementations, Artist Context:
From here, I knew that I wanted to provide data about each artist. So I once again made another file that I connected to app.jsx. This file was known as: ArtistData.jsx. Within this file, I made one big object that housed all of the different artist information. It utilized the same 10 artists as 'keys' to their associating data (things such as bio, trivia question, trivia answer, a url for their image, etc.) So this essentially served as the hub for all the information for each artist.

This file works in tandem with the MusiciansContext file. As that file picks a random musician for the day, the ArtistData file, will feed in all of the associating data. Also, another thing I did here was add in Spotify links. These Spotify Links enable the user to hear a snippet of the song I selected. I simply went to spotify and copied over the embedded links. They worked perfectly (as long as I included '\embed' in the url.)
