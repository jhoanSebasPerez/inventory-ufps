import axios from "@/axios/setup";
import { productsEndpoint } from "@/lib/endpoints";


export async function getEquipmentById(id: Number){
  const { data } = await axios.get(productsEndpoint + "getSingle/", {
    params: { id },
  });
  return data.data;
};


export async function getAllEquipments(){
  const { data } = await axios.get(productsEndpoint + "getAll");
  return data.data;
};
