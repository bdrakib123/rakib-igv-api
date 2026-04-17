async function download() {
  const url = document.getElementById("url").value;
  const result = document.getElementById("result");

  result.innerHTML = "Loading...";

  try {
    const res = await fetch(`/api/download?url=${encodeURIComponent(url)}&apikey=rakib69`);
    const data = await res.json();

    if (data.status) {
      result.innerHTML = `
        <video src="${data.video}" controls width="100%"></video>
        <br><br>
        <a href="${data.video}" download>
          <button>Download Now</button>
        </a>
      `;
    } else {
      result.innerHTML = "Error: " + data.message;
    }

  } catch (err) {
    result.innerHTML = "Failed to fetch!";
  }
        }
