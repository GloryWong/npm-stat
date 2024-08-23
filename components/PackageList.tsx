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

  return (
    <div className="flex justify-center">
      {
        error ?
          <div className='text-red-500'>Failed to load data {JSON.stringify(error.message)}</div> :
        isLoading ?
          <Spinner /> :
        <Listbox aria-label="Package list" variant="bordered" onAction={onSelect} selectionMode="single">
          { 
            (data ?? []).map(v => (
              <ListboxItem key={v.name} textValue={v.name} title={
                <div className="flex items-center gap-2">
                  <Chip>{v.name}</Chip>
                  <Chip variant="flat" size="sm">{v.version}</Chip>
                </div>
                } description={v.description} />
            ))
          }
        </Listbox>
      }
    </div>
  );
}
