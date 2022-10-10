import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "styles/Like.module.css";
import { KeyedMutator } from "swr";
import * as api from "../../../api";
import { RootState } from "../../../store/store";

type LikeProps = {
  blogId: string;
  token: string;
  likes: Array<string>;
  mutate: KeyedMutator<any>;
};

const LikeUI = ({ blogId, token, likes, mutate }: LikeProps) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const heartRef = React.useRef<HTMLDivElement>(null);
  const {authData} = useSelector((state: RootState) => state.user);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (likes.includes(authData?._id)) {
      heartRef.current?.classList.add(styles["heart-active"]);
      contentRef.current?.classList.add(styles["heart-active"]);
    } else {
      heartRef.current?.classList.remove(styles["heart-active"]);
      contentRef.current?.classList.remove(styles["heart-active"]);
    }
  }, [likes]);

  const handleClick = async () => {
    try {
      await api.likePost(blogId, config);
      // mutate() will trigger a revalidation (and re-render) of the data
      // https://swr.vercel.app/docs/mutation
      mutate();

      if (contentRef.current) {
        contentRef.current.classList.toggle(styles["heart-active"]);
      }
      if (heartRef.current) {
        heartRef.current.classList.toggle(styles["heart-active"]);
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err);
      }
    }
  };

  return (
    <div className="cursor-pointer relative mx-auto w-20 h-20 flex">
      <div className={`$cursor-pointer`} onClick={handleClick}>
        <span className={styles.heart} ref={heartRef}></span>
      </div>
    </div>
  );
};

export default LikeUI;
