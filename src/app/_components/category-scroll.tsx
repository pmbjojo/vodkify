import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CategoryScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollArea className="whitespace-nowrap rounded-md border">
      <div className="flex items-center gap-5 p-5 pb-7">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
