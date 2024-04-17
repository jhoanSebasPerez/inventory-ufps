import type { NextRequest } from 'next/server';
import {prisma} from '@/db/client';
import {NextResponse} from 'next/server';

export async function GET(request: NextRequest){
  try {
    const equipments = await prisma.equipment.findMany();
    return NextResponse.json({data:equipments});
  } catch (error) {
    return NextResponse.json({error});
  } finally {
    await prisma.$disconnect();
  }
}

