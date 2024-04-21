import prisma from '@/db/client';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export const dynamic = "force-dynamic";

// "/api/categories" -> get all categories
export async function GET(request: NextRequest){
  try {
    const result = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      }
    });
    //remove category with same name
    const categories = new Set(result.map((category) => category.name));

    return NextResponse.json({data: Array.from(categories, (category) => ({name: category}))});
  } catch (error) {
    return NextResponse.json({error});
  } finally {
    await prisma.$disconnect();
  }
}
