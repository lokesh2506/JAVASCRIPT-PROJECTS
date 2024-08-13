const iconCart=document.querySelector(".icon-cart");
const closeCart=document.querySelector('.close');
const body=document.querySelector('body');
const listProductHTML=document.querySelector(".listProduct");
const listCartHTML=document.querySelector(".listCart");
const iconCartSpan=document.querySelector(".icon-cart span");


let listProducts=[];
let cart=[];


iconCart.addEventListener('click',()=>{
   body.classList.toggle("showCart")
})

const addDataToHTML=()=>{
    listProductHTML.innerHTML='';
    if(listProducts.length>0){
        listProducts.forEach(products=>{
            const newProduct=document.createElement('div');
            newProduct.dataset.id=products.id;
            newProduct.classList.add('item');
            newProduct.innerHTML=`
            <img src="${products.image}" alt="">
            <h2>${products.name}</h2>
            <div class="price">$ ${products.price}</div>
            <button class="addCart">
            Add To Cart
            </button>
            `;
            listProductHTML.append(newProduct);
        })
    }
    
}
const addToCart=(product_id)=>{
    let positionThisProductInCart=cart.findIndex((value)=>value.product_id==product_id);
    if(cart.length<=0){
        cart=[{
                product_id:product_id,
                Quantity:1
            }]
    }
    else if(positionThisProductInCart<0){
        cart.push({
            product_id:product_id,
            Quantity:1
        });
    }
    else{
        cart[positionThisProductInCart].Quantity=cart[positionThisProductInCart].Quantity+1;
    }
    addcartToHTML();

}
const addcartToHTML=()=>{
    let totalQuantity=0;
    listCartHTML.innerHTML="";
    if(cart.length>0){
        cart.forEach(ct=>{
            totalQuantity=totalQuantity+ ct.Quantity;
            let newCart=document.createElement('div');
            newCart.dataset.id=ct.product_id;
            let positionProduct=listProducts.findIndex((value)=>value.id==ct.product_id);
            let info=listProducts[positionProduct];
            newCart.classList.add('item');
            newCart.innerHTML=`
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$ ${info.price}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${ct.Quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listCartHTML.append(newCart);
        })
    }
    iconCartSpan.innerText=totalQuantity;
}


listProductHTML.addEventListener('click',(event)=>{
    let targetElement=event.target;
    if(targetElement.classList.contains('addCart')){
        let product_id=targetElement.parentElement.dataset.id;
        addToCart(product_id);
    }
})



const initApp=()=>{
    fetch('data.json').then(response=>response.json()).then(data=>{
        listProducts=data;
        addDataToHTML();
    }
    )
}
initApp();

listCartHTML.addEventListener('click',(event)=>{
    let targetElement=event.target;
    if(targetElement.classList.contains('plus')){
        let parentProductId=targetElement.parentElement.parentElement.dataset.id;
        let ProductIndex=cart.findIndex((value)=>value.product_id==parentProductId);
        cart[ProductIndex].Quantity=cart[ProductIndex].Quantity+1;
        addcartToHTML();
        
    }
})

listCartHTML.addEventListener('click',(event)=>{
    let targetElement=event.target;
    if(targetElement.classList.contains('minus')){
        let parentProductId=targetElement.parentElement.parentElement.dataset.id;
        let ProductIndex=cart.findIndex((value)=>value.product_id==parentProductId);
        cart.splice(ProductIndex,1 );
        addcartToHTML();
        
    }
})

