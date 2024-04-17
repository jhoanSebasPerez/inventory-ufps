"use client"

import { EquipmentDetail } from "@/components/compound/equipment-details";
import Modal from "@/components/compound/modal";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useParams } from "next/navigation";

export default function EquipmentDetailPage() {
  
  const { id } = useParams() as { id: string };

  return (
    <Modal>
      <Suspense
        fallback={
          <div className="flex align-center justify-center mt-8">
            <LoadingSpinner />
          </div>
        }
      >
        <EquipmentDetail equipmentId={id} />
      </Suspense>
    </Modal>
  );
}
