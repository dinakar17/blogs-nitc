import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import siteMetadata from "../../data/siteMetadata";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type BlogId = string;

const Giscus = ({ blogId }: { blogId: BlogId }) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true);
  const { authData } = useSelector((state: RootState) => state.user);
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ""
      ? theme === "dark" || resolvedTheme === "dark"
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL;

  const COMMENTS_ID = "comments-container";

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false);

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo!);
    script.setAttribute('data-repo-id', repositoryId!)
    // script.setAttribute("data-repo-id", blogId);
    script.setAttribute("data-category", category!);
    script.setAttribute("data-category-id", categoryId!);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-reactions-enabled", reactions);
    script.setAttribute("data-emit-metadata", metadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-lang", lang);
    script.setAttribute("data-theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [commentsTheme, blogId]);

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    LoadComments();
  }, [LoadComments]);

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && (
        <button
          onClick={() => {
            if (authData) {
              LoadComments();
            } else {
              toast.error("Please login to view comments");
            }
          }}
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-4 rounded-full shadow-md"
        >
          Load Comments
        </button>
      )}
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;
