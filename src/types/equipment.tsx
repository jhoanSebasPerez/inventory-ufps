import {BadgeProps} from "@/components/ui/badge"

export enum States {
  GOOD = "Bueno",
  BAD = "Malo",
  REGULAR = "Regular"
}


export type TEquipment = {
  id: number;
  description: string;
  brand: string;
  model: string;
  state: States;
  office: string;
  quantity: number;
  category: string;
}


export const statesColors = {
  [States.GOOD]: "success",
  [States.BAD]: "destructive", 
  [States.REGULAR]: "secondary",
};
