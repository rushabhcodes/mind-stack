import { ShareIcon } from "../../icons/ShareIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { ProjectIcon } from "../../icons/ProjectIcon";
import { YoutubeIcon } from "../../icons/Youtube";
import { TwitterIcon } from "../../icons/Twitter";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export const Card = (props: CardProps) => {
  return (
    <div className="m-4 p-6 rounded-2xl shadow-md border border-slate-100 max-w-96">
      <div className="flex justify-between pb-4">
        <div className="flex">
          <ProjectIcon size="md" />
          <div>{props.title}</div>
        </div>
        <div className="flex text-gray-500">
          <ShareIcon size="md" />
          <TrashIcon size="md" />
          <YoutubeIcon size="md" />
          <TwitterIcon size="md" />
        </div>
      </div>
      <div>
        {props.type == "youtube" && (
          <iframe
            className="w-full rounded-md"
            width="560"
            height="315"
            src={props.link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {props.type == "twitter" && (
          <><blockquote className="twitter-tweet"><a href="https://twitter.com/rushabhstwt/status/1698522302890057737"></a></blockquote></>
        )}
      </div>
    </div>
  );
};
