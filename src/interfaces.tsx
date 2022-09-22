export interface Car{
  id: number;
  manufacturer: string;
  model: string;
  type: Category;
  numberOfUnits: number;
  img_url: string;
  value:number;
  fuelConsumption: number;
  

}

export enum Category {
  Basic = "Basic",
  Standard = "Standard",
  Medium = "Medium",
  Premium = "Premium"
} 

export interface FinalResult {
  netto: number;
  brutto: number;
  fuelPrice: number;
  priceForDay:number;
  numberOfDays: number;

}