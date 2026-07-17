/*====================================================
        OFFBEAT Shipping Label V2
        Part 1
        Developed by Nisite Webcraft
====================================================*/
/*==========================
        LOAD DATA
==========================*/

const parcel = JSON.parse(localStorage.getItem("currentParcel"));

if (!parcel) {
    alert("No parcel data found!");
    window.location.href = "new-parcel.html";
}
/*==========================
        ELEMENTS
==========================*/

const customerName = document.getElementById("customerName");

const phone = document.getElementById("phone");

const address = document.getElementById("address");

const city = document.getElementById("city");

const district = document.getElementById("district");

const state = document.getElementById("state");

const pincode = document.getElementById("pincode");

const payment = document.getElementById("payment");

const amount = document.getElementById("amount");

const date = document.getElementById("date");

const product = document.getElementById("product");

const size = document.getElementById("size");

const color = document.getElementById("color");

const qty = document.getElementById("qty");

const weight = document.getElementById("weight");

const courier = document.getElementById("courier");

const tracking = document.getElementById("tracking");

/*==========================
      FILL LABEL DATA
==========================*/

customerName.textContent = parcel.customerName || "-";

phone.textContent = parcel.phone || "-";

address.textContent = parcel.address || "-";

city.textContent = parcel.city || "-";

district.textContent = parcel.district || "-";

state.textContent = parcel.state || "-";

pincode.textContent = parcel.pincode || "-";

payment.textContent = parcel.payment || "-";

amount.textContent = parcel.amount || "0";

date.textContent = parcel.date || "-";

product.textContent = parcel.product || "-";

size.textContent = parcel.size || "-";

color.textContent = parcel.color || "-";

qty.textContent = parcel.qty || "-";

weight.textContent = parcel.weight || "-";

courier.textContent = parcel.courier || "-";

status.textContent = parcel.status || "-";

tracking.textContent = parcel.tracking || "-";

/*==========================
        QR DATA
==========================*/
const qrText =

`OFFBEAT
id: ${parcel.orderId}

customerName: ${parcel.customerName}

phone: ${parcel.phone}

product: ${parcel.product}

size: ${parcel.size}

Qty: ${parcel.qty}

status: ${parcel.status}

Tracking: ${parcel.tracking}`;
/*==========================
      GENERATE QR CODE
==========================*/

const qrContainer = document.getElementById("qrcode");

// Clear previous QR if any
qrContainer.innerHTML = "";

new QRCode(qrContainer, {
    text: qrText,
    width: 90,
    height: 90,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
});
/*==========================
      BARCODE
==========================*/
/*==========================
      GENERATE BARCODE
==========================*/

const barcodeSVG = document.getElementById("barcode");

barcodeSVG.innerHTML = "";

const barcodeValue =
    (parcel.tracking && parcel.tracking.trim()) ||
    (parcel.orderId && parcel.orderId.trim()) ||
    "OB000001";

JsBarcode(barcodeSVG, barcodeValue, {

    format: "CODE128",

    lineColor: "#000000",

    width: 2,

    height: 70,

    displayValue: true,

    font: "monospace",

    fontSize: 14,

    textMargin: 5,

    margin: 10,

    background: "#ffffff"

});
/*==========================
      GENERATE BARCODE
==========================*/



/*==========================
      BUTTONS
==========================*/

const printBtn = document.getElementById("printBtn");

const pdfBtn = document.getElementById("pdfBtn");

const imageBtn = document.getElementById("imageBtn");
/*====================================================
            PART 2
        PRINT & SAVE IMAGE
====================================================*/

/*==========================
        PRINT LABEL
==========================*/

if(printBtn){

    printBtn.addEventListener("click",()=>{

        window.print();

    });

}

/*==========================
        SAVE IMAGE
==========================*/

if(imageBtn){

    imageBtn.addEventListener("click",saveImage);

}

async function saveImage(){

    const label=document.getElementById("label");

    try{

        label.classList.add("export-mode");

        imageBtn.disabled=true;

        imageBtn.innerHTML="<i class='fa-solid fa-spinner fa-spin'></i> Saving...";

        const canvas=await html2canvas(label,{

            scale:6,

            useCORS:true,

            backgroundColor:"#ffffff",

            logging:false,

            imageTimeout:0,

            removeContainer:true

        });

        label.classList.remove("export-mode");

        imageBtn.disabled=false;

        imageBtn.innerHTML="<i class='fa-solid fa-image'></i> Save Image";

        const exportCanvas=document.createElement("canvas");

        exportCanvas.width=1240;

        exportCanvas.height=1748;

        const ctx=exportCanvas.getContext("2d");

        ctx.fillStyle="#ffffff";

        ctx.fillRect(0,0,1240,1748);

        ctx.imageSmoothingEnabled=true;

        ctx.imageSmoothingQuality="high";

        ctx.drawImage(

            canvas,

            0,

            0,

            exportCanvas.width,

            exportCanvas.height

        );

        const link=document.createElement("a");

        const fileName=(parcel.customerName || "OFFBEAT")
            .replace(/\s+/g,"_");

        link.download=fileName+"_Label.png";

        link.href=exportCanvas.toDataURL("image/png",1.0);

        link.click();

    }

    catch(error){

        console.error(error);

        label.classList.remove("export-mode");

        imageBtn.disabled=false;

        imageBtn.innerHTML="<i class='fa-solid fa-image'></i> Save Image";

        alert("Unable to save image.");

    }

}

/*==========================
      EXPORT MODE
==========================*/

function enableExportMode(){

    document
    .getElementById("label")
    .classList
    .add("export-mode");

}

function disableExportMode(){

    document
    .getElementById("label")
    .classList
    .remove("export-mode");

}
/*====================================================
            PART 3
      DOWNLOAD PDF & INITIALIZATION
====================================================*/

/*==========================
        DOWNLOAD PDF
==========================*/

if(pdfBtn){

    pdfBtn.addEventListener("click",downloadPDF);

}

async function downloadPDF(){

    const label=document.getElementById("label");

    try{

        enableExportMode();

        pdfBtn.disabled=true;

        pdfBtn.innerHTML="<i class='fa-solid fa-spinner fa-spin'></i> Creating...";

        const canvas=await html2canvas(label,{

            scale:6,

            useCORS:true,

            backgroundColor:"#ffffff",

            logging:false,

            imageTimeout:0

        });

        disableExportMode();

        const imgData=canvas.toDataURL("image/png",1.0);

        const { jsPDF }=window.jspdf;

        const pdf=new jsPDF({

            orientation:"portrait",

            unit:"mm",

            format:[148,105]

        });

        pdf.addImage(

            imgData,

            "PNG",

            0,

            0,

            105,

            148,

            undefined,

            "FAST"

        );

        const fileName=(parcel.customerName || "OFFBEAT")
            .replace(/\s+/g,"_");

        pdf.save(fileName+"_Label.pdf");

        pdfBtn.disabled=false;

        pdfBtn.innerHTML="<i class='fa-solid fa-file-pdf'></i> Download PDF";

    }

    catch(error){

        console.error(error);

        disableExportMode();

        pdfBtn.disabled=false;

        pdfBtn.innerHTML="<i class='fa-solid fa-file-pdf'></i> Download PDF";

        alert("Unable to generate PDF.");

    }

}

/*==========================
        HELPERS
==========================*/

function formatValue(value){

    if(value===undefined || value===null || value===""){

        return "-";

    }

    return value;

}

function currentDate(){

    const d=new Date();

    return d.toLocaleDateString("en-IN");

}

/*==========================
        AUTO DATE
==========================*/

if(!parcel.date || parcel.date===""){

    date.textContent=currentDate();

}

/*==========================
        PAGE TITLE
==========================*/

document.title=`OFFBEAT - ${formatValue(parcel.customerName)}`;

/*==========================
      DISABLE SELECTION
==========================*/

document.addEventListener("selectstart",(e)=>{

    e.preventDefault();

});

/*==========================
      IMAGE DRAG OFF
==========================*/

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});

/*==========================
      INITIALIZATION
==========================*/

window.addEventListener("load",()=>{

    console.log("====================================");

    console.log(" OFFBEAT Parcel Label V2 Loaded ");

    console.log(" Developed by Nisite Webcraft ");

    console.log("====================================");

});