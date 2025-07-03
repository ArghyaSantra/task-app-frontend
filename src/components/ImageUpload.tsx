import { useState } from "react";
import axios from "../axiosInstance";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadUrl(res.data.url);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }
  };

  return (
    <div
      style={{ padding: "10px", border: "1px solid #ccc", margin: "1rem 0" }}
    >
      <h3>Upload Image</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ height: "100px", marginTop: "10px" }}
        />
      )}
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      {uploadUrl && (
        <div>
          <p>✅ Uploaded Image:</p>
          <img src={uploadUrl} alt="uploaded" style={{ height: "100px" }} />
          <p>
            <small>{uploadUrl}</small>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
