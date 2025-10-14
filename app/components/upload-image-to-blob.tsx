import { useState } from "react";

type UploadResponse = {
  url?: string;
  pathname?: string;
  error?: string;
};

export function UploadImageToBlob() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("qubit-images");
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];

        const response = await fetch("/api/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: base64,
            folder,
            filename: file.name,
          }),
        });

        const data: UploadResponse = await response.json();

        if (!response.ok) {
          setError(data.error || "Upload failed");
          setLoading(false);
          return;
        }

        setUploadedUrl(data.url || null);
        setFile(null);
        setPreview(null);
        setLoading(false);

        setTimeout(() => {
          setUploadedUrl(null);
        }, 5000);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Upload Image</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Folder
          </label>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="events">qubit-images</option>
            <option value="activities">Activities</option>
            <option value="gallery">Gallery</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Image File
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white cursor-pointer file:cursor-pointer file:bg-cyan-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded focus:outline-none focus:border-cyan-500 disabled:opacity-50"
          />
        </div>

        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="text-gray-400 text-xs mt-2">
              {file?.name} ({(file?.size || 0 / 1024).toFixed(2)} KB)
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {uploadedUrl && (
          <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200 text-sm">
            ✓ Uploaded successfully!
            <div className="mt-2 p-2 bg-gray-800 rounded text-xs text-gray-300 break-all">
              {uploadedUrl}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}
