"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useSWR from "swr";
import { productsEndpoint } from "@/lib/endpoints";
import { Button } from "../ui/button";
import {useRouter} from "next/navigation";

interface EquipmentDetailProps {
  equipmentId: string;
  pathname: string;
}


const fetcher = (url : string) => fetch(url).then(res => res.json()).then(data => data.data)


export function EquipmentDetail({ equipmentId, pathname}: EquipmentDetailProps) {
  const router = useRouter();

  const { data: equipment, isLoading }= useSWR(productsEndpoint + "/" + equipmentId ,fetcher);

  if (isLoading) {
    return (
      <div className="flex align-center justify-center mt-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
    <Button onClick={() => {router.replace(pathname)}}>Ver todos</Button>
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{equipment?.name}</CardTitle>
      </CardHeader>
      <CardDescription></CardDescription>
    </Card>
    </>
  );
}
