/**
 * MENU DATA
 * Edit this file to change the menu.
 *   - `categories`  the tabs on the menu page and their icons
 *   - `foodItems`   the items in each category: name, price, description,
 *                   photo (`image`, a file in /public/menu), and
 *                   customization `options` (any item with options gets a "Customize" button)
 * The option groups (Patties, Extra Cheese, ...) are defined once below and reused
 * across items. Their photos are in /public/customize.
 */
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
  const lettuce = yesNo("Lettuce", "/customize/lettuce.png");
  const tomato = yesNo("Tomato", "/customize/tomato.png");
  const chicken = noYes("Chicken", "/customize/chicken.png");
  const dippingSauce = noYes("Dipping Sauce", "/customize/dipping sauce.png");
  const frenchFries = noYes("French Fries", "/customize/french fries.png");

  const burgerOptions = [patties, mushrooms, extraCheese, pickles, Onions];

  export const foodItems: { [key: string]: MenuItem[] } = {
    Mains:[
      {name:"Classic Cheeseburger", price:11.50, description: "Beef patty, cheddar, lettuce, tomato, and onions on a soft bun", image: "/menu/cheeseburger.png",
        options: burgerOptions},
      {name:"House Smash Burger", price:12.50, description:"Two thin beef patties, melted cheese, pickles, and house sauce", image: "/menu/houseburger.png",
        // Comes with two patties and pickles as standard
        options: [{...patties, choices: [{label:"Two"}, {label:"Three", price:1.00}]}, mushrooms, extraCheese, {...pickles, defaultChoice: 1}, Onions]},
      {name:"Grilled Chicken Sandwich", price:11.00, description: "Grilled chicken breast, lettuce, and tomato on a soft bun", image: "/menu/chickensandwich.png",
        options: [chicken, extraCheese, lettuce, tomato, pickles]},
      {name:"Crispy Chicken Plate", price:13.50, description: "Crispy chicken with fries and dipping sauce", image: "/menu/crispychicken.png",
        options: [
          { name:"Chicken Pieces", choices: [{label:"Two"}, {label:"Three", price:3.00}] },
          dippingSauce,
          frenchFries,
        ]},
      {name:"Veggie Burger", price:10.50, description: "Plant-based patty, lettuce, tomato, and onions on a soft bun", image: "/menu/vegburger.png",
        options: [mushrooms, extraCheese, pickles, Onions]},
      {name:"Fish Sandwich", price:11.50, description: "Crispy white fish, lettuce, and tartar sauce on a soft bun", image: "/menu/fish.png",
        options: [
          { name:"Fish Fillets", choices: [{label:"One"}, {label:"Two", price:3.50}] },
          extraCheese,
          yesNo("Tartar Sauce"),
          lettuce,
        ]},
    ],
    Sides:[
      {name:"French Fries", price: 3.5, description: "Golden, crispy, and lightly salted", image: "/menu/fries.png"},
      {name:"Onion Rings", price: 4.5, description: "Crispy battered onion rings", image: "/menu/onionrings.png"},
      {name:"Side Salad", price: 4.0, description: "Mixed greens, tomato, and cucumber with dressing", image: "/menu/salad.png"},
      {name:"Mashed Potatoes", price: 3.5, description: "Creamy mashed potatoes with gravy", image: "/menu/mashedpotato.png"},
      {name:"Coleslaw", price: 3.0, description: "Cool, crunchy cabbage slaw", image: "/menu/coleslaw.png"},      
    ],
    Drinks:[
      {name:"Coke Zero", price:2.50, image: "/menu/coke.png"},
      {name:"Sprite", price:2.50, image: "/menu/sprite.png"},
      {name:"Lemonade", price:2.50, image: "/menu/lemonade.png"},
      {name:"Warm Water ", price:0.00},
      {name:"Cold Water", price:0.00},
    ],
    Desserts:[
      {name:"Cheese Cake", price:4.50, image: "/menu/cheesecake.png"},
      {name:"Vanilla Ice Cream", price:3.50, image: "/menu/icecream.png"},
      {name:"Chocolate Cake", price:3.50, image: "/menu/chococake.png"},
      {name:"Peanut butter Cookie", price:2.50, image: "/menu/cookie.png"},      
    ]
  }