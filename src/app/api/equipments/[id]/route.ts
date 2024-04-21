import prisma from '@/db/client';
import { NextRequest, NextResponse } from 'next/server';


export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, {params} : {params: {id: string}}){
  try {
    const equipment = await prisma.equipment.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({data:equipment});
  } catch (error) {
    return NextResponse.json({error});
  } finally {
    await prisma.$disconnect();
  }
}
