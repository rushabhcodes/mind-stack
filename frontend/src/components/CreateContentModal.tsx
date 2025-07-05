import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
export default function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`api/v1/user/content`, { title, link, description });
      // Reset form
      setTitle("");
      setLink("");
      setDescription("");
      // Auto close modal after successful submission
      onClose();
    } catch (error) {
      console.error("Error creating content:", error);
    } finally {
      setLoading(false);
    }
  }

  return open ? (
    <>
      <div 
        className="fixed w-screen h-screen opacity-60 bg-slate-900 cursor-pointer" 
        onClick={onClose}
      ></div>
      <div className="fixed flex justify-center items-center bg-transparent w-screen h-screen">
        <div className="w-96 bg-white fixed p-6 rounded-lg flex flex-col shadow-lg">
          <div
            onClick={onClose}
            className="cursor-pointer flex justify-end pb-2"
          >
            <CrossIcon size="md" />
          </div>
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    type="title"
                    placeholder="Enter your title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium  mb-2"
                  >
                    Link
                  </label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="Enter your link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter a description (supports rich text formatting)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You can use **bold**, *italic*, and other markdown formatting
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                size="lg"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
