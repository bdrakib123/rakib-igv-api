async function download() {
  const url = document.getElementById("url").value;
  const result = document.getElementById("result");

  result.innerHTML = "Loading...";

  try {
    const res = await fetch(`/api/download?url=${encodeURIComponent(url)}&apikey=rakib69`);
    const data = await res.json();

    if (data.status) {
      result.innerHTML = `
        <video src="${data.media}" controls width="100%"></video>
        <br><br>
        <button onclick="downloadFile('${data.media}')">
          Download Now
        </button>
        <p id="loading"></p>
      `;
    } else {
      result.innerHTML = "Error: " + data.message;
    }

  } catch (err) {
    result.innerHTML = "Failed to fetch!";
  }
}


// 🔽 Download with loading
async function downloadFile(url) {
  const loading = document.getElementById("loading");

  loading.innerText = "Downloading...";

  try {
    const res = await fetch(`/api/download-file?url=${encodeURIComponent(url)}&apikey=rakib69`);

    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();

    const a = document.createElement("a");
    const fileUrl = window.URL.createObjectURL(blob);

    a.href = fileUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(fileUrl);

    loading.innerText = "Download complete ✅";

  } catch (err) {
    loading.innerText = "Download failed ❌";
  }
}
