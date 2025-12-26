import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadDocumentMutation } from "@/services/api/rag";
import { ThemeToggle } from "@/components/common";

export default function UploadContainer() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadDocument, { isLoading: uploading }] = useUploadDocumentMutation();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadDocument(formData).unwrap();

      // Success - navigate to chat in RAG mode
      navigate("/chat", { state: { mode: "rag" } });
    } catch (err: any) {
      setError(err?.data?.message || "Failed to upload PDF. Please try again.");
    }
  };

  const handleSkip = () => {
    navigate("/chat", { state: { mode: "rag" } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#212121] flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Upload Your PDF Document
        </h1>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`bg-white dark:bg-[#2f2f2f] border-2 border-dashed rounded-lg p-12 transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50 dark:bg-[#3a3a3a]"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {file ? (
              <div className="mb-4">
                <p className="text-gray-900 dark:text-white font-medium">{file.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-900 dark:text-white mb-2">
                  Drag and drop your PDF file here, or
                </p>
                <label className="cursor-pointer text-blue-500 hover:text-blue-400">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-900/50 border border-red-500 rounded-lg p-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {uploading ? "Uploading..." : "Upload & Continue"}
          </button>

          <button
            onClick={handleSkip}
            disabled={uploading}
            className="flex-1 bg-gray-200 dark:bg-[#2f2f2f] hover:bg-gray-300 dark:hover:bg-[#3a3a3a] disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
          >
            Skip for Now
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-4">
          Supported format: PDF (Max 10MB)
        </p>
      </div>
    </div>
  );
}
