let wishlist;
let page = 1;

let wishlistStr = localStorage.getItem('wishlist');

if (!wishlistStr) {
    wishlist = [];
} else {
    wishlist = JSON.parse(wishlistStr);
}


let badge = document.querySelector('#wishCount');
badge = wishlist.length;


let loadBtn = document.querySelector('.btn');

loadBtn.addEventListener('click', function () {

    LoadinPages();
    page++;

})


function LoadinPages() {
    fetch(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`)
        .then(response => response.json())
        .then(data => {
            let itemsBox = document.getElementById('items');
            data.products.forEach(element => {

                let isAdded = wishlist.some(x => x == element.id);

                let card = `
                <div class="col-md-4">
                <div class="card" style="width: 18rem;" data-id="${element.id}">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${element.title} - ${element.price}</h5>
                    <p class="card-text">${element.description}</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                      <i class="fa-${isAdded ? "solid" : "regular"} fa-heart float-end add-to-wishlist" style="cursor: pointer;color:${isAdded ? "red" : "black"}"></i>
                    </div>
                  </div>
                </div>`
                itemsBox.innerHTML += card;
            })
        }).then()

}







