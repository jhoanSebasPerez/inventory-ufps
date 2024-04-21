"use client"

import { EquipmentDetail } from "@/components/compound/equipment-details";
import { useParams } from "next/navigation";
import {usePathname} from "next/navigation";

export default function EquipmentDetailPage() {
  const {id} = useParams() as {id: string};

  let pathname = usePathname();

  //remove id from pathname
  pathname = pathname.replace(`/${id}`, "");

  return (
    <EquipmentDetail equipmentId={id} pathname={pathname}/>
  )
}
