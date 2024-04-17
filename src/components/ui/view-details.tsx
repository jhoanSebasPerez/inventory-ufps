"use client"

import Link from "next/link";
import { Eye } from "lucide-react";
import { TableCell } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {useDialogs} from "@/hooks/useDialogs"


export default function ViewDetails({ id } : {id: number}) {

  const {onOpen} = useDialogs();

  return (
    <TableCell>
      <Link
        href={`/admin/equipment-details/${id}`}
        onClick={onOpen}
        scroll={false}
        aria-label={`Ver detalles del equipo ${id}`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger aria-label="Mostrar información">
              <Eye />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mostrar información</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </TableCell>
  );
}
