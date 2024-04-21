"use client";

import Modal from "@/components/compound/modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDialogs } from "@/hooks/useDialogs";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import {productsEndpoint} from "@/lib/endpoints";
import {toast} from "sonner";
import { useRouter } from "next/navigation";

export default function NewEquipment() {
  const { onOpen, onClose } = useDialogs();
  const router = useRouter();

  const [pending, setPending] = useState(false);

  useEffect(() => {
    onOpen();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch(productsEndpoint, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const {status, message} = await res.json();
    if (status === 201) {
      setPending(false);
      toast.success(message);
    }else{
      setPending(false);
      toast.error("Error al agregar el equipo");
    }
    onClose();
    router.replace("/admin/equipments"); 
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Agregar un nuevo equipo</CardTitle>
            <CardDescription>
              Llena los campos requeridos para agregar un nuevo equipo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label>Description</Label>
                <Input type="text" className="w-full" name="description" />
              </div>

              <div className="grid gap-3">
                <Label>Marca</Label>
                <Input type="text" className="w-full" name="brand" />
              </div>

              <div className="grid gap-3">
                <Label>Modelo</Label>
                <Input type="text" className="w-full" name="model" />
              </div>

              <div className="grid gap-3">
                <Label>Oficina</Label>
                <Input type="text" className="w-full" name="office" />
              </div>

              <div className="flex justify-between">
                <div className="grid gap-3">
                  <Label>Estado del equipo</Label>
                  <Select name="state">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado del equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Estados</SelectLabel>
                        <SelectItem value="Bueno">Bueno</SelectItem>
                        <SelectItem value="Malo">Malo</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label>Categoría del equipo</Label>
                  <Select name="category">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="categoria del equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Estados</SelectLabel>
                        <SelectItem value="Impresora">Impresora</SelectItem>
                        <SelectItem value="Portátiles">Portátiles</SelectItem>
                        <SelectItem value="Computador escritorio">
                          Computador Escritorio
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" disabled={pending}>
                {pending ? "Guardando..." : "Agregar equipo"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Modal>
  );
}
