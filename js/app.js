/*====================================================
        OFFBEAT DASHBOARD
        Part 1
        LOAD DATA • STATISTICS
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        ELEMENTS
==========================*/

const todayParcel = document.getElementById("todayParcel");

const pendingParcel = document.getElementById("pendingParcel");

const shippedParcel = document.getElementById("shippedParcel");

const customerCount = document.getElementById("customerCount");

const recentOrders = document.getElementById("recentOrders");

/*==========================
        LOAD DATA
==========================*/

let parcels = JSON.parse(localStorage.getItem("customers")) || [];

/*==========================
        UPDATE DASHBOARD
==========================*/

updateStatistics();

/*==========================
        STATISTICS
==========================*/

function updateStatistics(){

    todayParcel.textContent = getTodayParcels();

    pendingParcel.textContent = getPendingParcels();

    shippedParcel.textContent = getShippedParcels();

    customerCount.textContent = getCustomerCount();

}

/*==========================
        TODAY PARCELS
==========================*/

function getTodayParcels(){

    const today = new Date().toLocaleDateString();

    return parcels.filter(parcel=>parcel.date===today).length;

}

/*==========================
        PENDING PARCELS
==========================*/

function getPendingParcels(){

    return parcels.filter(parcel=>

        (parcel.status || "").toLowerCase()==="pending"

    ).length;

}

/*==========================
        SHIPPED PARCELS
==========================*/

function getShippedParcels(){

    return parcels.filter(parcel=>

        (parcel.status || "Shipped").toLowerCase()==="shipped"

    ).length;

}

/*==========================
        CUSTOMER COUNT
==========================*/

function getCustomerCount(){

    const phones = new Set();

    parcels.forEach(parcel=>{

        phones.add(parcel.phone);

    });

    return phones.size;

}

/*==========================
        REFRESH DATA
==========================*/

function refreshData(){

    parcels = JSON.parse(localStorage.getItem("customers")) || [];

    updateStatistics();

}
/*====================================================
        OFFBEAT DASHBOARD
        Part 2
        RECENT PARCELS
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        RECENT ORDERS
==========================*/

loadRecentOrders();

function loadRecentOrders(){

    recentOrders.innerHTML = "";

    if(parcels.length === 0){

        recentOrders.innerHTML = `

            <div class="order-card">

                <div>

                    <h4>No Parcels</h4>

                    <small>Create your first parcel</small>

                </div>

            </div>

        `;

        return;

    }

    // Show newest parcels first
    const latestParcels = [...parcels]
        .reverse()
        .slice(0,5);

    latestParcels.forEach(parcel=>{

        const card = document.createElement("div");

        card.className = "order-card";

        card.innerHTML = `

            <div>

                <h4>${parcel.orderId}</h4>

                <small>${parcel.customerName}</small>

            </div>

            <span class="status ${(parcel.status || "Shipped").toLowerCase()}">

                ${parcel.status || "Shipped"}

            </span>

        `;

        recentOrders.appendChild(card);

    });

}

/*==========================
        REFRESH DASHBOARD
==========================*/

function refreshDashboard(){

    refreshData();

    loadRecentOrders();

}
/*====================================================
        OFFBEAT DASHBOARD
        Part 3
        INITIALIZATION • AUTO REFRESH
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        INITIALIZE
==========================*/

window.addEventListener("load",()=>{

    refreshDashboard();

    console.log("====================================");

    console.log(" OFFBEAT Dashboard Loaded ");

    console.log(" Developed by Nisite Webcraft ");

    console.log("====================================");

});

/*==========================
    REFRESH WHEN PAGE OPENS
==========================*/

window.addEventListener("pageshow",()=>{

    refreshDashboard();

});

/*==========================
    REFRESH ON TAB FOCUS
==========================*/

window.addEventListener("focus",()=>{

    refreshDashboard();

});

/*==========================
    STORAGE CHANGE
==========================*/

window.addEventListener("storage",()=>{

    refreshDashboard();

});

/*==========================
        HELPERS
==========================*/

function formatStatus(status){

    if(!status){

        return "Shipped";

    }

    return status;

}

/*==========================
      LAST UPDATED
==========================*/

function lastUpdated(){

    return new Date().toLocaleTimeString("en-IN",{

        hour:"2-digit",

        minute:"2-digit"

    });

}

/*==========================
      DASHBOARD READY
==========================*/

console.log(

    "OFFBEAT Parcel Management Dashboard Ready"

);

/*==========================
        END
==========================*/