// products in products.js script

function printProduct(product) {
  console.log(product.name + ", " + product.description + ", " + product.price);
}

function printAllProducts() {
  for (var i = 0; i < products.length; i++) {
    printProduct(products[i]);
  }
}

// comparison function used for sorting by name
function compareByName(prod1, prod2)
{
  if (prod1.name.toLowerCase() < prod2.name.toLowerCase())
    return -1;
  else if (prod1.name.toLowerCase() > prod2.name.toLowerCase())
    return 1;
  else
    return 0;
}

// comparison function used for sorting by price
function compareByPrice(prod1, prod2)
{
  return prod1.price - prod2.price;
}

// create anew item <img> for an individual product
function createItemImg(product) {
  var newImg;
  
  newImg = document.createElement("img");
  newImg.setAttribute("src", "images/" + product.imageTitle);
  newImg.setAttribute("alt", product.name);
  if (product.imageSizes) {
    if (product.imageSizes.length > 0) {
      newImg.setAttribute("sizes", product.imageSizes);
      newImg.setAttribute("srcset", product.imageSet)
    }
  }
  
  return newImg;
}

// create a new item <figure> for an individual product
function createItemFigure(product)
{
  var newFigure;
  var newImg;
  var newFigCaption;

  newFigure = document.createElement("figure");

  newImg = createItemImg(product);
  newFigure.appendChild(newImg);

  newFigCaption = document.createElement("figcaption");
  newFigCaption.innerHTML = product.name;
  newFigure.appendChild(newFigCaption);

  return newFigure;
}

// create a new item <div> for an individual product
function createItemProduct(product)
{
  var newItem;
  var newElm;

  newItem = document.createElement("div");
  newItem.setAttribute("class", "item")

  newElm = createItemFigure(product);
  newItem.appendChild(newElm);

  newElm = document.createElement("p");
  newElm.setAttribute("class", "item-description");
  newElm.innerHTML = product.description;
  newItem.appendChild(newElm);

  newElm = document.createElement("p");
  newElm.setAttribute("class", "item-price");
  newElm.innerHTML = "$" + product.price;
  newItem.appendChild(newElm);

  newElm = document.createElement("button");
  newElm.setAttribute("onclick", "onClickAdd('" + product.name + "')");
  newElm.innerHTML = "Add to Cart";
  newItem.appendChild(newElm);

  return newItem;
}

// update <div id="items"> from productList array
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

// create products list as specified by category filter and sorting requirement
function createProductList(itemSort, itemFilter) {
  var productList;
  var productListType;

  // filter the products based on type, pageProductType defined in HTML <script> element
  productListType = products;
  if (typeof pageProductType != 'undefined') {
    if (pageProductType.length != 0) {
      productListType = products.filter(function(product) {
        return product.productType == pageProductType;
      });
    }
  }

  // filter the products based on category
  if (itemFilter.length == 0) {
    productList = productListType;
  } else {
    productList = productListType.filter(function(product) {
        return product.category == itemFilter;
      });
  }

  // sort the products based on sorting specified by itemSort
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

  return productList;
}

// update the list of products
function updateProductList()
{
  var itemSort = '';
  var itemFilter = '';

  if (typeof document.filterForm != 'undefined') {
    itemSort = document.filterForm.sortBy.value;
    itemFilter = document.filterForm.filterBy.value;
  }

  // pageProduct
  var prodList = createProductList(itemSort, itemFilter);

  updateItemContainer(prodList);
}

// filter form's submit ("Update") button
function captureFilter() {
  updateProductList();
  event.preventDefault();
}



