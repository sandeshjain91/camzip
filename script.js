
let photos = [];
let folderInput = document.getElementById("folderName");
let video = document.getElementById("camera");
let takePhotoBtn = document.getElementById("takePhoto");
let saveZipBtn = document.getElementById("saveZip");
let previewArea = document.getElementById("previewArea");

// Request rear camera
navigator.mediaDevices.getUserMedia({
  video: { facingMode: { exact: "environment" } }
}).then(stream => {
  video.srcObject = stream;
}).catch(err => {
  alert("Unable to access rear camera. Using default camera.");
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
  });
});

takePhotoBtn.onclick = () => {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  canvas.toBlob(blob => {
    photos.push(blob);
    let img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    previewArea.appendChild(img);
  }, "image/jpeg");
};

saveZipBtn.onclick = async () => {
  if (photos.length === 0) {
    alert("No photos taken.");
    return;
  }
  const zip = new JSZip();
  const folderName = (folderInput.value.trim() || "CamZip") + "_" + new Date().toISOString().slice(0,10);
  photos.forEach((blob, i) => {
    zip.file(`${i + 1}.jpg`, blob);
  });
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  saveZipBtn.href = url;
  saveZipBtn.download = folderName + ".zip";
};
