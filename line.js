// Chart Params
var svgWidth = 960;
var svgHeight = 700;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var totglobsales = {
  url: "http://127.0.0.1:5000/api/v1/totglobsales_percomp",
  type: "GET",
  dataType: "json",
};

function parseData(json, Axis) {
  json.forEach((data) => {
    var parseTime = d3.timeParse("%Y");
    data[Axis] = +data[Axis];
    data.year = parseTime(data.year);
  });
}

function yScale(companyData, chosenYAxis) {
  var yLinearScale = d3
    .scaleLinear()
    .domain([
      d3.min(companyData, (d) => d[chosenYAxis]) - 1,
      d3.max(companyData, (d) => d[chosenYAxis] + 1),
    ])
    .range([height, 0]);

  return yLinearScale;
}

function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition().duration(1000).call(leftAxis);

  return yAxis;
}

function lineTrans(lineId) {
  var totalLength = d3.select(lineId).node().getTotalLength();
  d3.selectAll(lineId)
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
}

function ln(
  newXvalue,
  chosenYAxis,
  ln1,
  ln2,
  ln3,
  ln4,
  globalLabel,
  EULabel,
  NALabel,
  JPLabel
) {
  chosenYAxis = newXvalue;

  if (chosenYAxis === "tot_globalsales") {
    d3.selectAll(".lines").style("opacity", 0);
    d3.select(`#line${ln1}`).style("opacity", 1);
    lineTrans(`#line${ln1}`);
    //
    globalLabel.classed("active", true).classed("inactive", false);
    EULabel.classed("active", false).classed("inactive", true);
    NALabel.classed("active", false).classed("inactive", true);
    JPLabel.classed("active", false).classed("inactive", true);
  } else if (chosenYAxis === "tot_eusales") {
    d3.selectAll(".lines").style("opacity", 0);
    d3.select(`#line${ln2}`).style("opacity", 1);
    lineTrans(`#line${ln2}`);
    //
    //
    globalLabel.classed("active", false).classed("inactive", true);
    EULabel.classed("active", true).classed("inactive", false);
    NALabel.classed("active", false).classed("inactive", true);
    JPLabel.classed("active", false).classed("inactive", true);
  } else if (chosenYAxis === "tot_nasales") {
    d3.selectAll(".lines").style("opacity", 0);
    d3.select(`#line${ln3}`).style("opacity", 1);
    lineTrans(`#line${ln3}`);
    //
    globalLabel.classed("active", false).classed("inactive", true);
    EULabel.classed("active", false).classed("inactive", true);
    NALabel.classed("active", true).classed("inactive", false);
    JPLabel.classed("active", false).classed("inactive", true);
  } else {
    d3.selectAll(".lines").style("opacity", 0);
    d3.select(`#line${ln4}`).style("opacity", 1);
    lineTrans(`#line${ln4}`);
    //
    globalLabel.classed("active", false).classed("inactive", true);
    EULabel.classed("active", false).classed("inactive", true);
    NALabel.classed("active", false).classed("inactive", true);
    JPLabel.classed("active", true).classed("inactive", false);
  }
}

function Draw_Chart(data, id, n1, n2, n3, n4) {
  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", svgWidth + 100)
    .attr("height", svgHeight + 200);

  var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left + 70}, ${margin.top + 100})`);

  var newData = data[0]["data"][0];
  var MicrosoftData = [];
  var SonyData = [];
  var NintendoData = [];
  var chosenYAxis = "tot_globalsales";
  var numMax = 0;

  newData.forEach((element) => {
    if (element.tot_globalsales > numMax) {
      numMax = element.tot_globalsales;
    }

    if (element.company == "MICROSOFT") {
      MicrosoftData.push(element);
    } else if (element.company == "SONY") {
      SonyData.push(element);
    } else {
      NintendoData.push(element);
    }
  });
  parseData(MicrosoftData, "tot_globalsales");
  parseData(SonyData, "tot_globalsales");
  parseData(NintendoData, "tot_globalsales");
  // parseData(MicrosoftData, "tot_globalsales");

  var xTimeScale = d3
    .scaleTime()
    .domain(d3.extent(MicrosoftData, (d) => d.year))
    .range([0, width]);

  // var yLinearScale = yScale(companyData, chosenYAxis);
  var yLinearScale = d3.scaleLinear().domain([0, numMax]).range([height, 0]);

  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup
    .append("g")
    .classed("green", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  var yAxis = chartGroup
    .append("g")
    .classed("green-", true)
    .attr("transform", `translate(0, ${height}+1)`)
    .call(leftAxis);

  // --------------------------------
  // MICROSOFT LINES
  // --------------------------------

  var line1 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_globalsales));

  chrtLine1 = chartGroup
    .append("path")
    .data([MicrosoftData])
    .attr("d", line1)
    .attr("id", "line1")
    .classed("lines", true)
    .style("opacity", 1);

  var line2 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_eusales));

  chrtLine2 = chartGroup
    .append("path")
    .data([MicrosoftData])
    .attr("d", line2)
    .attr("id", "line2")
    .classed("lines", true);

  var line3 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_nasales));

  chrtLine3 = chartGroup
    .append("path")
    .data([MicrosoftData])
    .attr("d", line3)
    .attr("id", "line3")
    .classed("lines", true);

  var line4 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_jpsales));

  chrtLine4 = chartGroup
    .append("path")
    .data([MicrosoftData])
    .attr("d", line4)
    .attr("id", "line4")
    .classed("lines", true);

  // --------------------------------

  // --------------------------------
  // SONY LINES
  // --------------------------------
  var line5 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_globalsales));

  chrtLine5 = chartGroup
    .append("path")
    .data([SonyData])
    .attr("d", line5)
    .attr("id", "line5")
    .classed("lines", true);

  var line6 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_eusales));

  chrtLine6 = chartGroup
    .append("path")
    .data([SonyData])
    .attr("d", line6)
    .attr("id", "line6")
    .classed("lines", true);

  var line7 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_nasales));

  chrtLine7 = chartGroup
    .append("path")
    .data([SonyData])
    .attr("d", line7)
    .attr("id", "line7")
    .classed("lines", true);

  var line8 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_jpsales));

  chrtLine8 = chartGroup
    .append("path")
    .data([SonyData])
    .attr("d", line8)
    .attr("id", "line8")
    .classed("lines", true);

  // --------------------------------

  // --------------------------------
  // NINTENDO LINES
  // --------------------------------
  var line9 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_globalsales));

  chrtLine9 = chartGroup
    .append("path")
    .data([NintendoData])
    .attr("d", line9)
    .attr("id", "line9")
    .classed("lines", true);

  var line10 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_eusales));

  chrtLine10 = chartGroup
    .append("path")
    .data([NintendoData])
    .attr("d", line10)
    .attr("id", "line10")
    .classed("lines", true);

  var line11 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_nasales));

  chrtLine11 = chartGroup
    .append("path")
    .data([NintendoData])
    .attr("d", line11)
    .attr("id", "line11")
    .classed("lines", true);

  var line12 = d3
    .line()
    .x((d) => xTimeScale(d.year))
    .y((d) => yLinearScale(d.tot_jpsales));

  chrtLine12 = chartGroup
    .append("path")
    .data([NintendoData])
    .attr("d", line12)
    .attr("id", "line12")
    .classed("lines", true);
  // --------------------------------

  var labelsGroup = chartGroup
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var labelsGroupY = chartGroup
    .append("g")
    .attr("transform", `translate(${width - 795}, ${height / 2})`);

  var globalLabel = labelsGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "tot_globalsales")
    .classed("active", true)
    .text("Global Sales");

  var EULabel = labelsGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "tot_eusales")
    .classed("inactive", true)
    .text("Europe Sales");

  var NALabel = labelsGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "tot_nasales")
    .classed("inactive", true)
    .text("North America Sales");

  var JPLabel = labelsGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "tot_jpsales")
    .classed("inactive", true)
    .text("Japan Sales");

  var microsoft = labelsGroupY
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("y", -100)
    .attr("value", "Microsoft")
    .classed("active", true)
    .text("Microsoft");

  var sony = labelsGroupY
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("y", -120)
    .attr("value", "Sony")
    .classed("inactive", true)
    .text("Sony");

  var nintendo = labelsGroupY
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("y", -140)
    .attr("value", "Nintendo")
    .classed("inactive", true)
    .text("Nintendo");

  var title = labelsGroup
    .append("text")
    .attr("x", 0)
    .attr("y", -700)
    .classed("title", true)
    .text("Microsoft");

  labelsGroup.selectAll("text").on("click", function () {
    var value = d3.select(this).attr("value");
    ln(value, chosenYAxis, 1, 2, 3, 4, globalLabel, EULabel, NALabel, JPLabel);
  });

  labelsGroupY.selectAll("text").on("click", function () {
    var value = d3.select(this).attr("value");

    if (value !== chosenYAxis) {
      chosenYAxis = value;

      if (chosenYAxis === "Microsoft") {
        microsoft.classed("active", true).classed("inactive", false);
        sony.classed("active", false).classed("inactive", true);
        nintendo.classed("active", false).classed("inactive", true);
        title.text("Microsoft");

        d3.selectAll(".lines").style("opacity", 0);
        d3.select("#line1").style("opacity", 1);
        lineTrans("#line1");
        //
        globalLabel.classed("active", true).classed("inactive", false);
        EULabel.classed("active", false).classed("inactive", true);
        NALabel.classed("active", false).classed("inactive", true);
        JPLabel.classed("active", false).classed("inactive", true);

        labelsGroup.selectAll("text").on("click", function () {
          var value = d3.select(this).attr("value");
          ln(
            value,
            chosenYAxis,
            1,
            2,
            3,
            4,
            globalLabel,
            EULabel,
            NALabel,
            JPLabel
          );
        });
      } else if (chosenYAxis === "Sony") {
        microsoft.classed("active", false).classed("inactive", true);
        sony.classed("active", true).classed("inactive", false);
        nintendo.classed("active", false).classed("inactive", true);
        title.text("Sony");

        d3.selectAll(".lines").style("opacity", 0);
        d3.select("#line5").style("opacity", 1);
        lineTrans("#line5");
        //
        globalLabel.classed("active", true).classed("inactive", false);
        EULabel.classed("active", false).classed("inactive", true);
        NALabel.classed("active", false).classed("inactive", true);
        JPLabel.classed("active", false).classed("inactive", true);

        labelsGroup.selectAll("text").on("click", function () {
          var value = d3.select(this).attr("value");
          ln(
            value,
            chosenYAxis,
            5,
            6,
            7,
            8,
            globalLabel,
            EULabel,
            NALabel,
            JPLabel
          );
        });
      } else {
        microsoft.classed("active", false).classed("inactive", true);
        sony.classed("active", false).classed("inactive", true);
        nintendo.classed("active", true).classed("inactive", false);
        title.text("Nintendo");

        d3.selectAll(".lines").style("opacity", 0);
        d3.select("#line9").style("opacity", 1);
        lineTrans("#line9");
        //
        globalLabel.classed("active", true).classed("inactive", false);
        EULabel.classed("active", false).classed("inactive", true);
        NALabel.classed("active", false).classed("inactive", true);
        JPLabel.classed("active", false).classed("inactive", true);

        labelsGroup.selectAll("text").on("click", function () {
          var value = d3.select(this).attr("value");
          ln(
            value,
            chosenYAxis,
            9,
            10,
            11,
            12,
            globalLabel,
            EULabel,
            NALabel,
            JPLabel
          );
        });
      }
    }
  });
}

$.ajax(totglobsales).done((data) => {
  Draw_Chart(data, "#Line1", 1, 2, 3, 4);
});
