import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.equipment.create({
    data: {
      description: "Impresora HP",
      brand: "HP",
      model: "2021",
      state: "Malo",
      office: "SF401",
      quantity: 5,
      category: "Impresora",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
