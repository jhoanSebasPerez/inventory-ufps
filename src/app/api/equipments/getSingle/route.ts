import {prisma} from "@/db/client"
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest){
  const id = request.nextUrl.searchParams.get("id") as string;
  try {
    const equipment = await prisma.equipment.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({data:equipment});
  } catch (error) {
    return NextResponse.json({error});
  } finally {
    await prisma.$disconnect();
  }
}
