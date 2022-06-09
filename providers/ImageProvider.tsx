import React from "react";
import Image from "next/image";

type Props = {
  alt: string;
  height: any | undefined;
  width: any | undefined;
  className: string;
  layout: LayoutProps | undefined;
  src: string;
  props: any;
};

enum LayoutProps {
  fixed = "fixed",
  responsive = "responsive",
  fill = "fill",
  raw = "raw",
}

export default function ImageProvider({
  alt,
  height = undefined,
  width = undefined,
  className,
  layout,
  ...props
}: Props) {
  const [src, setSrc] = React.useState(props.src);
  return (
    <>
      <Image
        {...props}
        src={props.src}
        alt={alt}
        onError={() => setSrc("/assets/images/image-error.png")}
        blurDataURL="/assets/images/image-placeholder.png"
        layout={layout}
        {...(layout != "fill" ? { height, width } : {})}
        className={className}
        unoptimized
      />
    </>
  );
}
