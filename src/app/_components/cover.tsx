import React from "react";
import NextImage from "next/image";
import { type Image } from "@spotify/web-api-ts-sdk";

export default function Cover({
  className,
  image,
  size,
}: Readonly<{
  className?: string;
  image: Image | undefined;
  size?: number;
}>) {
  if (!image) return null;
  return (
    <NextImage
      className={`rounded-lg ${className}`}
      src={image.url}
      alt="albumcover"
      placeholder="empty"
      height={size ?? image.height}
      width={size ?? image.width}
    />
  );
}
