import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { type Artist } from "@spotify/web-api-ts-sdk";
import { Badge } from "@/components/ui/badge";
import ImageNext from "next/image";

export function ArtistCard({ artist }: Readonly<{ artist: Artist }>) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <Card className="h-[34rem] w-96 transition duration-200 hover:scale-105 hover:shadow-2xl">
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-1">
              {artist.genres.map((genre) => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
        {artist.images[0] ? (
          <CardContent>
            <ImageNext
              className="h-96 w-96 rounded-lg"
              src={artist.images[0].url}
              alt="albumcover"
              placeholder="empty"
              height={artist.images[0].height}
              width={artist.images[0].width}
            />
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}
