let qrText = document.getElementById("qr-Text");
let sizers = document.getElementById("sizers");
let generateBtn = document.getElementById("generateBtn");
let downloadBtn = document.getElementById("downloadBtn");

const qrcontainer = document.querySelector(".qr-body");

let size = sizers.value;
generateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(qrText.value.length > 0){
    generateQRCode();
  }
  else{
    alert("Enter the text or URL to generate your QR code");
  }
});

downloadBtn.addEventListener('click', () =>{
  let img = document.querySelector('.qr-body img');
  if(img !== null){
    let imgAtr = img.getAttribute('src');
    downloadBtn.setAttribute("href", imgAtr);
    downloadBtn.setAttribute("download", "qr_code.png");
  }
  else{
    alert("Generate your QR code to download");
    downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    downloadBtn.setAttribute("download", "qr_code.png");
  }
});

sizers.addEventListener('change', (e) => {
  size = e.target.value;
  if(qrText.value.length > 0){
    generateQRCode();
  }
  else{
    alert("Enter the text or URL to generate your QR code");
  }
});

function generateQRCode() {
  qrcontainer.innerHTML = "";
  new QRCode(qrcontainer, {
    text: qrText.value,
    height: size,
    width: size,
    colorLight: "#fff",
    colorDark: "#000",
  });
}