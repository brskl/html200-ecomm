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
  var itemSort = document.filterForm.sortBy.value;
  var itemFilter = document.filterForm.filterBy.value;

  // pageProduct
  var prodList = createProductList(itemSort, itemFilter);

  updateItemContainer(prodList);
}

// filter form's submit ("Update") button
function captureFilter() {
  updateProductList();
  event.preventDefault();
}

// contains array of CartLine instances that represent items in the user's cart
var cart;

// load the cart information from localstorage
function loadCart()
{
  if (!Modernizr.localstorage) {
    return;
  }

  var cartStorage = localStorage["cart"];

  if (cartStorage) {
    cart = JSON.parse(cartStorage);
  } else {
    cart = [];
  }

  updateCartIcon();
}

// save the cart information to localstorage
function saveCart()
{
  if (!Modernizr.localstorage) {
    return;
  }

  if (cart.length == 0) {
    localStorage.removeItem("cart")
  } else {
    localStorage["cart"] = JSON.stringify(cart);
  }
}

// update the cart icon
function updateCartIcon()
{
  var itemsInCart = 0;
  var cartIcon = document.getElementById("cartIcon");

  for (cartline of cart) {
    itemsInCart += cartline.number;
  }

  if (itemsInCart == 0) {
    cartIcon.innerHTML = "";
  } else {
    cartIcon.innerHTML = " (" + itemsInCart.toString() + ")";
  }
}

// constructor
function CartLine(productNameVal, numberVal) {
  this.productName = productNameVal;
  this.number = numberVal;
}

// 'Add' button for indivdual product <div class="item">
function onClickAdd(productName) {
  var prod = products.find(function(product) {return product.name == this}, productName);
  var cartline = cart.findIndex(function(cartline) {
      return cartline.productName == this;
    }, productName);
  if (cartline == -1) {
    var newcartline = new CartLine(productName, 1);
    cart.push(newcartline);
  } else {
    cart[cartline].number++;
  }

  hideCart();
  saveCart();
  updateCartIcon();
}

// empty the cart of items and update
function emptyCart() {
  cart = [];
  updateCartIcon();
}

// hide the Cart element
function hideCart() {
  var cartDiv = document.getElementById("cart");
  cartDiv.style.visibility="hidden";
}

// create DOM for individual cart-item
function createCartItem(cartline, prod) {
  var newCartLineElem = document.createElement("tr");
  var newData;
  var newButton;

  newData = document.createElement("td");
  newData.innerHTML = cartline.productName;
  newCartLineElem.appendChild(newData);
  newData = document.createElement("td");
  newData.innerHTML = cartline.number;
  newCartLineElem.appendChild(newData);
  newData = document.createElement("td");
  newData.innerHTML = "$";
  newCartLineElem.appendChild(newData);
  newData = document.createElement("td");
  newData.innerHTML = prod.price.toFixed(2);
  newData.setAttribute("class", "currencyAmount");
  newCartLineElem.appendChild(newData);
  newData = document.createElement("td");
  newButton = document.createElement("button");
  newButton.innerHTML = "Remove";
  newButton.setAttribute("onclick", "onClickRemove('" + cartline.productName + "')");
  newData.appendChild(newButton);
  newCartLineElem.appendChild(newData);

  return newCartLineElem;
}

// Update cart items
function updateCartItems() {
  var cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = ""
  if (cart.length == 0) {
    cartItems.innerHTML= "Cart is empty";
  } else {
    var cartTotal = 0;

    var cartItemsTable = document.createElement("table");
    var newTBody = document.createElement("tbody");
    cartItems.appendChild(cartItemsTable);
    cartItemsTable.appendChild(newTBody)
    for (cartline of cart) {
      var prod = products.find(function(product) {return product.name == this}, cartline.productName);
      newTBody.appendChild(createCartItem(cartline, prod));
      cartTotal += cartline.number * prod.price;
    }

    var newData;
    var newTFoot;
    var newTableRow;
    newTFoot = document.createElement("tfoot")
    newTableRow = document.createElement("tr");
    newTableRow.setAttribute("class", "totalRow");
    newData = document.createElement("td");
    newData.innerHTML = "Total";
    newTableRow.appendChild(newData);
    newData = document.createElement("td");
    newTableRow.appendChild(newData);
    newData = document.createElement("td");
    newData.innerHTML = "$";
    newTableRow.appendChild(newData);
    newData = document.createElement("td");
    newData.innerHTML = cartTotal.toFixed(2);
    newData.setAttribute("class", "currencyAmount");
    newTableRow.appendChild(newData);
    newData = document.createElement("td");
    newTableRow.appendChild(newData);
    newTFoot.appendChild(newTableRow);
    cartItemsTable.appendChild(newTFoot);
  }
}

// update Cart element (id="cart")
function updateCart() {
  var cartEmpty = document.getElementById("cart-empty");
  var cartCheckout = document.getElementById("cart-checkout");

  updateCartItems();
  if (cart.length == 0) {
    cartEmpty.style.visibility="hidden";
    cartCheckout.style.visibility="hidden";
  } else {
    cartEmpty.style.visibility="inherit";
    cartCheckout.style.visibility="inherit";
  }
}

// make 'Cart' element visible
function showCart()
{
  var cartDiv = document.getElementById("cart");
  cartDiv.style.visibility="visible";
  updateCart();

  event.preventDefault();
}

// Cart lineitem's 'Remove' button
function onClickRemove(productName) {
  var cartline = cart.findIndex(function(cartline) {
      return cartline.productName == this;
    }, productName);
  if (cartline != -1) {
    cart.splice(cartline, 1);
  }

  updateCart();
  updateCartIcon();
  saveCart();
  event.preventDefault();
}

// Cart's 'Hide' button
function onClickHide() {
  hideCart();
  event.preventDefault();
}

// Cart's 'Empty' button
function onClickEmpty() {
  emptyCart();
  hideCart();
  saveCart();
  event.preventDefault();
}

// Cart's 'Checkout' button
function onClickCheckout() {
  alert("Checkout is not yet implemented");
}

function windowOnLoad() {
  updateProductList();
  loadCart();
}


window.onload = windowOnLoad;


