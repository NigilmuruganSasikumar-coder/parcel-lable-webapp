/*====================================================
        OFFBEAT SETTINGS
        Part 1
        LOAD DATA • STORAGE INFO
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        ELEMENTS
==========================*/

const totalParcels = document.getElementById("totalParcels");

const totalCustomers = document.getElementById("totalCustomers");

const lastOrder = document.getElementById("lastOrder");

const storageUsed = document.getElementById("storageUsed");

const exportBtn = document.getElementById("exportBtn");

const importBtn = document.getElementById("importBtn");

const importFile = document.getElementById("importFile");

const autoPrint = document.getElementById("autoPrint");

const autoSave = document.getElementById("autoSave");

const darkMode = document.getElementById("darkMode");

const resetParcelBtn = document.getElementById("resetParcelBtn");

const resetOrderBtn = document.getElementById("resetOrderBtn");

const factoryResetBtn = document.getElementById("factoryResetBtn");

/*==========================
        LOAD STORAGE
==========================*/

let parcels = JSON.parse(localStorage.getItem("customers")) || [];

let lastOrderNumber = Number(localStorage.getItem("lastOrder")) || 0;

/*==========================
      UPDATE SETTINGS
==========================*/

updateSettings();

function updateSettings(){

    loadParcelCount();

    loadCustomerCount();

    loadLastOrder();

    calculateStorage();

    loadPreferences();

}

/*==========================
      TOTAL PARCELS
==========================*/

function loadParcelCount(){

    totalParcels.textContent = parcels.length;

}

/*==========================
      TOTAL CUSTOMERS
==========================*/

function loadCustomerCount(){

    const uniqueCustomers = new Set();

    parcels.forEach(parcel=>{

        uniqueCustomers.add(parcel.phone);

    });

    totalCustomers.textContent = uniqueCustomers.size;

}

/*==========================
      LAST ORDER
==========================*/

function loadLastOrder(){

    if(lastOrderNumber===0){

        lastOrder.textContent = "OB000000";

        return;

    }

    lastOrder.textContent =

        "OB" +

        String(lastOrderNumber).padStart(6,"0");

}

/*==========================
      STORAGE SIZE
==========================*/

function calculateStorage(){

    let total = 0;

    for(let key in localStorage){

        if(localStorage.hasOwnProperty(key)){

            total +=

            localStorage[key].length;

        }

    }

    const kb = (total / 1024).toFixed(2);

    storageUsed.textContent = kb + " KB";

}

/*==========================
      LOAD SETTINGS
==========================*/

function loadPreferences(){

    autoPrint.checked =

        localStorage.getItem("autoPrint") === "true";

    autoSave.checked =

        localStorage.getItem("autoSave") === "true";

    darkMode.checked =

        localStorage.getItem("darkMode") === "true";

}

/*==========================
      REFRESH DATA
==========================*/

function refreshSettings(){

    parcels = JSON.parse(localStorage.getItem("customers")) || [];

    lastOrderNumber = Number(localStorage.getItem("lastOrder")) || 0;

    updateSettings();

}
/*====================================================
        OFFBEAT SETTINGS
        Part 1
        LOAD DATA • STORAGE INFO
        Developed by Nisite Webcraft
====================================================*/

/*==========================
        ELEMENTS
==========================*/

const totalParcels = document.getElementById("totalParcels");

const totalCustomers = document.getElementById("totalCustomers");

const lastOrder = document.getElementById("lastOrder");

const storageUsed = document.getElementById("storageUsed");

const exportBtn = document.getElementById("exportBtn");

const importBtn = document.getElementById("importBtn");

const importFile = document.getElementById("importFile");

const autoPrint = document.getElementById("autoPrint");

const autoSave = document.getElementById("autoSave");

const darkMode = document.getElementById("darkMode");

const resetParcelBtn = document.getElementById("resetParcelBtn");

const resetOrderBtn = document.getElementById("resetOrderBtn");

const factoryResetBtn = document.getElementById("factoryResetBtn");

/*==========================
        LOAD STORAGE
==========================*/

let parcels = JSON.parse(localStorage.getItem("customers")) || [];

let lastOrderNumber = Number(localStorage.getItem("lastOrder")) || 0;

/*==========================
      UPDATE SETTINGS
==========================*/

updateSettings();

function updateSettings(){

    loadParcelCount();

    loadCustomerCount();

    loadLastOrder();

    calculateStorage();

    loadPreferences();

}

/*==========================
      TOTAL PARCELS
==========================*/

function loadParcelCount(){

    totalParcels.textContent = parcels.length;

}

/*==========================
      TOTAL CUSTOMERS
==========================*/

function loadCustomerCount(){

    const uniqueCustomers = new Set();

    parcels.forEach(parcel=>{

        uniqueCustomers.add(parcel.phone);

    });

    totalCustomers.textContent = uniqueCustomers.size;

}

/*==========================
      LAST ORDER
==========================*/

function loadLastOrder(){

    if(lastOrderNumber===0){

        lastOrder.textContent = "OB000000";

        return;

    }

    lastOrder.textContent =

        "OB" +

        String(lastOrderNumber).padStart(6,"0");

}

/*==========================
      STORAGE SIZE
==========================*/

function calculateStorage(){

    let total = 0;

    for(let key in localStorage){

        if(localStorage.hasOwnProperty(key)){

            total +=

            localStorage[key].length;

        }

    }

    const kb = (total / 1024).toFixed(2);

    storageUsed.textContent = kb + " KB";

}

/*==========================
      LOAD SETTINGS
==========================*/

function loadPreferences(){

    autoPrint.checked =

        localStorage.getItem("autoPrint") === "true";

    autoSave.checked =

        localStorage.getItem("autoSave") === "true";

    darkMode.checked =

        localStorage.getItem("darkMode") === "true";

}

/*==========================
      REFRESH DATA
==========================*/

function refreshSettings(){

    parcels = JSON.parse(localStorage.getItem("customers")) || [];

    lastOrderNumber = Number(localStorage.getItem("lastOrder")) || 0;

    updateSettings();

}
/*====================================================
        OFFBEAT SETTINGS
        Part 2
        BACKUP • IMPORT • PREFERENCES
        Developed by Nisite Webcraft
====================================================*/

/*==========================
      EXPORT BACKUP
==========================*/

exportBtn.addEventListener("click",exportBackup);

function exportBackup(){

    const backup={

        customers:JSON.parse(localStorage.getItem("customers")) || [],

        lastOrder:localStorage.getItem("lastOrder") || 0,

        autoPrint:localStorage.getItem("autoPrint") || "false",

        autoSave:localStorage.getItem("autoSave") || "false",

        darkMode:localStorage.getItem("darkMode") || "false",

        backupDate:new Date().toLocaleString()

    };

    const blob=new Blob(

        [JSON.stringify(backup,null,4)],

        {

            type:"application/json"

        }

    );

    const url=URL.createObjectURL(blob);

    const link=document.createElement("a");

    link.href=url;

    link.download=

    "OFFBEAT_Backup_"+

    new Date().toISOString().split("T")[0]+

    ".json";

    link.click();

    URL.revokeObjectURL(url);

    alert("Backup exported successfully.");

}

/*==========================
      IMPORT BACKUP
==========================*/

importBtn.addEventListener("click",()=>{

    importFile.click();

});

importFile.addEventListener("change",importBackup);

function importBackup(event){

    const file=event.target.files[0];

    if(!file){

        return;

    }

    const reader=new FileReader();

    reader.onload=function(e){

        try{

            const backup=JSON.parse(e.target.result);

            localStorage.setItem(

                "customers",

                JSON.stringify(backup.customers || [])

            );

            localStorage.setItem(

                "lastOrder",

                backup.lastOrder || 0

            );

            localStorage.setItem(

                "autoPrint",

                backup.autoPrint || "false"

            );

            localStorage.setItem(

                "autoSave",

                backup.autoSave || "false"

            );

            localStorage.setItem(

                "darkMode",

                backup.darkMode || "false"

            );

            refreshSettings();

            alert("Backup imported successfully.");

        }

        catch(error){

            alert("Invalid backup file.");

            console.error(error);

        }

    };

    reader.readAsText(file);

}

/*==========================
      AUTO PRINT
==========================*/

autoPrint.addEventListener("change",()=>{

    localStorage.setItem(

        "autoPrint",

        autoPrint.checked

    );

});

/*==========================
      AUTO SAVE
==========================*/

autoSave.addEventListener("change",()=>{

    localStorage.setItem(

        "autoSave",

        autoSave.checked

    );

});

/*==========================
      DARK MODE
==========================*/

darkMode.addEventListener("change",()=>{

    localStorage.setItem(

        "darkMode",

        darkMode.checked

    );

});

/*==========================
      APPLY SETTINGS
==========================*/

window.addEventListener("load",()=>{

    if(darkMode.checked){

        document.body.classList.add("dark");

    }

});

darkMode.addEventListener("change",()=>{

    if(darkMode.checked){

        document.body.classList.add("dark");

    }

    else{

        document.body.classList.remove("dark");

    }

});
/*====================================================
        OFFBEAT SETTINGS
        Part 3
        RESET • FACTORY RESET • INITIALIZATION
        Developed by Nisite Webcraft
====================================================*/

/*==========================
      RESET PARCEL HISTORY
==========================*/

resetParcelBtn.addEventListener("click",()=>{

    const confirmReset = confirm(

        "Delete all parcel history?\n\nThis action cannot be undone."

    );

    if(!confirmReset){

        return;

    }

    localStorage.removeItem("customers");

    refreshSettings();

    alert("Parcel history deleted successfully.");

});

/*==========================
      RESET ORDER COUNTER
==========================*/

resetOrderBtn.addEventListener("click",()=>{

    const confirmReset = confirm(

        "Reset Order Counter?\n\nNext Order ID will be OB000001."

    );

    if(!confirmReset){

        return;

    }

    localStorage.removeItem("lastOrder");

    refreshSettings();

    alert("Order counter reset successfully.");

});

/*==========================
      FACTORY RESET
==========================*/

factoryResetBtn.addEventListener("click",()=>{

    const confirmReset = confirm(

`WARNING!

This will permanently delete

• Parcel History
• Order Counter
• Application Settings

This action cannot be undone.

Continue?`

    );

    if(!confirmReset){

        return;

    }

    localStorage.clear();

    refreshSettings();

    alert("Factory Reset Completed Successfully.");

    window.location.href = "index.html";

});

/*==========================
      STORAGE REFRESH
==========================*/

window.addEventListener("storage",()=>{

    refreshSettings();

});

/*==========================
      PAGE INITIALIZATION
==========================*/

window.addEventListener("load",()=>{

    refreshSettings();

    console.log("====================================");

    console.log(" OFFBEAT Settings Loaded ");

    console.log(" Developed by Nisite Webcraft ");

    console.log("====================================");

});

/*==========================
      PAGE FOCUS REFRESH
==========================*/

window.addEventListener("focus",()=>{

    refreshSettings();

});

/*==========================
      VERSION
==========================*/

const APP_NAME = "OFFBEAT Parcel Management";

const APP_VERSION = "1.0.0";

console.log(`${APP_NAME} - Version ${APP_VERSION}`);

/*==========================
            END
==========================*/