"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { File, ListFilter, PlusCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TEquipment } from "@/types/equipment";
import { useRouter } from "next/navigation";

import { productsEndpoint, categoriesEndpoint } from "@/lib/endpoints";
import useSWR from "swr";
import { useState } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDialogs } from "@/hooks/useDialogs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

const fetcherEquipments = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data);

const fetcherCategories = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data)

export function EquipmentList() {
  const take = 5;
  const router = useRouter();
  const { onOpen } = useDialogs();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [skip, setSkip] = useState<number>(1);

  const handleCreateEquipment = () => {
    router.push("/admin/equipments/new-equipment", { scroll: false });
    onOpen();
  }

  const handleViewDetails = (id: Number) => {
    router.push(`/admin/equipments/${id}`);
  };

  const {data} = useSWR(
    `${productsEndpoint}?category=${selectedCategory}&take=${take}&skip=${skip}`,
    fetcherEquipments,
  );

  const { data: categories } = useSWR(categoriesEndpoint, fetcherCategories);

  if (data === undefined || categories === undefined) {
    return (
      <div className="flex align-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSelectCategory = (category: string) => {
    setSkip(1);
    if (category === selectedCategory) {
      setSelectedCategory("all");
    }
    else {
      setSelectedCategory(category);
    }
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtrar por:
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Categoria</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories && categories.length > 0 && categories.map((category, index) => (
                <DropdownMenuCheckboxItem key={index} checked={category.name === selectedCategory}
                  onClick={(e) => handleSelectCategory(category.name)}>
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={handleCreateEquipment}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar equipo
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Equipos</CardTitle>
            <CardDescription>
              Ver la información de los equipos del departamento de sistemas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead className="hidden md:table-cell">Modelo</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Categoria
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Cantidad
                  </TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.equipments &&
                  data.equipments.length > 0 &&
                  data.equipments.map((equipment: TEquipment) => {
                    return (
                      <TableRow key={equipment.id}>
                        <TableCell className="font-medium">
                          {equipment.name}
                        </TableCell>

                        <TableCell>{equipment.brand}</TableCell>

                        <TableCell>{equipment.model}</TableCell>

                        <TableCell>{equipment.category}</TableCell>

                        <TableCell>{equipment.quantity}</TableCell>

                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger
                                aria-label="Mostrar información"
                                onClick={() => handleViewDetails(equipment.id)}
                              >
                                <Eye />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Mostrar información</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex-col">
            <div className="text-xs text-muted-foreground">
              mostrando <strong>{(skip - 1) * take + 1} - {data.count > (skip * take) ? (skip * take) : data.count}</strong> de <strong>{data.count}</strong> equipos
            </div>
            <div className="flex items-center justify-center mt-12">
              <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                      className={skip === 1 ? "cursor-not-allowed pointer-events-none opacity-30" : ""}
                      onClick={(e) => ( skip === 1 ? () => {} : setSkip(skip > 1 ? (skip - 1) : 1))}/>
                </PaginationItem>
                  {
                    Array.from({ length: Math.ceil(data.count / take)}).map((_, index) => (
                      <PaginationItem  key={index} onClick={(e) => setSkip(index + 1)}>
                        <PaginationLink isActive={skip === (index + 1)}>
                          {index + 1}</PaginationLink>
                      </PaginationItem>
                    ))
                  }
                <PaginationItem>
                  <PaginationNext 
                      className={skip === Math.ceil(data.count / take) ? "cursor-not-allowed pointer-events-none opacity-30" : ""}
                      onClick={(e) => (skip === Math.ceil(data.count / take) ? () => {} : setSkip(skip + 1))}/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
    </Tabs >
  );
}
