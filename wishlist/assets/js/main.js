
let wishCount = document.getElementById('wishCount');
let page = 1;
let list = document.getElementById('list')
let search =document.getElementById('search')
if(wishCount){
    loadProducts(page)
}

let wishlist
let wishlistStr = localStorage.getItem('wishlist');

if(wishlistStr)
    wishlist = JSON.parse(wishlistStr);
else
    wishlist = []

if(wishCount)
    wishCount.innerText = wishlist.length;


    let loadBtn = document.getElementById('loadBtn');
    if(loadBtn){
        document.getElementById('loadBtn').addEventListener('click', function (e) {
            page++;
            loadProducts(page)
        })
    }


search.addEventListener('input' ,function(){
    let oldli = document.querySelectorAll('#list li')
    oldli.forEach(x=>{
        x.remove();
    })

    fetch(`https://dummyjson.com/products/search?q=${search.value}`)
        .then(response => response.json())
        .then(data => {
            data.products.forEach(y=>{
                let li = ` <li class="list-group-item"> ${y.brand}--------------${y.title}/li>`
                list.innerHTML+=li
            })

        })
})

search.addEventListener('blur' ,function(){
  list.style.display = 'none'
})

function loadProducts(page) {
    fetch(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`)
        .then(response => response.json())
        .then(data => {

            let itemsBox = document.getElementById('items');
            data.products.forEach(element => {

                let isAdded = wishlist.some(x=>x==element.id);

                let card = `
                <div class="col-md-4">
                <div class="card" style="width: 18rem;" data-id="${element.id}">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${element.title} - ${element.price}</h5>
                    <p class="card-text">${element.description}</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                      <i class="fa-${isAdded?"solid":"regular"} fa-heart float-end add-to-wishlist" style="cursor: pointer;color:${isAdded?"red":"black"}"></i>
                    </div>
                  </div>
                </div>`
                itemsBox.innerHTML+=card;
            })
        }).then(()=>{
            document.querySelectorAll('.add-to-wishlist').forEach(elem=>{
                elem.addEventListener('click',function(e){
                    let id = this.parentNode.parentNode.getAttribute('data-id');
                   

                    let itemIndex = wishlist.indexOf(id);

                    if(itemIndex==-1){
                        wishlist.push(id);
                        this.classList.remove('fa-regular')
                        this.classList.add('fa-solid')
                        this.style.color = "red";
                    }
                    else{
                        wishlist.splice(itemIndex,1);
                        this.classList.remove('fa-solid')
                        this.classList.add('fa-regular')
                        this.style.color = "black";
                    }

                    wishCount.innerText = wishlist.length;
                    localStorage.setItem('wishlist',JSON.stringify(wishlist));
                })
            })
        })
}