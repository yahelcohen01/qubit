import React, { useState, useEffect } from "react";
import { Activity } from "@shared/types";
import { Carousel } from "../carousel";
import Activities from "@/data/activities.json";

const ActivityCard = ({
  activity,
  featured = false,
}: {
  activity: Activity;
  featured?: boolean;
}) => {
  const formatDate = (date?: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getLocationText = () => {
    if (activity.location?.name === "Online") return "Online";
    return activity.location?.name?.split(",")[0] || "TBA";
  };

  if (featured) {
    return (
      <div className="relative rounded-3xl overflow-hidden h-[500px] group cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%), url(${activity.imageUrl})`,
          }}
        />
        <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
          <div className="text-cyan-400 text-sm mb-3 flex items-center gap-2">
            {formatDate(activity.date)} • {getLocationText()}
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-light mb-4 leading-tight">
            {activity.title}
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-6 line-clamp-2">
            {activity.description}
          </p>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full w-fit transition-colors">
            More details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-900/50 transition-colors cursor-pointer group">
      <img
        src={activity.imageUrl}
        alt={activity.title}
        className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-cyan-400 text-xs mb-1">
          {formatDate(activity.date)} • {getLocationText()}
        </div>
        <h3 className="text-white text-lg font-normal mb-2 group-hover:text-cyan-400 transition-colors">
          {activity.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {activity.description}
        </p>
      </div>
    </div>
  );
};

export const ActivitiesSection2 = () => {
  const activities: Activity[] = Activities;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            ACTIVITIES
          </div>
          <h1 className="text-4xl md:text-6xl font-light">
            Qubit <span className="text-gray-600">events</span>
          </h1>
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <Carousel
            items={activities}
            variant="slides"
            navigation="dots"
            navigationClassName="bg-white hover:bg-white/20"
          />
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-full mt-8 transition-colors">
            Explore all activities
          </button>
        </div>

        {/* Desktop: Featured + List */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {/* Featured Event */}
          <div>
            <ActivityCard activity={activities[0]} featured />
          </div>

          {/* List of Events */}
          <div className="flex flex-col">
            <div className="space-y-2 flex-1">
              {activities.slice(1).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
            <button className="bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-full mt-6 transition-colors">
              Explore all activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type UploadResponse = {
  url?: string;
  pathname?: string;
  error?: string;
};

export function ActivitiesSection() {
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

      // Create preview
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
      // Convert file to base64
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

        // Reset form after 2 seconds
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
        {/* Folder Selection */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Folder
          </label>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="events">qubit-images</option>
            <option value="activities">Activities</option>
            <option value="gallery">Gallery</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* File Input */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Image File
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white cursor-pointer file:cursor-pointer file:bg-cyan-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded focus:outline-none focus:border-cyan-400 disabled:opacity-50"
          />
        </div>

        {/* Preview */}
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

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {uploadedUrl && (
          <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200 text-sm">
            ✓ Uploaded successfully!
            <div className="mt-2 p-2 bg-gray-800 rounded text-xs text-gray-300 break-all">
              {uploadedUrl}
            </div>
          </div>
        )}

        {/* Submit Button */}
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
