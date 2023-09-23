//Insert Dummy Data into Database
const Product = require('./models/Product');




const dummyData = [
    {
        Name:'Drone',
        Image:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        Price: 200,
        Description: 'An unmanned aerial vehicle (UAV), commonly known as a drone, is an aircraft without any human pilot, crew, or passengers on board. UAVs were originally developed through the twentieth century for military missions too "dull, dirty or dangerous"[1] for humans, and by the twenty-first, they had become essential assets to most militaries. '

    },
    {
        Name: 'Iphone',
        Image:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        Price: 100,
        Description:'Powerful. Beautiful. Durable. Check out the new iPhone 14 Pro, iPhone 14 Pro Max, iPhone 14, iPhone 14 Plus, and iPhone SE.'
    },
    {
        Name: 'MacBook',
        Image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80',
        Price: 115,
        Description: 'Save on Mac with education pricing. Plus get AirPods. Terms apply. Customise your Mac. Build it just the way you want.'
    },
    {
        Name: 'Adidas Sneakers',
        Image: 'https://images.unsplash.com/photo-1533228067526-c21a6e8eaad7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80',
        Price: 40,
        Description: 'It is the season to shop for summer articles, Travel and relax in adidas athleisure. Seasons biggest sale on biggest discount is here, from 28th to 31st July only. adidas® Official Shop. Free Shipping.'
    },
    {
        Name: 'Headphone',
        Image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        Price: 80,
        Description:'Bluetooth enabled headphones with mic. Get the best brands. Great sound quality. Buy now. Easy & Fast Delivery. Great Offers. No Cost EMI Available. Huge Selection. Low Prices. Best Deals. Top Brands.'
    }
]

async function seedData(){
    await Product.create(dummyData);
    console.log('Db Seeded');
}

seedData();