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

function setListening() {
  expandElement("circleOverSvg", "25rem");
  document.getElementById("statusText").innerHTML = "Listening...";
  document.getElementById("circleOverSvg").style.animationName = "none";
  changeColor("#C6EEFF");
  document.getElementById("statusImage").style.animationDuration = "10s"
}

async function setProcessing() {
  expandElement("circleOverSvg", "30rem");
  document.getElementById("statusText").innerHTML = "Processing...";
  document.getElementById("circleOverSvg").style.animationName = "processing";
  await sleep(500)
  document.getElementById("statusImage").style.animationDuration = "25s"
  changeColor("rgb(216 221 255)");
}

function setSpeaking() {
  document.getElementById("statusImage").style.animationDuration = "25s"
  expandElement("circleOverSvg", "25rem");
  document.getElementById("statusText").innerHTML = "Speaking...";
  document.getElementById("circleOverSvg").style.animationName = "none";
  changeColor("#c9f2cb");
}

async function getInfo() {
  let d;
  await fetch(`${backendUrl}/status`)
    .then(response => response.json())
    .then(data => {
      d = data;
  });
  console.log(d)
  if(d.status == "listening") {
    setListening();
  } else if(d.status == "processing") {
    setProcessing();
  } else if(d.status == "speaking") {
    setSpeaking();
  }
}

async function getResources(){
  let d;
  await fetch(`${backendUrl}/resources`)
    .then(response => response.json())
    .then(data => {
      d = data;
  });
  setProgressCpu(d.cpu);
  setProgressRam(d.ram);
}
getResources()
setInterval(getResources, 5000);

//setInterval(getInfo, 1000);

const circleCpu = document.getElementById("cpuUsage")
const percentageDisplayCpu = document.getElementById("cpuPercent")
const circumference = 92 * 2 * Math.PI;
circleCpu.style.strokeDasharray = circumference;
const circleRam = document.getElementById("ramUsage")
const percentageDisplayRam = document.getElementById("ramPercent")
circleRam.style.strokeDasharray = circumference;
setProgressCpu(0)
setProgressRam(0)

function setProgressRam(percent) {
  const offset = circumference - (percent / 100 * circumference);
  circleRam.style.strokeDashoffset = offset;
  percentageDisplayRam.innerHTML = percent.toString().split(".")[0] + '%';
}
function setProgressCpu(percent) {
  const offset = circumference - (percent / 100 * circumference);
  circleCpu.style.strokeDashoffset = offset;
  percentageDisplayCpu.innerHTML = percent.toString().split(".")[0] + '%';
}

fetch(weatherAPIEndpoint).then(response => response.json()).then(data => {
  let temperature = data.current.temp_c.toString().split(".")[0];
  let condition = data.current.condition.text
  if(sunnyConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/sunny.svg";
  } else if(cloudyConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/cloudy.svg";
  } else if(partlyCloudyConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/partlyCloudy.svg";
  } else if(mistConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/mist.svg";
  } else if(rainConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/rain.svg";
  } else if(thunderConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/thunder.svg";
  } else if(snowConditions.includes(condition)) {
    document.getElementById("weatherIcon").src = "./assets/snow.svg";
  }
  document.getElementById("temperature").innerHTML = temperature + "°C";
  document.getElementById("condition").innerHTML = condition;
});