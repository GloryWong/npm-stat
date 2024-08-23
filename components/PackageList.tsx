import { fetcher } from "@/utils/fetcher";
import { Chip, Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { Key } from "react";
import useSWR from "swr";

interface Package {
  name: string
  version: string
  description: string
}

export default function PakcageList({ userName, onSelect }: { userName: string, onSelect: (name: Key) => void }) {
  const { data, error, isLoading } = useSWR<Package[]>(`/api/packages/${userName}`, fetcher);

  if (error) return <div className='text-red-500'>Failed to load data {JSON.stringify(error.message)}</div>;
  if (isLoading) return <Spinner />;

  return (
    <Listbox variant="bordered" onAction={onSelect} selectionMode="single">
      { 
        (data ?? []).map(v => (
          <ListboxItem key={v.name} title={
            <div className="flex items-center gap-2">
              <Chip>{v.name}</Chip>
              <Chip variant="flat" size="sm">{v.version}</Chip>
            </div>
            } description={v.description} />
        ))
      }
    </Listbox>
  );
}
