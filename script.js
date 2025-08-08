
let photos = [];
let folderInput = document.getElementById("folderName");
let video = document.getElementById("camera");
let takePhotoBtn = document.getElementById("takePhoto");
let saveZipBtn = document.getElementById("saveZip");
let previewArea = document.getElementById("previewArea");

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
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
    img.style.width = "100px";
    img.style.margin = "0.5rem";
    previewArea.appendChild(img);
  }, "image/jpeg");
};

saveZipBtn.onclick = async () => {
  const zip = new JSZip();
  const folderName = folderInput.value.trim() || "CamZip_" + new Date().toISOString().slice(0,10);
  photos.forEach((blob, i) => {
    zip.file(`${i + 1}.jpg`, blob);
  });
  const content = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = folderName + ".zip";
  a.click();
};
