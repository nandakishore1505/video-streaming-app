import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import socket from "../sockets/socket";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  // Upload video
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select a video file");
    if (!title) return alert("Enter a title");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", "Uploaded from frontend");

    try {
      await API.post("/videos/upload", formData);
      alert("Upload started!");
      setFile(null);
      setTitle("");
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Load videos on page load
 useEffect(() => {
  fetchVideos();

  socket.on("video-progress", ({ videoId, progress }) => {
    setVideos((prev) =>
      prev.map((v) =>
        v._id === videoId
          ? { ...v, processingProgress: progress }
          : v
      )
    );
  });

  socket.on("video-complete", ({ videoId, sensitivity }) => {
    setVideos((prev) =>
      prev.map((v) =>
        v._id === videoId
          ? {
              ...v,
              status: "completed",
              sensitivity,
              processingProgress: 100,
            }
          : v
      )
    );
  });

  return () => {
    socket.off("video-progress");
    socket.off("video-complete");
  };
}, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Upload Video</h3>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">Upload</button>
      </form>

      <hr />

      <h3>Your Videos</h3>

      {videos.length === 0 && <p>No videos uploaded yet.</p>}

      {videos.map((video) => (
        <div
          key={video._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 20,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <h4>{video.title}</h4>
          <p>Status: {video.status}</p>
          <p>Progress: {video.processingProgress}%</p>
          <p>Sensitivity: {video.sensitivity}</p>

          {video.status === "completed" && (
            <video
              width="500"
              controls
              src={`http://localhost:5000/api/videos/stream/${video._id}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;