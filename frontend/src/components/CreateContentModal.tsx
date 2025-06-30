import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const CreateContentModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
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
            <Input type="text" placeholder="Title" />
            <Input type="text" placeholder="Link" />
            <Button >foreground</Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};
