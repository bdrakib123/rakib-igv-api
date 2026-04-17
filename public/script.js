async function download() {
  const url = document.getElementById("url").value;
  const result = document.getElementById("result");

  result.innerHTML = `
  <video src="${data.media}" controls width="100%"></video>
  <br><br>
  <a href="/api/download-file?url=${encodeURIComponent(data.media)}&apikey=rakib69">
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
