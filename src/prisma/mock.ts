import { TUnit, States, Roles } from "@/types/equipment";
import { faker } from "@faker-js/faker";

function generateMockUnits(): TUnit {
  return {
    serialNumber: faker.string.alphanumeric(10),
    equipment: {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      brand: faker.company.name(),
      model: faker.commerce.productName(),
      quantity: 1,
      category: {
        name: faker.commerce.department(),
      },
    },
    state: faker.helpers.enumValue(States),
    office: {
      location: faker.location.buildingNumber(),
      description: faker.lorem.sentence(),
    },
    owner: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.enumValue(Roles),
    },
  };
}

export const mockUnits: TUnit[] = faker.helpers.multiple(generateMockUnits, {
  count: 10,
}); 

  



