// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var svg = d3
  .select("#Line")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var totglobsales = {
  url: "http://127.0.0.1:5000/api/v1/totglobsales_percomp",
  type: "GET",
  dataType: "json",
};

$.ajax(totglobsales).done((data) => {
  var years = [];
  var globalSales = [];

  var parseTime = d3.timeParse("%Y");
  var format = d3.timeFormat("%Y");

  data[0]["data"][0].forEach((element) => {
    years.push(element.year);
    globalSales.push(element.tot_globalsales);
  });

  var uniYear = years.filter(onlyUnique);

  var xLinearScale = d3
    .scaleLinear()
    .domain([parseTime(d3.min(uniYear)), parseTime(d3.max(uniYear))])
    .range([0, width]);

  var yLinearScale = d3
    .scaleLinear()
    .domain([0, d3.max(globalSales)])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale).tickFormat(format);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g").classed("green", true).call(leftAxis);
});
