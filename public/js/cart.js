
async function addtoCart(productId) {
    try {
        const res = await axios({
            method: 'post',
            url: `/user/${productId}/cart/add`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        // Optionally handle success here, e.g., display a message.
    } catch (error) {
        if (error.response.status === 401) {
            // Redirect to the login page if the user is not authenticated.
            window.location.replace('/login');
        } else {
            console.error('Error:', error);
        }
    }
}
async function removefromCart(productId) {
    try {
        const res = await axios({
            method: 'post',
            url: `/user/${productId}/cart/remove`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        // Optionally handle success here, e.g., display a message.
    } catch (error) {
        if (error.response.status === 401) {
            // Redirect to the login page if the user is not authenticated.
            window.location.replace('/login');
        } else {
            console.error('Error:', error);
        }
    }
}
async function removefromCartPermanently(productId) {
    
    try {
        const res = await axios({
            method: 'post',
            url: `/user/${productId}/cart/removepermanently`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        

        // Optionally handle success here, e.g., display a message.
    } catch (error) {
        if (error.response.status === 401) {
            // Redirect to the login page if the user is not authenticated.
            window.location.replace('/login');
        } else {
            console.error('Error:', error);
        }
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const btn1 = document.querySelector('#add-to-cart');
    const btn2 = document.querySelectorAll('.increase');
    const btn3 = document.querySelectorAll('.decrease');
    const removebtn = document.querySelectorAll('.remove-btn');
    
    if(btn1){
        btn1.addEventListener('click', (event) => {
            const productId = btn1.getAttribute('product-id');
            addtoCart(productId);
        })
    }
    
    btn2.forEach((element) => {
        if(element){
            
            element.addEventListener('click',async (event)=>{
                const productId = element.getAttribute('increase-product-id');
                await addtoCart(productId);
    
                // Update the quantity
                const itemQuantity = event.target.previousElementSibling;
                
                if(itemQuantity){
                    const currentQuantity = parseInt(itemQuantity.innerText,10);  
                    itemQuantity.innerText = currentQuantity+1;
                }
                // Update the price
                
                const individualPrice = event.target.parentElement.nextElementSibling.children[0];
                const priceElement = event.target.parentElement.nextElementSibling.children[2];
    
                if (individualPrice && priceElement) {
                    const currentPrice =  parseInt(individualPrice.innerText.split('$')[1].trim());
                    const perItemPrice = parseInt(priceElement.getAttribute('per-price'));
                    const finalPrice = currentPrice + perItemPrice;
    
                    // Update the individual total price element
                    individualPrice.innerText = `$ ${finalPrice}`;
                }
                updateTotalPrice();
                
            })

        }
    });
    btn3.forEach((element)=>{
        element.addEventListener('click', async (event) => {
            const productId = element.getAttribute('decrease-product-id');
            await removefromCart(productId); // You need a separate API call for decreasing
            //update the quantity
            
            const itemQuantity = event.target.nextElementSibling;
            if(itemQuantity){
                const currentQuantity = parseInt(itemQuantity.innerText,10);  
                itemQuantity.innerText = currentQuantity-1;
                if(parseInt(itemQuantity.innerText) === 0){ 
                    event.target.parentElement.parentElement.parentElement.remove();
                    
                }
            }   
            //update the price 
            const individualPrice = event.target.parentElement.nextElementSibling.children[0];
            const priceElement = event.target.parentElement.nextElementSibling.children[2];

            if (individualPrice && priceElement) {
                const currentPrice = parseInt(individualPrice.innerText.split('$')[1].trim());
                const perItemPrice = parseInt(priceElement.getAttribute('per-price'));
                const finalPrice = currentPrice - perItemPrice;

                // Update the individual total price element
                individualPrice.innerText = `$ ${finalPrice}`;
            }

            //update the total price 
            updateTotalPrice();


        });
    })
    removebtn.forEach((element)=>{
        if(element){

            element.addEventListener('click',async(event)=>{
                
                const productId = element.getAttribute('remove-product-id');
                await removefromCartPermanently(productId);
                event.target.parentElement.parentElement.parentElement.remove();
            })
        }
    })
    
    
    

    
});


function updateTotalPrice() {
    // Calculate the total price and update the total price element
    const individualPriceElements = document.querySelectorAll('#individual-total-price');
    let totalPrice = 0;
    individualPriceElements.forEach((element) => {
        const price = parseFloat(element.innerText.replace('$ ', ''));
        totalPrice += price;
    });

    const totalWithoutDiscountElement = document.querySelector('#total-price');
    const totalWithDiscountElement = document.querySelector('#amount-display');

    // Calculate the total price considering discount and tax
    const discount = 60.00; // Replace with your actual discount amount
    const tax = 14.00; // Replace with your actual tax amount
    const finalTotalPrice = totalPrice - discount + tax;

    if (totalWithoutDiscountElement) {
        totalWithoutDiscountElement.innerText = `$ ${totalPrice}`;
    }

    if (totalWithDiscountElement) {
        totalWithDiscountElement.innerText = `$ ${finalTotalPrice}`;
    }
}