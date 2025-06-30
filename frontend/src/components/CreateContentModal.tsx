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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await axios.post(`api/v1/user/content`, { title, link });
  }

  return open ? (
    <>
      <div className="fixed w-screen h-screen opacity-60 bg-slate-900  "></div>
      <div className="fixed flex justify-center items-center bg-transparent w-screen h-screen  ">
        <div className="w-56 bg-white fixed p-4 rounded-lg flex flex-col ">
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
                    type="link"
                    placeholder="Enter your link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full  text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                Add Item
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
