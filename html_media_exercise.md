HTML MEDIA:



<h2>Image</h2>
<img alt="Arches" src="https://media.wired.com/photos/633c95ef85e7a4cc2f802256/master/pass/Breath-of-the-Wild-Casual-Gamer-Culture.jpg" width="350" />

<h2>Audio</h2>
<audio controls src="https://github.com/webprogramming260/.github/blob/main/profile/html/media/htmlAudio.mp3?raw=true"></audio>

<h2>Video</h2>
<video controls width="300" crossorigin="anonymous"> <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"/>
</video>

<h2>Canvas</h2>
<canvas id="canvasDemo" width="300" height="200" style="border: 1px solid #000000"></canvas>
<script>
  const ctx = document.getElementById('canvasDemo').getContext('2d');
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'blue';
  ctx.fill();
  ctx.stroke();
</script>

<h2>SVG</h2>
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" style="border: 1px solid #000000">
  <circle cx="150" cy="100" r="50" />
</svg>
