import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

import { fetchImages } from "../utils";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImages();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  // ボタンクリック処理
  const handleClick = async () => {
    const newImage = await fetchImages();
    setImageUrl(newImage.url);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px",
        }}
      >
        きょうのにゃんこ🐱
      </button>
      <div style={{ marginTop: 8, maxWidth: 500 }}>
        <img src={imageUrl} width="100%" height="auto" alt="猫" />
      </div>
    </div>
  );
};

export default IndexPage;
