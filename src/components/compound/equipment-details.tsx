"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TEquipment, States } from "@/types/equipment";
import { getEquipmentById } from "@/actions/equipments";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface EquipmentDetailProps {
  equipmentId: string;
}

export function EquipmentDetail({ equipmentId }: EquipmentDetailProps) {

  
  const [equipment, setEquipment] = useState<TEquipment>({
    id: 0,
    description: "",
    state: States.GOOD,
    model: "",
    brand: "",
    office: "",
    quantity: 0,
    category: "",
  });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEquipmentById(Number(equipmentId)).then((equipment: TEquipment) => {
      setEquipment(equipment);
      setLoading(false);
    });
  }, [equipmentId]);

  return (
  <>
    {loading ? (
      <div className="flex align-center justify-center">
        <LoadingSpinner />
      </div>
    ) : (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{equipment.description}</CardTitle>
        </CardHeader>
        <CardDescription>
        </CardDescription>
      </Card>
    )}
    </>
  );
}
