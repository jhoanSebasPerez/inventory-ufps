import prisma from '@/db/client';
import { TEquipment } from '@/types/equipment';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest){
  const equipment : TEquipment = await request.json();
  console.log(equipment);
  try {
    await prisma.equipment.create({
      data: {
        ...equipment, 
        quantity: 1,
      },
    });
    return NextResponse.json({status: 201, message: "Equipo agregado correctamente"});
  } catch (error) {
    return NextResponse.json({error});
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(request: NextRequest){
  const {searchParams} = new URL(request.url);
  const category = searchParams.get('category');
  const take = Number(searchParams.get('take'));
  const skip = Number(searchParams.get('skip')) === 0 ? 1 : Number(searchParams.get('skip'));
  console.log("take= "+take);
  console.log("skip= "+skip);
  console.log(category);
  const filterOptions = {}
  if(category != "all"){
    filterOptions["category"] = {
      name: category
    }
  }

  try {
    const count = await prisma.equipment.count({
      where: {
        ...filterOptions,
      }
    });

    const result = await prisma.equipment.findMany({
      take: take,
      skip:(skip - 1) * take,
      where: {
        ...filterOptions,
      },
      select: {
        id: true,
        name: true,
        description: true,
        brand: true,
        model: true,
        category: {
          select: {
            name: true,
          }
        },
        quantity: true,
        }
    });
    const equipments = result.map((equipment) => (
      {
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        brand: equipment.brand,
        model: equipment.model,
        category: equipment.category.name,
        quantity: equipment.quantity,}
    )
    );
    
    return NextResponse.json({equipments, count});
  } catch (error) {
    return NextResponse.json({error});
  } finally {
    await prisma.$disconnect();
  }
}
