import React from "react";
import Image from "next/image";

export default function Cover({
  src,
  height,
  width,
  className,
}: Readonly<{
  src?: string;
  height?: number;
  width?: number;
  className?: string;
}>) {
  if (!src || !height || !width) return;
  return (
    <Image
      className={`rounded-lg ${className}`}
      src={src}
      alt="albumcover"
      placeholder="empty"
      height={height}
      width={width}
    />
  );
}
