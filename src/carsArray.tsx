import { Car, Category } from './interfaces'

export const carsArray: Car[] = [
  {id: 1, manufacturer: "BMW", model: "Serie 7", type: Category.Premium, numberOfUnits:1, img_url:'img/bmw.jpg',value: 500000, fuelConsumption:15},
  {id: 2, manufacturer: "Mercedes", model: "Maybach", type: Category.Premium, numberOfUnits:3, img_url:'img/maybach.jpg' ,value: 800000, fuelConsumption:13},
  {id: 3, manufacturer: "VW", model: "Passat", type: Category.Standard, numberOfUnits:6, img_url:'img/passat.jpg',value: 50000, fuelConsumption:8},
  {id: 4, manufacturer: "Skoda", model: "Superb", type: Category.Standard, numberOfUnits:6, img_url:'img/skoda.jpg',value: 90000, fuelConsumption:8},
  {id: 5, manufacturer: "Audi", model: "A4", type: Category.Medium, numberOfUnits:6, img_url:'img/audi.jpg',value: 120000, fuelConsumption:9},
  {id: 6, manufacturer: "Volvo", model: "XC60", type: Category.Medium, numberOfUnits:6, img_url:'img/volvo.jpg',value: 100000, fuelConsumption:11},
  {id: 7, manufacturer: "Seat", model: "Ibiza", type: Category.Basic, numberOfUnits:6, img_url:'img/seat.jpg',value: 30000, fuelConsumption:5},
  {id: 8, manufacturer: "Toyota", model: "Yaris", type: Category.Standard, numberOfUnits:6, img_url:'img/toyota.jpg',value: 20000, fuelConsumption:4},
]
