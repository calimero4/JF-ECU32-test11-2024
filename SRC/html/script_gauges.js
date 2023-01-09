// Get current sensor readings when the page loads
window.addEventListener("load", getReadings);

//<canvas data-type="linear-gauge" data-width="400" data-height="150" data-min-value="0" data-max-value="220" data-major-ticks="0,20,40,60,80,100,120,140,160,180,200,220" 
//data-minor-ticks="2" data-stroke-ticks="true" data-highlights="false" data-color-plate="#fff" data-border-shadow-width="0" data-borders="false" data-bar-begin-circle="false" 
//data-bar-width="10" data-tick-side="left" data-number-side="left" data-needle-side="left" data-needle-type="line" data-needle-width="3" data-color-needle="#222" data-color-needle-end="#222"
//data-animation-duration="1500" data-animation-rule="linear" data-animation-target="plate" width="400" height="150" style="width: 400px; height: 150px;"></canvas>

//Create Temperature Gauge
var gaugeRC = new LinearGauge({
    renderTo: "rc-gauge",
    width:400 ,
    height:150 ,
    minValue:1000 ,
    maxValue:2000,
    majorTicks: ["1000","1250","1500","1750","2000" ],
    minorTicks:2 ,
    ticksAngle: 180,
    strokTicks:true, 
    highlights: [
		{
			from: 1000,
			to: 1100,
			color: "rgba(0, 50, 200, .75)",
		},
    ],
    colorPlate:"#fff" ,
    borderShadowWidth:0 ,
    borders:false ,
    barBeginCircle:false ,
    barWidth:10 ,
    tickSide:"left", 
    numberSide:"left", 
    needleSide:"left" ,
    needleType:"line" ,
    needleWidth:3 ,
    colorNeedle:"#222", 
    colorNeedleend:"#222", 
    animationDuration:100, 
    animationRule:"linear" ,
    animationTarget:"plate"    
}).draw();

var gaugeTemp = new LinearGauge({
	renderTo: "gauge-temperature",
	width: 120,
	height: 400,
	units: "Gaz RC",
	minValue: 950,
	startAngle: 90,
	ticksAngle: 180,
	maxValue: 2000,
	colorValueBoxRect: "#049faa",
	colorValueBoxRectEnd: "#049faa",
	colorValueBoxBackground: "#f1fbfc",
	valueDec: 0,
	valueInt: 4,
	majorTicks: ["950", "1250", "1500", "1750", "2000"],
	minorTicks: 4,
	strokeTicks: true,
	highlights: [
		{
			from: 1000,
			to: 1100,
			color: "#03C0C1",
		},
	],
	colorPlate: "#fff",
	colorBarProgress: "#CC2936",
	colorBarProgressEnd: "#049faa",
	borderShadowWidth: 0,
	borders: false,
	needleType: "arrow",
	needleWidth: 2,
	needleCircleSize: 7,
	needleCircleOuter: true,
	needleCircleInner: false,
	animationDuration: 100,
	animationRule: "linear",
	barWidth: 10,
}).draw();

// Create Humidity Gauge
var gaugeHum = new RadialGauge({
	renderTo: "gauge-humidity",
	width: 300,
	height: 300,
	units: "EGT °C",
	minValue: 0,
	maxValue: 1000,
	colorValueBoxRect: "#049faa",
	colorValueBoxRectEnd: "#049faa",
	colorValueBoxBackground: "#f1fbfc",
    valueDec: 0,
	valueInt: 3,
	majorTicks: ["0", "125", "375","250", "500","625", "750","875", "1000"],
	minorTicks: 4,
	strokeTicks: true,
	highlights: [
		{
			from: 900,
			to: 1000,
			color: "rgba(200, 50, 50, .75)",
		},
	],
	colorPlate: "#fff",
	borderShadowWidth: 0,
	borders: false,
	needleType: "line",
	colorNeedle: "#007F80",
	colorNeedleEnd: "#007F80",
	needleWidth: 2,
	needleCircleSize: 3,
	colorNeedleCircleOuter: "#007F80",
	needleCircleOuter: true,
	needleCircleInner: false,
	animationDuration: 250,
	animationRule: "linear",
}).draw();

// Function to get current readings on the webpage when it loads for the first time
function getReadings() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			console.log(myObj);
			var temp = myObj.temperature;
			var hum = myObj.humidity;
			gaugeTemp.value = temp;
			gaugeHum.value = hum;
            gaugeRC.value = temp ;
		}
	};
	xhr.open("GET", "/readings", true);
	xhr.send();
}
setInterval(getReadings,500) ;

/*
if (!!window.EventSource) {
	var source = new EventSource("/events");

	source.addEventListener(
		"open",
		function (e) {
			console.log("Events Connected");
		},
		false
	);

	source.addEventListener(
		"error",
		function (e) {
			if (e.target.readyState != EventSource.OPEN) {
				console.log("Events Disconnected");
			}
		},
		false
	);

	source.addEventListener(
		"message",
		function (e) {
			console.log("message", e.data);
		},
		false
	);

	source.addEventListener(
		"new_readings",
		function (e) {
			console.log("new_readings", e.data);
			var myObj = JSON.parse(e.data);
			console.log(myObj);
			gaugeTemp.value = myObj.temperature;
			gaugeHum.value = myObj.humidity;
            gaugeRC.value = temp ;
		},
		false
	);
}*/
