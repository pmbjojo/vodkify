import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CategoryCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-5">{children} </CardContent>
    </Card>
  );
}
