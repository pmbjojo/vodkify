import { SearchIcon } from "lucide-react";

export default function EmptySearch() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <SearchIcon className="h-32 w-32" />
      <p className="text-center">Veuillez faire une recherche</p>
    </div>
  );
}
