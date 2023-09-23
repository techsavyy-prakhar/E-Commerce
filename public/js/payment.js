

async function makeOrder(amount) {
    try {

        const res = await axios({
            method: 'post',
            data: { amount },
            url: `/order`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        const options = {
            "key": "rzp_test_CKhdNh4a0I4LDl", // Enter the Key ID generated from the Dashboard
            "amount": res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ecommerce Corp",
            "description": "Test Transaction",
            "image": "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:8000/payment-verify/",
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } 
    catch (e) {
        
        window.location.replace('/login');
    }

}
const btn = document.querySelector('#buy-btn');
btn.addEventListener('click', () => {
    const amount = document.querySelector('#amount-display').innerText.split(' ')[1];
    makeOrder(amount);
})