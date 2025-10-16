const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const adressInput = document.getElementById("adress")
const adressWarn = document.getElementById("adress-warn")

let cart = []

// abrir janela do carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
})

// fechar janela do carrinho, quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// fechar janela do carrinho pelo botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")
        //console.log(parentButton)

    if (parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        //console.log(name)
        //console.log(price)

        addToCart(name, price)
    }
})

// função para adicionar no carrinho
function addToCart(name, price){
    //alert('O item é ' + name)

    const existingItem = cart.find(item => item.name === name)

    if (existingItem){
        // se o item existe, aumenta apenas a quantidade + 1
        console.log(existingItem)
        return
    }

    cart.push({
        name,
        price, 
        quantity: 1,
    })
}