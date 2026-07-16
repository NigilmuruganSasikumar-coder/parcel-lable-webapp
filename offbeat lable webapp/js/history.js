/*====================================================
        OFFBEAT PARCEL HISTORY
        Part 1
        LOAD • RENDER TABLE
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        ELEMENTS
==========================*/

const historyTable = document.getElementById("historyTable");

const searchInput = document.getElementById("searchInput");

const emptyState = document.getElementById("emptyState");

const filterButtons = document.querySelectorAll(".filter-btn");

/*==========================
        LOAD DATA
==========================*/

let customers =
    JSON.parse(localStorage.getItem("customers")) || [];

let filteredCustomers = [...customers];

/*==========================
        RENDER TABLE
==========================*/

renderTable(filteredCustomers);

function renderTable(data){

    historyTable.innerHTML = "";

    if(data.length === 0){

        historyTable.innerHTML = "";

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";

    data.forEach((parcel,index)=>{

        const row = document.createElement("tr");

        row.innerHTML = `

        <td class="order-id">

            ${parcel.orderId}

        </td>

        <td class="customer-name">

            ${parcel.customerName}

        </td>

        <td class="product">

            ${parcel.product}

        </td>

        <td>

            <span class="courier">

                ${parcel.courier}

            </span>

        </td>

        <td class="date">

            ${parcel.date}

        </td>

        <td>

            <div
                class="qr-box"
                id="qr-${parcel.orderId}">
            </div>

        </td>

        <td>

            <div class="actions">

                <button
                    class="view-btn"
                    data-order="${parcel.orderId}">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button
                    class="print-btn"
                    data-order="${parcel.orderId}">

                    <i class="fa-solid fa-print"></i>

                </button>

                <button
                    class="delete-btn"
                    data-order="${parcel.orderId}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </td>

        `;

        historyTable.appendChild(row);

    });

    generateAllQR(data);

    attachButtonEvents();

}
/*====================================================
        OFFBEAT PARCEL HISTORY
        Part 2
        QR • SEARCH • FILTER
        Developed by Nisite Webcraft
====================================================*/

/*==========================
      GENERATE ALL QR
==========================*/

function generateAllQR(data){

    data.forEach((parcel,index)=>{

        const qrContainer = document.getElementById(`qr-${parcel.orderId}`);

        if(!qrContainer) return;

        qrContainer.innerHTML = "";

        const qrText =

`OFFBEAT

${parcel.customerName}

${parcel.phone}

${parcel.product}

${parcel.size}

Qty:${parcel.qty}

Tracking:${parcel.tracking}`;

        new QRCode(qrContainer,{

            text:qrText,

            width:45,

            height:45,

            colorDark:"#000000",

            colorLight:"#ffffff",

            correctLevel:QRCode.CorrectLevel.M

        });

    });

}

/*==========================
        SEARCH
==========================*/

searchInput.addEventListener("keyup",()=>{

    const keyword = searchInput.value
        .toLowerCase()
        .trim();

    filteredCustomers = customers.filter(parcel=>{

        return(

            parcel.orderId.toLowerCase().includes(keyword) ||

            parcel.customerName.toLowerCase().includes(keyword) ||

            parcel.phone.toLowerCase().includes(keyword) ||

            parcel.product.toLowerCase().includes(keyword) ||

            parcel.courier.toLowerCase().includes(keyword) ||

            parcel.tracking.toLowerCase().includes(keyword)

        );

    });

    renderTable(filteredCustomers);

});

/*==========================
        FILTER
==========================*/

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const type = button.dataset.filter;

        filterData(type);

    });

});

/*==========================
      FILTER FUNCTION
==========================*/

function filterData(type){

    if(type==="all"){

        filteredCustomers = [...customers];

        renderTable(filteredCustomers);

        return;

    }

    const today = new Date();

    filteredCustomers = customers.filter(parcel=>{

        const parcelDate = new Date(parcel.date);

        if(type==="today"){

            return(

                parcelDate.toDateString()===today.toDateString()

            );

        }

        if(type==="week"){

            const diff =

            (today - parcelDate) /

            (1000*60*60*24);

            return diff<=7;

        }

    });

    renderTable(filteredCustomers);

}
/*====================================================
        OFFBEAT PARCEL HISTORY
        Part 3
        ACTIONS • HELPERS • INITIALIZATION
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        BUTTON EVENTS
==========================*/

function attachButtonEvents(){

    document.querySelectorAll(".view-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            const orderId = button.dataset.order;

            viewParcel(orderId);

        });

    });

    document.querySelectorAll(".print-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            const orderId = button.dataset.order;

            printParcel(orderId);

        });

    });

    document.querySelectorAll(".delete-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            const orderId = button.dataset.order;

            deleteParcel(orderId);

        });

    });

}

/*==========================
        VIEW
==========================*/

function viewParcel(orderId){

    const parcel = customers.find(p=>p.orderId===orderId);

    if(!parcel) return;

    localStorage.setItem(

        "currentParcel",

        JSON.stringify(parcel)

    );

    window.location.href="label-v2.html";

}

/*==========================
        PRINT
==========================*/

function printParcel(orderId){

    const parcel = customers.find(p=>p.orderId===orderId);

    if(!parcel) return;

    localStorage.setItem(

        "currentParcel",

        JSON.stringify(parcel)

    );

    window.open("label-v2.html","_blank");

}

/*==========================
        DELETE
==========================*/

function deleteParcel(orderId){

    const confirmDelete = confirm(

        "Delete this parcel?"

    );

    if(!confirmDelete) return;

    customers = customers.filter(

        parcel=>parcel.orderId!==orderId

    );

    localStorage.setItem(

        "customers",

        JSON.stringify(customers)

    );

    filteredCustomers = [...customers];

    renderTable(filteredCustomers);

}

/*==========================
        INITIALIZATION
==========================*/

window.addEventListener("load",()=>{

    renderTable(filteredCustomers);

    console.log("====================================");

    console.log(" OFFBEAT Parcel History Loaded ");

    console.log(" Developed by Nisite Webcraft ");

    console.log("====================================");

});