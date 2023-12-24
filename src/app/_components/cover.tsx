import React from "react";
import Image from "next/image";

export default function Cover({
  src,
  height,
  width,
}: Readonly<{
  src: string;
  height: number;
  width: number;
}>) {
  return (
    <Image
      className="rounded-lg"
      src={src}
      alt="albumcover"
      placeholder="empty"
      height={height}
      width={width}
    />
  );
}