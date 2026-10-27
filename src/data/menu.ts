import { Hamburger, Salad, GlassWater, Cake } from "lucide-react";
export const categories = [
    {name:"Mains",icon:Hamburger},
    {name:"Sides",icon:Salad},
    {name:"Drinks",icon:GlassWater},
    {name:"Desserts",icon:Cake}
  ]

  export const foodItems: { [key: string]: { name: string; price: number; description: string }[] } = {
    Mains:[
      {name:"Truffle Rigatoni", price:14.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Smash Burger", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Truffle 2", price:14.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Smash Burger 3", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Smash Burger 4", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Smash Burger 5", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},

    ],
    Sides:[
      {name:"Herb Fries", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Corn Nachos", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Garlic Bread ", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Greens Salad", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Greens Salad 2", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Greens Salad 3", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      
    ],
    Drinks:[
      {name:"Coke Zero", price:2.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Sprite", price:2.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Lemonade", price:2.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Water", price:1.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Warm Water ", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Cold Water", price:6.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
    ],
    Desserts:[
      {name:"Truffle Cake", price:7.20, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"        },
      {name:"Cheese Cake", price:2.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Ice Cream", price:4.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Chocolate Cake", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Cookie", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      {name:"Vanilla Cake ", price:12.50, description:"A dish with herbs tomatos cheese and pasta and milk and lettuce and lentils and pepper"},
      
    ]
  }