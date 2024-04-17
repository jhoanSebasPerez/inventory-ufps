"use client"

import { EquipmentDetail } from "@/components/compound/equipment-details";
import { useParams } from "next/navigation";

export default function EquipmentDetailPage() {
  const {id} = useParams() as {id: string};

  return (
    <EquipmentDetail equipmentId={id} />
  )
}
