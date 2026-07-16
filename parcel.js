// ==========================================
// OFFBEAT Parcel Management
// parcel.js
// Developed by Nisite Webcraft
// ==========================================

// ---------- Elements ----------

const form = document.getElementById("parcelForm");

const orderId = document.getElementById("orderId");

const customerName = document.getElementById("customerName");

const phone = document.getElementById("phone");

const address = document.getElementById("address");

const city = document.getElementById("city");

const district = document.getElementById("district");

const state = document.getElementById("state");

const pincode = document.getElementById("pincode");

const product = document.getElementById("product");

const size = document.getElementById("size");

const color = document.getElementById("color");

const qty = document.getElementById("qty");

const weight = document.getElementById("weight");

const courier = document.getElementById("courier");

const tracking = document.getElementById("tracking");

const payment = document.getElementById("payment");

const amount = document.getElementById("amount");

const notes = document.getElementById("notes");

const saveBtn = document.getElementById("saveBtn");

const labelBtn = document.getElementById("labelBtn");


// ==========================================
// Generate Order ID
// ==========================================

generateOrderID();

function generateOrderID(){

    let last = localStorage.getItem("lastOrder");

    if(last == null){

        last = 1;

    }else{

        last = Number(last) + 1;

    }

    localStorage.setItem("lastOrder", last);

    orderId.value = "OB" + String(last).padStart(6,"0");

}


// ==========================================
// Auto Fill Customer
// ==========================================

phone.addEventListener("keyup",()=>{

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    let customer = customers.find(c => c.phone === phone.value);

    if(customer){

        customerName.value = customer.customerName;

        address.value = customer.address;

        city.value = customer.city;

        district.value = customer.district;

        state.value = customer.state;

        pincode.value = customer.pincode;

    }

});


// ==========================================
// Save Customer
// ==========================================

saveBtn.addEventListener("click",()=>{

    if(customerName.value==""){

        alert("Enter Customer Name");

        return;

    }

    if(phone.value.length!=10){

        alert("Enter Valid Phone Number");

        return;

    }

    if(address.value==""){

        alert("Enter Address");

        return;

    }

    const customer={

        orderId:orderId.value,

        customerName:customerName.value,

        phone:phone.value,

        address:address.value,

        city:city.value,

        district:district.value,

        state:state.value,

        pincode:pincode.value,

        product:product.value,

        size:size.value,

        color:color.value,

        qty:qty.value,

        weight:weight.value,

        courier:courier.value,

        tracking:tracking.value,

        payment:payment.value,

        amount:amount.value,

        notes:notes.value,

        date:new Date().toLocaleDateString()

    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    customers.push(customer);

    localStorage.setItem("customers",JSON.stringify(customers));

    alert("Customer Saved Successfully ✅");

});


// ==========================================
// Generate Label
// ==========================================

labelBtn.addEventListener("click",()=>{

    const parcel={

        orderId:orderId.value,

        customerName:customerName.value,

        phone:phone.value,

        address:address.value,

        city:city.value,

        district:district.value,

        state:state.value,

        pincode:pincode.value,

        product:product.value,

        size:size.value,

        color:color.value,

        qty:qty.value,

        weight:weight.value,

        courier:courier.value,

        tracking:tracking.value,

        payment:payment.value,

        amount:amount.value,

        notes:notes.value,

        status:"Shipped",

        date:new Date().toLocaleDateString()

    };

    localStorage.setItem("currentParcel",JSON.stringify(parcel));

    window.location.href="label-v2.html";

});


// ==========================================
// Reset Form
// ==========================================

form.addEventListener("reset",()=>{

    setTimeout(()=>{

        generateOrderID();

    },100);

});


// ==========================================
// Phone Validation
// ==========================================

phone.addEventListener("input",()=>{

    phone.value = phone.value.replace(/\D/g,"");

    phone.value = phone.value.slice(0,10);

});


// ==========================================
// Amount Validation
// ==========================================

amount.addEventListener("input",()=>{

    if(amount.value < 0){

        amount.value = "";

    }

});


// ==========================================
// Quantity Validation
// ==========================================

qty.addEventListener("input",()=>{

    if(qty.value <=0){

        qty.value = 1;

    }

});