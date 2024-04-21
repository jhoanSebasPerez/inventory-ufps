export enum States {
  BUENO = "BUENO",
  MALO = "MALO",
  REGULAR = "REGULAR"
}

export enum Roles {
  ADMIN = "admin",
  USER = "user",
  OWNER = "owner"
}


export type TEquipment = {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  state: States;
  office: string;
  quantity: number;
  category: TCategory;
}


export const statesColors = {
  [States.BUENO]: "success",
  [States.MALO]: "destructive", 
  [States.REGULAR]: "secondary",
};

export type TCategory = {
  id: number;
  name: string;
  description?: string;
}

export type TOffice = {
  id: number;
  location: string;
  description?: string;
}

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
}

export type TUnit = {
  serialNumber: string;
  equipment: {
    name: string;
    description: string;
    brand: string;
    model: string;
    quantity: number;
    category: {
      name: string;
      description?: string
    };
  
  };
  state: string;
  office: {
    location: string;
    description?: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Roles;
  };
}
