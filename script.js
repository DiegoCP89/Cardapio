//import { document } from "postcss"

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
    updateCartModal();
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
        // console.log(existingItem)
        existingItem.quantity += 1
    } else {

        cart.push({
        name,
        price, 
        quantity: 1,
        })
    }
    
    updateCartModal()
}

    // atualiza o carrinho
    function updateCartModal(){
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item =>{
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

            cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium"> ${item.name}</p>
                    <p> Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2"> R$ ${item.price.toFixed(2)}</p>
                </div>

                
                <button>
                    Remover
                </button>
              
            </div>
           `
           cartItemsContainer.appendChild(cartItemElement)
        })

    }