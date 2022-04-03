var menuItems = document.getElementById("menuItems");
var allContent = document.getElementById("allContent");
var allProducts = document.getElementById("allProducts");
var productSection = document.getElementById("productSection");
var headerBackground = document.getElementById("header");
var headerImg = document.getElementById("bigImage");
var cartOpen = document.getElementById("cart");
        
menuItems.style.maxHeight = "0px";

function menu(){
    if(menuItems.style.maxHeight == "0px"){
        menuItems.style.maxHeight = "200px";
    }
    else{
        menuItems.style.maxHeight = "0px";
    }
}

function homePageOpen(){
    productSection.setAttribute("style", "display: none;");
    cartOpen.setAttribute("style", "display: none;");
    allProducts.setAttribute("style", "display: none");
    allContent.setAttribute("style", "display: block;");
    headerImg.setAttribute("style", "display: block;");
    headerBackground.setAttribute("style", "background-color: #dfe0db");
}

function productsPageOpen(){
    allContent.setAttribute("style", "display: none;");
    headerImg.setAttribute("style", "display: none;");
    headerBackground.setAttribute("style", "background-color: white");
    productSection.setAttribute("style", "display: none;");
    cartOpen.setAttribute("style", "display: none;");
    allProducts.setAttribute("style", "display: block");
    }
function cartt(){
    allContent.setAttribute("style", "display: none;");
    headerImg.setAttribute("style", "display: none;");
    headerBackground.setAttribute("style", "background-color: white");
    productSection.setAttribute("style", "display: none;");
    allProducts.setAttribute("style", "display: none");
    cartOpen.setAttribute("style", "display: block;");
}
function setProductProperties(image, title, price){
    allContent.setAttribute("style", "display: none;");
    allProducts.setAttribute("style", "display: none;");
    cartOpen.setAttribute("style", "display: none;");
    productSection.setAttribute("style", "display: none;");
    allProducts.setAttribute("style", "display: none");
    productSection.setAttribute("style", "display: block;");
    var removeProduct = document.getElementsByClassName('colSingle')[0];
    if(removeProduct != undefined){
        removeProduct.remove();
    }
    var removeProduct = document.getElementsByClassName('colSingle')[0];
    if(removeProduct != undefined){
        removeProduct.remove();
    }
    var removeBtn = document.getElementsByClassName('addBtn')[0];
    if(removeBtn != undefined){
        removeBtn.remove();
    }
    var productBox = document.createElement('div');
    productBox.classList.add('colSingle')
    var product = document.getElementsByClassName('productRow')[0];
    
    var productBoxContent = `<img src="${document.getElementsByClassName(image)[0].src}" width="100%" class="productImg">`
    productBox.innerHTML = productBoxContent;
    product.append(productBox);
    var productBox1 = document.createElement('div');
    productBox1.classList.add('colSingle')
    var productBoxContent1 = 
                            `<h1 class="productTitle">${document.getElementById(title).innerText}</h1>
                            <h4 class="productPrice">${document.getElementById(price).innerText}</h4>
                            <select>
                                <option>Select Size</option>
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select>
                            <input type="number" value="1" style="margin-top: 20px;" class="productQuantity">`
    productBox1.innerHTML = productBoxContent1;
    product.append(productBox1);
    var productBox2 = document.createElement('i');
    productBox2.classList.add('addBtn')
    productBox2.setAttribute("style", "margin: 0px 0px 20px 170px;");
    productBox2.setAttribute("onclick", "events()");
    var product = document.getElementsByClassName('productRow')[0];
    var productBoxContent = `Add To Cart`
    productBox2.innerHTML = productBoxContent;
    product.append(productBox2);
}
function events(){
    var removeCartButtons = document.getElementsByClassName('cartProductRemove')
    for(var i = 0;i < removeCartButtons.length;i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('productQuantity');
    for(var i = 0;i < quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    var addCart = document.getElementsByClassName('addBtn');
    for(var i = 0;i < addCart.length;i++){
        var button = addCart[i];
        addCartClicked(button);
    }
}
function addCartClicked(event){
    var button = event;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName('productTitle')[0].innerText;
    var price = shopProduct.getElementsByClassName('productPrice')[0].innerText;
    var image = shopProduct.getElementsByClassName('productImg')[0].src;
    var quantity = shopProduct.getElementsByClassName('productQuantity')[0].value;
    addProductToCart(title, price, image, quantity);
    updateTotal();
}
function addProductToCart(title, price, image, quantity){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('product');
    var cartItems = document.getElementsByClassName('products')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cartProductTitle');
    for(var i = 0;i < cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent =
                        `<img src="${image}">
                        <div class="productInfo">
                            <p class="cartProductTitle">${title}</p>
                            <p class="cartProductPrice">Price: ${price}</p>
                            <p>Quantity: <input type="number" value="${quantity}" class="cartProductQuantity"></p>
                        </div>
                        <i class="cartProductRemove">Remove</i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cartProductRemove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cartProductQuantity')[0].addEventListener('change', quantityChanged);
}
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
function buyPage(){
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('overlay');
    popup.setAttribute("style", "display: block;");
    overlay.setAttribute("style", "z-index: 1;");

}
function popupClose(){
    var popup = document.getElementById('popup');
    popup.setAttribute("style", "display: none;");
}
function confirmBuy(){
    var cartContent = document.getElementsByClassName('products')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
function updateTotal(){
    var cartProducts = document.getElementsByClassName('cartContent')[0];
    var cartProduct = cartProducts.getElementsByClassName('product');
    var total = 0;
    
    for(var i = 0;i < cartProduct.length;i++){
        var cartBox = cartProduct[i]
        var priceElement = cartBox.getElementsByClassName('cartProductPrice')[0];
        var quantityElement = cartBox.getElementsByClassName('cartProductQuantity')[0];
        var price = parseFloat(priceElement.innerText.replace("Price: $", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('totalPrice')[0].innerText = '$' + total;
}

function addNewProduct(){
    console.log("working");
    var newProductBox = document.createElement('div');
    newProductBox.classList.add('col');
    var newProductItems = document.getElementsByClassName('newProduct')[0];
    var productBoxContent =
                        `<a><img src="https://w7.pngwing.com/pngs/559/670/png-transparent-suit-jacket-coat-clothing-blazer-jacket-fashion-formal-wear-red.png" onclick="setProductProperties('image1', 'title1', 'price1')" class="image1"></a>
                        <h4 id="title1">Worsted virgin wool jacket with satin lapels</h4>
                        <p id="price1">$1095.00</p>`;
    newProductBox.innerHTML = productBoxContent;
    newProductItems.append(newProductBox);
}