// components/Image.js
import NextImage from "next/image";

const customLoader = ({ src }: { src: any }) => {
  return src;
};

export default function Image(props: any) {
  return <NextImage {...props} loader={customLoader} />;
}
