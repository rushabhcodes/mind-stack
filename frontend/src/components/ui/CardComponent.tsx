import { ShareIcon } from "../../icons/ShareIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { YoutubeIcon } from "../../icons/Youtube";
import { TwitterIcon } from "../../icons/Twitter";

interface CardProps {
  title: string;
  link: string;
  type?: "twitter" | "youtube";
}

export const CardComponent = (props: CardProps) => {
  return (
    <div className="m-4 p-6 rounded-2xl shadow-2xl border bg-white border-slate-100 font-serif text-bold max-w-96">
      <div className="flex justify-between pb-4">
        <div className="flex gap-2">
          <div className="text-black-500">
            {props.type == "twitter" && <TwitterIcon size="md" />}</div>
            <div className ="text-red-500">
            {props.type == "youtube" && <YoutubeIcon size="md" />}
          </div>
          <div>{props.title}</div>
        </div>
        <div className="flex gap-2 text-black-500">
          <ShareIcon size="md" />
          <TrashIcon size="md" />
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
          <>
            <blockquote className="twitter-tweet">
              <a href="https://twitter.com/rushabhstwt/status/1698522302890057737"></a>
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
};
