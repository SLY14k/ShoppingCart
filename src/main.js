/**
 * !selecting the id shop
 */

let shop = document.getElementById('shop')

/**
 * ! array of shop inventory
 */



let generateShop =()=> {
    return shop.innerHTML= shopItemsData.map
    ((x)=>{
        let {id, name, desc, price, img} = x;
        let search = basket.find((x)=> x.id === id) || []
        return `
        <div id=product-id-${id} class="item">
                <img width="220px" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                        <i onclick='Toggle(${id})' class="bi bi-heart-fill"></i>
                            <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
    
                            <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                            <i onclick='increment(${id})' class="bi bi-plus-lg"></i>
                            
                        </div>
                    </div>
                </div>
            </div>`
    }).join("")
}

let basket = JSON.parse(localStorage.getItem('data')) || [];


/**
 * ! incrementing a particular item
 */
generateShop();
let increment = (id)=>{
    let selectedItem = id;
    
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }else {
        search.item +=1;
    }
    
    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !==0)
    
    localStorage.setItem('data', JSON.stringify(basket));
};

/**
 * !decrementing and item, returns when it hits zero
 */

let decrement = (id)=>{
    let selectedItem = id;
    
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -=1;
    }
    

    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !==0)
    
    localStorage.setItem('data', JSON.stringify(basket));

};

function Toggle(id){
    let likeButton = id;
    likeButton = document.querySelector('.bi-heart-fill');
    likeButton.addEventListener('click', e => {
        if(likeButton.style.color =='red'){
            likeButton.style.color = 'grey';
        } else{
            likeButton.style.color = 'red';
                    
        }
        
    })
    // Toggle(likeButton.id);
}

// let likeButton = document.querySelector('.bi-heart-fill');
// likeButton.addEventListener('click', e => {
//     likeButton.style.color = 'red';
// })

/**
 * 
 * !handles number update 
 */
let update = (id)=>{
    let search = basket.find((x)=>x.id === id)
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

/**
 * !calculation for number of items in cart cart
 */
let calculation = ()=> {
    let cartIcon = document.getElementById('cart-amount');
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    
};

calculation();


