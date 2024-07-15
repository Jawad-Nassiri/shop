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
    
    // allProductsContainer.insertAdjacentHTML('beforeend', '<div class="product"><h2 class="title">'+product.title+'</h2><img src="'+product.img+'" class="img"><div class="detail"><span class="price">' + '$' +product.price+'</span><span class="add-to-basket" onclick="addProductToBasket('+product.id+')">ADD TO CART</span></div></div>');

    allProductsContainer.insertAdjacentHTML('beforeend', 
        `<div class="product">
            <h2 class="title">${product.title}</h2>
            <img src="${product.img}" class="img">
            <div class="detail">
                <span class="price">$${product.price}</span>
                <span class="add-to-basket" onclick="addProductToBasket(${product.id})">ADD TO CART</span>
            </div>
        </div>`
    );

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

        productDetailContainer.insertAdjacentHTML('beforeend', 
            `<div class="product-detail">
                <div class="img-product">
                    <img src="${product.img}">
                </div>
                <div class="product-price">
                    <p>${product.price}</p>
                </div>
                <div class="quantity-btn">
                    <input type="number" placeholder="1" value="${product.count}" onchange="updateProductCount(${product.id}, this.value)">
                    <button onclick="removeProductFromBasket(${product.id})">REMOVE</button>
                </div>
            </div>`
        );

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