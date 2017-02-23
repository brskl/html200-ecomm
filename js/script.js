var products = [
  {
    "name": "Reversible Plaid",
    "price": 26.99,
    "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
    "imageTitle": "reversible-plaid.jpg",
    "imageSet":  "images/reversible-plaid-200w.jpg 200w, images/reversible-plaid.jpg 380w",
    "imageSizes": "(max-width: 400px) 200px, 380px",
    "category": "plaid"
  },
  {
    "name": "Wool Cable Knit",
    "price": 49.99,
    "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
    "imageTitle": "wool-cable.jpeg",
    "imageSet": "images/wool-cable-200w.jpeg 200w, images/wool-cable.jpeg 300w",
    "imageSizes": "(max-width: 400px) 200px, 300px",
    "category": "solid"
  },
  {
    "name": "Northern Lights",
    "price": 29.99,
    "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
    "imageTitle": "northern-lights.jpg",
    "imageSet": "images/northern-lights-200w.jpg 200w, images/northern-lights-400w.jpg 400w, images/norther-lights.jpg 600w",
    "imageSizes": "(max-width: 400px) 200px, (max-width: 800px) 400px, 600px",
    "category": ""
  },
  {
    "name": "Ombre Infinity",
    "price": 11.99,
    "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
    "imageTitle": "ombre-infinity.jpg",
    "imageSet": "images/ombre-infinity-200w.jpg 200w, images/ombre-infinity-400w.jpg 400w, images/ombre-infinity.jpg 860w",
    "imageSizes": "(max-width: 400px) 200px, (max-width: 800px) 400px, 860px",
    "category": "solid"
  },
  {
    "name": "Fringed Plaid",
    "price": 18.99,
    "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
    "imageTitle": "fringed-plaid.jpeg",
    "imageSet":  "images/fringed-plaid-200w.jpeg 200w, images/fringed-plaid-400w.jpeg 400w, images/fringed-plaid-800w.jpeg 800w, images/fringed-plaid.jpeg 960w",
    "imageSizes": "(max-width: 400px) 200px, (max-width: 800px) 400px, (max-width: 1600px) 800px, (min-width: 1601px) 960px",
    "category": "plaid"
  },
  {
    "name": "Multi Color",
    "price": 22.99,
    "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic",
    "imageTitle": "multi-color.jpeg",
    "imageSet": "images/multi-color-200w.jpeg 200w, images/multi-color-400w.jpeg 400w, images/multi-color-800w.jpeg 800w, images/multi-color-1600w.jpeg 1600w, images/multi-color.jpeg 3000w",
    "imageSizes": "(max-width: 400px) 200px, (max-width: 800px) 400px, (max-width: 1600px) 800px, (max-width: 3200px) 1600px, (min-width: 3201px) 3000px",
    "category": ""
  },
  {
    "name": "Etro Paisley-Print Silk",
    "price": 249.99,
    "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
    "imageTitle": "etro.png",
    "imageSet": "images/etro-200w.png 200w, images/etro.png 492w",
    "imageSizes": "(max-width: 400px) 200px, 492px",
    "category": "pattern"
  },
  {
    "name": "Ashby Twill",
    "price": 70.99,
    "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
    "imageTitle": "twill.jpg",
    "imageSet": "images/twill-200w.jpg 200w, images/twill-400w.jpg 400w, images/twill-800w.jpg 800w, images/twill.jpg 1024w",
    "imageSizes": "(max-width: 400px) 200px, (max-width: 800px) 400px, (max-width: 1600px) 800px, (min-width: 1601px) 1024px",
    "category": "solid"
  }
]

function printProduct(product) {
  console.log(product.name + ", " + product.description + ", " + product.price);
}

function printAllProducts() {
  for (var i = 0; i < products.length; i++) {
    printProduct(products[i]);
  }
}

function compareByName(prod1, prod2)
{
  if (prod1.name == prod2.name)
    return 0;
  else if (prod1.name > prod2.name)
    return 1;
  else
    return -1;
}

function compareByPrice(prod1, prod2)
{
  return prod1.price - prod2.price;
}

function createItemFigure(product)
{
  var newFigure;
  var newImg;
  var newFigCaption;

  newFigure = document.createElement("figure");

  newImg = document.createElement("img");
  newImg.setAttribute("src", "images/" + product.imageTitle);
  newImg.setAttribute("alt", product.name);
  if (product.imageSizes) {
    if (product.imageSizes.length > 0) {
      newImg.setAttribute("sizes", product.imageSizes);
      newImg.setAttribute("srcset", product.imageSet)
    }
  }
  newFigure.appendChild(newImg);

  newFigCaption = document.createElement("figcaption");
  newFigCaption.innerHTML = product.name;
  newFigure.appendChild(newFigCaption);

  return newFigure;
}

function createItemProduct(product)
{
  var newItem;
  var newElm;

  newItem = document.createElement("div");
  newItem.setAttribute("class", "item")

  newElm = createItemFigure(product);
  newItem.appendChild(newElm);

  newElm = document.createElement("p");
  newElm.setAttribute("class", "item-price");
  newElm.innerHTML = "$" + product.price;
  newItem.appendChild(newElm);

  newElm = document.createElement("p");
  newElm.setAttribute("class", "item-description");
  newElm.innerHTML = product.description;
  newItem.appendChild(newElm);

  return newItem;
}

function updateItemContainer(productList)
{
  var container = document.getElementById("items");

  container.innerHTML = "";

  if (productList.length == 0) {
    container.innerHTML = "No items matching filter.";
  } else {
    for (product of productList) {
      container.appendChild(createItemProduct(product));
    }
  }
}

function updateProductList() {
  var itemSort = document.filterForm.sortBy.value;
  var itemFilter = document.filterForm.filterBy.value;
  var productList;

  if (itemFilter.length == 0) {
    productList = products;
  } else {
    productList = products.filter(function(product) {
        return product.category == itemFilter;
      });
  }

  switch (itemSort) {
    case 'priceA':
      productList = productList.sort(compareByPrice);
      break;
    case 'priceD':
      productList = productList.sort(compareByPrice).reverse();
      break;
    case 'name':
      productList = productList.sort(compareByName);
      break;
    default:
      // do nothing
      break;
  }
  updateItemContainer(productList);
}

function captureFilter() {
  updateProductList();
  event.preventDefault();
}

function windowOnLoad() {
  updateProductList();
}

window.onload = windowOnLoad;


