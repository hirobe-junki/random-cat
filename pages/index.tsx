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
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchImages().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);

  // ボタンクリック処理
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImages();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button className={styles.button} onClick={handleClick}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};

export default IndexPage;
