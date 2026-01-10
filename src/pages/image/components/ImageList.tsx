import { Bot, User } from "lucide-react";
import type { LocalImage } from "../hooks/useImageLogic";

interface ImageListProps {
  images: LocalImage[];
}

export default function ImageList({ images }: ImageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[rgb(var(--sidebar-bg))]">
      {images.map((img, index) => (
        <div key={index} className="space-y-4">
          {/* Prompt with User Avatar */}
          <div className="flex w-full justify-end">
            <div className="flex items-start gap-4 max-w-[70%] flex-row-reverse">
              {/* User Avatar */}
              <div className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full bg-blue-600 text-[rgb(var(--primary-text))]">
                <User className="w-4 h-4" />
              </div>
              {/* Prompt Text */}
              <div className="flex-1 pt-1">
                <p className="text-sm text-[rgb(var(--primary-text))]">{img.prompt}</p>
              </div>
            </div>
          </div>

          {/* Image with AI Avatar */}
          <div className="flex w-full justify-start">
            <div className="flex items-start gap-4 max-w-[70%]">
              {/* AI Avatar */}
              <div className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full bg-[rgb(var(--button-primary))] text-[rgb(var(--primary-text))]">
                <Bot className="w-4 h-4" />
              </div>
              {/* Image Content */}
              <div className="flex-1 pt-1">
                <div className="bg-[rgb(var(--input-bg))] rounded-lg p-4">
                  {!img.completed ? (
                    <div className="flex items-center justify-center h-64 w-64">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-[rgb(var(--button-primary))] rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-[rgb(var(--button-primary))] rounded-full animate-bounce delay-100"></div>
                        <div className="w-3 h-3 bg-[rgb(var(--button-primary))] rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  ) : img.error ? (
                    <div className="text-red-500 p-4">
                      Failed to generate image. Please try again.
                    </div>
                  ) : (
                    <img
                      src={img.image_url.startsWith('http') ? img.image_url : `${import.meta.env.VITE_BASE_URL}${img.image_url}`}
                      alt={img.prompt}
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
