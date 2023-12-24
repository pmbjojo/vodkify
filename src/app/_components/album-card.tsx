import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { type SimplifiedAlbum } from "@spotify/web-api-ts-sdk";
import NextImage from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AlbumCard({
  album,
}: Readonly<{ album: SimplifiedAlbum }>) {
  return (
    <Link href={`/album/${album.id}`}>
      <Card className="transition duration-200 hover:scale-105 hover:shadow-2xl ">
        <CardHeader>
          <CardTitle>{album.name}</CardTitle>
          <CardDescription>
            {album.artists.map((artist) => (
              <Badge key={artist.id} className="m-1">
                {artist.name}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        {album.images[0] ? (
          <CardContent>
            <NextImage
              className="h-72 w-72"
              src={album.images[0].url}
              alt="albumcover"
              height={album.images[0].height}
              width={album.images[0].width}
            />
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}
