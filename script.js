//import { document } from "postcss"

const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

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
        let totalItems = 0; // Variável para contar a quantidade total de itens

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

                
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
              
            </div>
           `
            // calculando o valor do carrinho
           total += item.price * item.quantity;
           totalItems += item.quantity; // Soma a quantidade de cada item

           cartItemsContainer.appendChild(cartItemElement)
        })

            // configuração do padrão da moeda
        cartTotal.textContent = total.toLocaleString("pt-BR", {
            style: "currency", 
            currency: "BRL"
        });

        // indica a quantidade de itens do carrinho
        cartCounter.innerHTML = totalItems;

    }


// função para remover objeto do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if (event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1){
        const item = cart[index];
        
        // bloco if - diminui a quantidade do item da lista, se maior que 1 
        if (item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }   
        
        // remove o item da lista, por ser igual a 1
        cart.splice(index, 1);
        updateCartModal();
    
    }
}

// função para esconder o alerta 'em vermelho' quando houver input
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if (inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")

    }
})

// finalizar pedido
checkoutBtn.addEventListener("click", function(){

   // aviso sobre horário de atendimento 
   const isOpen = checkRestaurantOpen();
   if (!isOpen){

        Toastify({
            text: "Restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();

        return;    
    }

    if(cart.length === 0) return;
    if (addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    // enviar o pedido para api whats
    const cartItens = cart.map((item) => {
        return (` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join ("")

    const message = encodeURIComponent(cartItens)
    const phone = "18992788677"

    window.open(`https://wa.me/${phone}? text=${message} Endereço: ${addressInput.value}, "_blank"`)

    // zerar o carrinho
    cart = []
    updateCartModal();
})


// verificar a hora e manipular o card horário
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
    // true = restaurante está aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("border-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}