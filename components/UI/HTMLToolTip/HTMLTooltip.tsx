import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Image from "next/image";
import { contentfulLoader } from "../../../helpers/ImageURL/contentFulLoader";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

type Props = {
  children: React.ReactElement<any, any>;
  name: string;
  photo?: string;
  bio?: string;
};

const CustomizedTooltip = ({ children, name, photo, bio }: Props) => {
  let content;
  switch (name) {
    case "description":
      content = (
        <>
          {"Description is a short summary of your post. It will be shown in "}
          <strong>{"post preview"}</strong>
          {" and in search results."}
        </>
      );
      break;
    case "featuredImage":
      content = (
        <>
          {
            "Featured image helps your post to stand out and get more attention. Moreover, it will be shown in "
          }
          <strong>{"post preview"}</strong>
        </>
      );
      break;
    case "branch":
      content = (
        <>
          {
            "Branch is the category of your post. Adding a branch helps relevant users to find your post easily. Besides, it is also "
          }
          <strong>{"used to filter posts"}</strong>
          {" in the blogs section."}
        </>
      );
      break;
    case "tags":
      content = (
        <>
          {"Tags improve the search results for your post. Since "}
          <strong>{"tags are used to filter posts"}</strong>
          {", adding relevant tags will help users to find your post easily."}
        </>
      );
      break;
    case "anonymous":
      content = (
        <>
          {
            "Anonymous posts are posts that are created by users without revealing their identity. "
          }
        </>
      );
      break;
    case "author":
      content = (
        <>
          <div className="relative w-48 h-48 ">
            <Image
              src={photo!}
              loader={contentfulLoader}
              alt="author image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="pt-1 text-sm">{bio!}</p>
        </>
      );
  }

  return (
    <HtmlTooltip placement="right-end" title={content}>
      <div
        className={`cursor-pointer ${
          name === "author" ? "" : "invisible lg:visible"
        }`}
      >
        {children}
      </div>
    </HtmlTooltip>
  );
};

export default CustomizedTooltip;
