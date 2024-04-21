import prisma from "@/db/client";
import { TEquipment } from "@/types/equipment";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    
    let result = [];
    if (search !== "") {
      result = await prisma.equipment.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
