import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function SearchCard({
  href,
  title,
  description,
  content,
  actions,
}: Readonly<{
  href: string;
  title: React.ReactNode;
  description: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
}>) {
  return (
    <Link href={href}>
      <Card className="transition duration-200 hover:scale-105 hover:shadow-2xl ">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        {actions && <CardFooter className="gap-3">{actions}</CardFooter>}
      </Card>
    </Link>
  );
}
