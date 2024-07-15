let allProducts = [
    {id: 1, title: 'V-neck T-shirt', price: 20, img: 'images/f1.jfif', count: 1},
    {id: 2, title: 'Crew Neck T-shirt', price: 25, img: 'images/f2.jfif', count: 1},
    {id: 3, title: 'Polo T-shirt', price: 30, img: 'images/f3.jfif', count: 1},
    {id: 4, title: 'Long Sleeve T-shirt', price: 35, img: 'images/f4.jfif', count: 1},
];

let userBasket = [];

let container = document.querySelector('.container');
let allProductsContainer = document.querySelector('.products');
let productDetailContainer = document.querySelector('.product-detail-container');
let totalPriceElement = document.querySelector('.total-price')


let $ = document.createElement.bind(document);

allProducts.forEach(function(product){

    let productContainer = $('div');
    productContainer.classList.add('product');

    let titleProduct = $('h2');
    titleProduct.innerHTML = product.title;
    titleProduct.classList.add('title');

    let productImage = $('img');
    productImage.src = product.img;
    productImage.classList.add('img');

    let detailsProductContainer = $('div');
    detailsProductContainer.classList.add('detail');

    let priceProduct = $('span');
    priceProduct.innerHTML = product.price;
    priceProduct.classList.add('price');

    let addToBasketBtn = $('span');
    addToBasketBtn.innerHTML = 'ADD TO CART';
    addToBasketBtn.classList.add('add-to-basket');
    addToBasketBtn.addEventListener('click', function(){
        addProductToBasket(product.id);
    })

    detailsProductContainer.append(priceProduct, addToBasketBtn);

    productContainer.append(titleProduct, productImage, detailsProductContainer);

    allProductsContainer.append(productContainer);
});

function addProductToBasket(productId){

    let mainProduct = allProducts.find(function(product){
        return product.id === productId;
    });

    userBasket.push(mainProduct);
    basketProductGenerator(userBasket);
    calcTotalPrice(userBasket);
}



function basketProductGenerator(userBasketArray) {
    productDetailContainer.innerHTML = '';

    userBasketArray.forEach(function (product) {
        let productDetailsContainer = $('div');
        productDetailsContainer.classList.add('product-detail');

        let productImageContainer = $('div');
        productImageContainer.classList.add('img-product');

        let productImage = $('img');
        productImage.src = product.img;

        productImageContainer.append(productImage);

        let productPriceContainer = $('div');
        productPriceContainer.classList.add('product-price');

        let productPrice = $('p');
        productPrice.innerHTML = product.price;

        productPriceContainer.append(productPrice);

        let quantityAndBtnContainer = $('div');
        quantityAndBtnContainer.classList.add('quantity-btn');

        let quantityInput = $('input');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('placeholder', '1');
        quantityInput.value = product.count;
        quantityInput.addEventListener('change', function(){
            updateProductCount(product.id, quantityInput.value);
        })


        let removeBtn = $('button');
        removeBtn.innerHTML = 'REMOVE';
        removeBtn.addEventListener('click', function(){
            removeProductFromBasket(product.id);
        })

        quantityAndBtnContainer.append(quantityInput, removeBtn);

        productDetailsContainer.append(productImageContainer, productPriceContainer, quantityAndBtnContainer);
        productDetailContainer.append(productDetailsContainer);
    });
}


function removeProductFromBasket(productId){
    userBasket = userBasket.filter(function(product){
        return product.id !==  productId;
    });
    basketProductGenerator(userBasket);
}

function calcTotalPrice(userArrayBasket){
    let sum = 0;
    userArrayBasket.forEach(function(product){
        sum += product.price * product.count;
    })
    totalPriceElement.innerHTML = '$' + sum;
}


function updateProductCount(productId, newCount){
    userBasket.forEach(function(product){
        if(product.id === productId){
            product.count = newCount;
        }
    })
    calcTotalPrice(userBasket);
}