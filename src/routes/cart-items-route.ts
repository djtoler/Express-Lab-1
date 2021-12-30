// import & set up for what my route will need to run
import express from "express";
import Cart from "../models/cart-items";
// set up a new router object to access routing properties/methods
const cartItems = express.Router();

// hard code an array of inital cart items based on the imported Cart interface from line 3
const arrayOfCartItems: Cart[] = [
  { id: 100, product: "meal", price: 10, quantity: 1 },
  { id: 200, product: "beverage", price: 1, quantity: 1 },
  { id: 300, product: "cutlery", price: 1, quantity: 2 },
  { id: 400, product: "cups", price: 1, quantity: 1 },
  { id: 500, product: "napkin", price: 20, quantity: 2 },
  { id: 600, product: "salt", price: 5, quantity: 2 },
  { id: 700, product: "sauce", price: 10, quantity: 2 },
  { id: 800, product: "ice", price: 15, quantity: 2 },
];

// ---> let newId: number = arrayOfCartItems.at(-1); <--- Would this work??
// set a variable called newId, for the next object that'll be
// added to the array, with the upcoming number in the id value sequence. This
// newId variable will later be reassigned by adding 100 and storing it
// for a new object that gets added via a "post" request.
let newId: number = 900;

// ------------------------------------------------> Get Request for root "/" <---------------------------------------------------

// 1 .set up a "get" route by accessing the ".get" property/method
// of this particular express.router instance thats stored as "cartItems"

// 2. the first argument sets the location of the route as "/"
// for the home page

// 3. the second argument is a arrow function that has 2 parameters,
// req & res. These are express objects that have properties that you
// can call methods on to build out your route.

cartItems.get("/", (req, res) => {
  // set up variables for the optional query string parameters that the client
  // will have access to. "req" is the first paramater/object in the function above
  // and is used to access the ".query" property. The ".query" property matches
  // a query string from the client side. Exp: http://localhost:3838/?maxPrice=30.
  // These will be used later for building out the route.

  let maxPrice: number = Number.parseInt(req.query.maxPrice as string);
  let preFix: string = req.query.preFix as string;
  console.log("preFix: " + preFix);
  let pageSize: number = Number.parseInt(req.query.pageSize as string);
  let search: string = req.query.search as string;

  // Set a variable to get access to the url of the request. This will allow me set up my "if" conditionals
  // in my route buildouts that are coming up. At this point the url will be "/" for the home page.

  // If the client side makes a query request that includes maxPrice, like in line 41, "url" will be "/?maxPrice=10".
  // 1. "/" for the home page reference
  // 2. "?" to delimit the URI from the clients optional query string
  // 3. "maxPrice" from the clients 3 optional query string parameters declared on lines 44-46
  // 4. "=10" from the client setting their custom value from their optional query string
  // parameter. This will allow the client to set the maxPrice of this particular request to 10.

  let url = req.url;

  // The "url" on the left side comes from line 58, which is the request url that the client will attempt to enter.
  // The template literal on the right side is a hard coded string including the "maxPrice" query string parameter,
  // used as a variable, that will evaluate to a yet to be determinded number that has to come from the client.

  // If the request url from the left side is equal (in its type and its value (===) ) to the string literal on
  // the right side, then continue into the code block

  //   --------------------------------------------------->maxPrice<-------------------------------------------------------------
  if (url === `/?maxPrice=${maxPrice}`) {
    // Declare a variable that will use the Cart interface properties that was imported on line 3. This will make sure
    // any new cart objects in this block scope will have to meet the criteria set by the Cart interface. Since these new
    // objects will fit the blueprint set by the Cart interface, they can be allowed into an array thats set by the Cart interface.

    // Set the variable equal to an empty array. This empty array will be used to store the objects that are
    // filtered out by my upcoming code conditions.
    let itemsPricedUnderMax: Cart[] = [];

    // I want to find all the objects whos price is less than or equal to the "maxPrice" thats spefified from the client side.
    // For this, I'll have to check all objects located in the original array (the arrayOfItems array that i set up earlier
    // from lines 8-17.).
    // 1. I'll use a "for loop" to loop through the "arrayofItems" array and check each object by using bracket
    //  notation & "i" as a number variable that'll change on each loop to identify the index position of each object in the array.
    // 2. "i" will start at 0 (the index location of the first object) (i = 0;)
    // 3. "i" will loop through, one by one, every index position in the entire array (i < arrayOfItems.length;)
    // 4. The "i" number variable will increase by 1 on every loop iteration (i++;)
    for (let i = 0; i < arrayOfCartItems.length; i++) {
      // The left side of my if statement checks the price the object in the arrayOfItems array and compares it to the value of the
      // client requested query string parameter "maxPrice" (line 54 & 55).
      // If an objects price (arrayOfCartItems[i].price) falls under or equal to the limit set by "maxPrice", Ill use the push method
      // to put that entire object (arrayOfItems[i]) into the empty array that I set up on line 74, "itemsPricedUnderMax".
      if (arrayOfCartItems[i].price <= maxPrice) {
        itemsPricedUnderMax.push(arrayOfCartItems[i]);
      }
    }

    // Ill then leave from inside the for loop block and set up a response to the inital "get" request that includes a status and an
    // object that meets the requirements requested form the client.
    res.status(200).json(itemsPricedUnderMax);
  }

  //   Ill continue with the same format to build out the rest out this route.

  //----------------------------------------------------->preFix<--------------------------------------------------------------
  else if (preFix) {
    let productsThatStartWith: Cart[] = [];
    for (let i = 0; i < arrayOfCartItems.length; i++) {
      let product = arrayOfCartItems[i].product;
      let preFixReg = new RegExp("\\b" + preFix + "\\S+");
      console.log("product: " + product);
      console.log("preFixReg: " + preFixReg);
      //   console.log("preFixReg comparison: " + preFixReg.test(product));
      //   console.log("preFixReg comparison: " + preFixReg.test(product));
      console.log("product: " + product);
      console.log("preFixReg: " + preFixReg);
      if (preFixReg.test(product)) {
        console.log("in if");
        productsThatStartWith.push(arrayOfCartItems[i]);
      }
    }
    // console.log("send response");
    res.status(200).json(productsThatStartWith);
  }
  //   -------------------------------------------------------->pageSize<-------------------------------------------------------------
  else if (pageSize) {
    let limitedSizePage: Cart[] = [];
    for (let i = 0; i <= pageSize - 1; i++) {
      limitedSizePage.push(arrayOfCartItems[i]);
    }
    res.status(200).json(limitedSizePage);
  }
  //   --------------------------------------------------->maxPrice & pageSize<-------------------------------------------------------------
  else if (url === `/?maxPrice=${maxPrice}&pageSize=${pageSize}`) {
    let sizeAndPriceFilter: Cart[] = [];
    for (let i = 0; i <= pageSize; i++) {
      if (maxPrice >= arrayOfCartItems[i].price) {
        console.log(maxPrice, arrayOfCartItems[i].price);
        sizeAndPriceFilter.push(arrayOfCartItems[i]);
      }
    }
    res.status(200).json(sizeAndPriceFilter);
  }
  //   --------------------------------------------------->pageSize & preFix<-------------------------------------------------------------
  else if (url === `/?pageSize=${pageSize}&preFix=${preFix}`) {
    let sizeAndpreFix: Cart[] = [];
    for (let i = 0; i <= pageSize; i++) {
      let product = arrayOfCartItems[i].product;
      let preFixReg = new RegExp("\\b" + preFix + "\\S+");
      if (preFixReg.test(product)) {
        sizeAndpreFix.push(arrayOfCartItems[i]);
      }
    }
    res.status(200).json(sizeAndpreFix);
  }
  //   --------------------------------------------------->maxPrice & Prefix<-------------------------------------------------------------
  else if (url === `/?maxPrice=${maxPrice}&preFix=${preFix}`) {
    let maxPriceAndpreFix: Cart[] = [];
    for (let i = 0; i < arrayOfCartItems.length; i++) {
      let product = arrayOfCartItems[i].product;
      let preFixReg = new RegExp("\\b" + preFix + "\\S+");
      if (arrayOfCartItems[i].price < maxPrice && preFixReg.test(product)) {
        maxPriceAndpreFix.push(arrayOfCartItems[i]);
      }
    }
    res.status(200).json(maxPriceAndpreFix);
  }
  //   --------------------------------------------------->preFix, maxPrice & pageSize<--------------------------------------------
  else if (
    url === `/?preFix=${preFix}&maxPrice=${maxPrice}&pageSize=${pageSize}`
  ) {
    let maxPricePaageSizePageSize: Cart[] = [];
    for (let i = 0; i <= pageSize; i++) {
      let product = arrayOfCartItems[i].product;
      let preFixReg = new RegExp("\\b" + preFix + "\\S+");
      if (arrayOfCartItems[i].price < maxPrice && preFixReg.test(product)) {
        maxPricePaageSizePageSize.push(arrayOfCartItems[i]);
      }
    }
    res.status(200).json(maxPricePaageSizePageSize);
  } else if (url === `/?search=http%3A%2F%2Flocalhost%3A3838%2F`) {
  }
  // ------------------------------------------------------->Root Path<-------------------------------------------------------------
  res.status(200).json(arrayOfCartItems);
});

// --------------------------------------------->Get Request For ID<-----------------------------------------------------------
cartItems.get("/:id", (req, res) => {
  let idNum: number = Number.parseInt(req.params.id);
  let notFound;
  for (let i = 0; i < arrayOfCartItems.length; i++) {
    if (idNum == arrayOfCartItems[i].id) {
      notFound = false;
      res.status(200).json(arrayOfCartItems[i]);
    }
  }
  if (notFound) {
    res.status(404).json({ message: "ID not found" });
  }
});
//--------------------------------------------------->Post Request For Root Path<-------------------------------------------------------------
cartItems.post("/", (req, res) => {
  let newEntry: Cart = req.body;
  newEntry.id = newId;
  newId += 100;
  arrayOfCartItems.push(newEntry);
  res.status(201).json(newEntry);
});
// --------------------------------------------------------->Put Request for ID<----------------------------------------------------
cartItems.put("/:id", (req, res) => {
  let newEntry;
  let idNum: number = Number.parseInt(req.params.id);
  for (let i = 0; i <= arrayOfCartItems.length; i++) {
    if (idNum === arrayOfCartItems[i].id) {
      let newEntry: Cart = req.body;
      res.json(newEntry).status(200);
    }
  }
});
//--------------------------------------------------->Delete Request For ID<-------------------------------------------------------------
cartItems.delete("/:id", (req, res) => {
  let idNum: number = Number.parseInt(req.params.id);
  for (let i = 0; i <= arrayOfCartItems.length; i++) {
    if (idNum === arrayOfCartItems[i].id) {
      arrayOfCartItems.splice(i);
    }
  }
  res.json().status(204);
});

// export this file so other files and modules can import it use it if necessary.
export default cartItems;
