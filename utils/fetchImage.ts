import { Image } from "../interfaces";

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  return images[0];
};

export default fetchImage;
