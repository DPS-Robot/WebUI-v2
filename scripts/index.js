function expandElement(id, height) {
  const element = document.getElementById(id);
  element.style.height = height;
  element.style.width = height;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeColor(color) {
  fetch('./assets/googleCircle.svg')
    .then(response => response.text())
    .then(svgContent => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const mainShape = svgDoc.querySelector('path');
      const newColor = color;
      mainShape.setAttribute('fill', newColor);
      const serializer = new XMLSerializer();
      const newSvgContent = serializer.serializeToString(svgDoc);
      const img = document.getElementById('statusImage');
      img.src = `data:image/svg+xml;base64,${btoa(newSvgContent)}`;
    });

  document.getElementById("circleOverSvg").style.backgroundColor = color;
}

(async () => {
  setListening();
  await sleep("5000");
  setProcessing();
  await sleep("5000");
  setSpeaking();
  await sleep("5000");
  setListening();
  await sleep("5000");
  setProcessing();
  await sleep("5000");
  setSpeaking();
})();

function setListening() {
  expandElement("circleOverSvg", "25rem");
  document.getElementById("statusText").innerHTML = "Listening...";
  document.getElementById("circleOverSvg").style.animationName = "none";
  changeColor("#C6EEFF");
  document.getElementById("statusImage").style.animationDuration = "10s"

}

async function setProcessing() {
  document.getElementById("statusImage").style.animationDuration = "25s"
  expandElement("circleOverSvg", "30rem");
  document.getElementById("statusText").innerHTML = "Processing...";
  document.getElementById("circleOverSvg").style.animationName = "processing";
  await sleep(500)
  changeColor("#87b6ff");
}

function setSpeaking() {
  document.getElementById("statusImage").style.animationDuration = "25s"
  expandElement("circleOverSvg", "25rem");
  document.getElementById("statusText").innerHTML = "Speaking...";
  document.getElementById("circleOverSvg").style.animationName = "none";
  changeColor("#c9f2cb");
}