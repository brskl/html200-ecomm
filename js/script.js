var products = [
  {
    "name": "Reversible Plaid",
    "price": 26.99,
    "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
    "imageTitle": "reversible-plaid.jpg",
    "category": "plaid"
  },
  {
    "name": "Wool Cable Knit",
    "price": 49.99,
    "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
    "imageTitle": "wool-cable.jpeg",
    "category": ""
  },
  {
    "name": "Northern Lights",
    "price": 29.99,
    "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
    "imageTitle": "northern-lights.jpg",
    "category": ""
  },
  {
    "name": "Ombre Infinity",
    "price": 11.99,
    "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
    "imageTitle": "ombre-infinity.jpg",
    "category": ""
  },
  {
    "name": "Fringed Plaid",
    "price": 18.99,
    "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
    "imageTitle": "fringed-plaid.jpeg",
    "category": "plaid"
  },
  {
    "name": "Multi Color",
    "price": 22.99,
    "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic",
    "imageTitle": "multi-color.jpeg",
    "category": ""
  },
  {
    "name": "Etro Paisley-Print Silk",
    "price": 249.99,
    "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
    "imageTitle": "etro.png",
    "category": "pattern"
  },
  {
    "name": "Ashby Twill",
    "price": 70.99,
    "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
    "imageTitle": "twill.jpg",
    "category": ""
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

function createItemFIgure(image, name)
{
  var newFigure;
  var newImg;
  var newFigCaption;

  newFigure = document.createElement("figure");

  newImg = document.createElement("img");
  newImg.setAttribute("src", "images/" + image);
  newImg.setAttribute("alt", name);
  newFigure.appendChild(newImg);

  newFigCaption = document.createElement("figcaption");
  newFigCaption.innerHTML = name;
  newFigure.appendChild(newFigCaption);

  return newFigure;
}

function createItemProduct(product)
{
  var newItem;
  var newDiv;
  var newFig;

  newItem = document.createElement("div");
  newItem.setAttribute("class", "item")

  newFig = createItemFIgure(product.imageTitle, product.name);
  newItem.appendChild(newFig);

  newDiv = document.createElement("div");
  newDiv.setAttribute("class", "item-price");
  newDiv.innerHTML = "$" + product.price;
  newItem.appendChild(newDiv);

  newDiv = document.createElement("div");
  newDiv.setAttribute("class", "item-description");
  newDiv.innerHTML = product.description;
  newItem.appendChild(newDiv);

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


