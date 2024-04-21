"use client";

import {
  Command,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { productsEndpoint } from "@/lib/endpoints";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export function SearchBar() {
  
  const [search, setSearch] = useState("");
  const [equipments, setEquipments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${productsEndpoint}/search?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setEquipments(data.data);
      });
  }, [search]);

  const handleSelectEquipment = (id: number) => {
    setSearch("");
    router.push(`/admin/equipments/${id}`);
  }

  return (
    <div className="absolute top-2 w-full flex-1 z-10">
      <Command className="relative w-80 rounded-lg border">
        <CommandInput placeholder="Type a command or search..." value={search} 
          onValueChange={setSearch} />
        <CommandList>
          {equipments.length > 0 && equipments.map((equipment : {id: number, name: string}) => (
            <p key={equipment.id} className="p-2 cursor-pointer hover:bg-muted" onClick={(e) => handleSelectEquipment(equipment.id)}>
              {equipment.name}
            </p>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
