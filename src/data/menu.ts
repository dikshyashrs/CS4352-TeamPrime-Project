import { Hamburger, Salad, GlassWater, Cake } from "lucide-react";
export const categories = [
    {name:"Mains",icon:Hamburger},
    {name:"Sides",icon:Salad},
    {name:"Drinks",icon:GlassWater},
    {name:"Desserts",icon:Cake}
  ]

  // ---- Customization ----
  // Each item can have a list of option groups.
  // The customer picks exactly ONE choice per group. The first choice is the default
  // unless `defaultChoice` says otherwise. A choice's `price` is added to the item price.
  export type Choice = { label: string; price?: number };
  export type OptionGroup = { name: string; image?: string; choices: Choice[]; defaultChoice?: number };

  export type MenuItem = {
    name: string;
    price: number;
    description?: string;
    image?: string;
    options?: OptionGroup[]; // items with options get a "Customize" button on the menu
  };

  // Reusable groups
  const noYes = (name: string, image?: string): OptionGroup => ({ name, image, choices: [{label:"No"}, {label:"Yes"}] });
  const yesNo = (name: string, image?: string): OptionGroup => ({ name, image, choices: [{label:"Yes"}, {label:"No"}] });

  const patties: OptionGroup = { name:"Patties", image:"/customize/patty.png",
    choices: [{label:"One"}, {label:"Two", price:1.00}, {label:"Three", price:2.00}] };
  const extraCheese: OptionGroup = { name:"Extra Cheese", image:"/customize/cheese.png",
    choices: [{label:"None"}, {label:"Extra", price:0.30}, {label:"Double Extra", price:0.50}] };
  const mushrooms = noYes("Mushrooms", "/customize/mushrooms.png");
  const pickles = noYes("Pickles", "/customize/pickles.png");
  const Onions = noYes("Onions", "/customize/onions.png");

  const burgerOptions = [patties, mushrooms, extraCheese, pickles, Onions];

  export const foodItems: { [key: string]: MenuItem[] } = {
    Mains:[
      {name:"Classic Cheeseburger", price:11.50, description: "Beef patty, cheddar, lettuce, tomato, and onions on a soft bun",
        options: burgerOptions},
      {name:"House Smash Burger", price:12.50, description:"Two thin beef patties, melted cheese, pickles, and house sauce",
        // Comes with two patties and pickles as standard
        options: [{...patties, choices: [{label:"Two"}, {label:"Three", price:1.00}]}, mushrooms, extraCheese, {...pickles, defaultChoice: 1}, Onions]},
      {name:"Grilled Chicken Sandwich", price:11.00, description: "Grilled chicken breast, lettuce, and tomato on a brioche bun",
        options: [extraCheese, yesNo("Lettuce"), yesNo("Tomato"), pickles]},
      {name:"Crispy Chicken Plate", price:13.50, description: "Crispy chicken with coleslaw and a dinner roll",
        options: [
          { name:"Chicken Pieces", choices: [{label:"Two"}, {label:"Three", price:3.00}] },
          { name:"Dipping Sauce", choices: [{label:"None"}, {label:"Honey Mustard", price:0.50}, {label:"Gravy", price:0.75}] },
          yesNo("Coleslaw"),
          yesNo("Dinner Roll"),
        ]},
      {name:"Veggie Burger", price:10.50, description: "Plant-based patty, lettuce, tomato, and onions on a soft bun",
        options: [mushrooms, extraCheese, pickles, Onions]},
      {name:"Fish Sandwich", price:11.50, description: "Crispy white fish, lettuce, and tartar sauce on a soft bun",
        options: [
          { name:"Fish Fillets", choices: [{label:"One"}, {label:"Two", price:3.50}] },
          extraCheese,
          yesNo("Tartar Sauce"),
          yesNo("Lettuce"),
        ]},
    ],
    Sides:[
      {name:"French Fries", price: 3.5, description: "Golden, crispy, and lightly salted"},
      {name:"Onion Rings", price: 4.5, description: "Crispy battered onion rings" },
      {name:"Side Salad", price: 4.0, description: "Mixed greens, tomato, and cucumber with dressing"},
      {name:"Mashed Potatoes", price: 3.5, description: "Creamy mashed potatoes with gravy"},
      {name:"Coleslaw", price: 3.0, description: "Cool, crunchy cabbage slaw"},
      
    ],
    Drinks:[
      {name:"Coke Zero", price:2.50},
      {name:"Sprite", price:2.50},
      {name:"Lemonade", price:2.50},
      {name:"Warm Water ", price:0.00},
      {name:"Cold Water", price:0.00},
    ],
    Desserts:[
      {name:"Cheese Cake", price:4.50},
      {name:"Vanilla Ice Cream", price:3.50},
      {name:"Chocolate Cake", price:3.50},
      {name:"Peanut butter Cookie", price:2.50},      
    ]
  }