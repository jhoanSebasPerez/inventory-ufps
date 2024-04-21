import { PrismaClient } from "@prisma/client";
import colors from "colors";
import { mockUnits } from "./mock"; 

const prisma = new PrismaClient();

async function main() {

  mockUnits.forEach(async (unit) => {
    await prisma.unit.create({
      data: {
        serialNumber: unit.serialNumber,
        equipment: {
          create: {
            name: unit.equipment.name,
            description: unit.equipment.description,
            brand: unit.equipment.brand,
            model: unit.equipment.model,
            category: {
              create: {
                name: unit.equipment.category.name,
              },
            },
            quantity: unit.equipment.quantity,
          },
        },
        state: unit.state,
        office: {
          create: {
            location: unit.office.location,
            description: unit.office.description,
          },
        },
        owner: {
          create: {
            id: unit.owner.id,
            name: unit.owner.name,
            email: unit.owner.email,
            password: unit.owner.password,
            role: unit.owner.role,
          },
        },
      },
    }) 
  });
}

main()
  .then(() => {
    console.log(colors.green("Seed successful"));
  })
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
