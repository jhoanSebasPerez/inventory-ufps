import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  File,
  ListFilter,
  PlusCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TEquipment, statesColors } from "@/types/equipment";
import ViewDetails from "@/components/ui/view-details";

import axios from "axios";
import {productsEndpoint} from "@/lib/endpoints";
import {BadgeProps} from "@/components/ui/badge"


export async function EquipmentList() {
 
 
  const { data } = await axios.get(productsEndpoint + "getAll");
  const equipments: TEquipment[] = data.data;


  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Portátiles</TabsTrigger>
          <TabsTrigger value="draft">Impresoras</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Computadores de escritorio
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
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
                  <TableHead>Descripción</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead className="hidden md:table-cell">Modelo</TableHead>
                  <TableHead className="hidden md:table-cell">Estado</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Oficina
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Cantidad</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {equipments.length > 0 && equipments.map((equipment) => {
                  const variant = statesColors[equipment.state] as BadgeProps["variant"];
                  return (
                    <TableRow key={equipment.id}>

                      <TableCell className="font-medium">
                        {equipment.description}
                      </TableCell>

                      <TableCell>{equipment.brand}</TableCell>

                      <TableCell>{equipment.model}</TableCell>
                      
                      
                      <TableCell>
                        <Badge variant={variant}>
                          {equipment.state}
                        </Badge>
                      </TableCell>

                      <TableCell>{equipment.office}</TableCell>

                      <TableCell>{equipment.category}</TableCell>

                      <TableCell>{equipment.quantity}</TableCell>
                      
                      <ViewDetails id={equipment.id} />
                    </TableRow>
                   )})}
              </TableBody>
            </Table>
          </CardContent> 
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
