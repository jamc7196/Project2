//Interactive line chart
d3.csv("globalsalespercompany.csv").then(function(smurfData) {
    console.log(Data);
    console.log([Data]);
  
    // Create a function to parse date and time
    var parseTime = d3.timeParse("%Y");
  
    // Format the data
    smurfData.forEach(function(data) {
      data.date = parseTime(data.date);
      data.dow_index = +data.dow_index;
      data.smurf_sightings = +data.smurf_sightings;
    });
  
    // Create scaling functions
    var xTimeScale = d3.scaleTime()
      .domain(d3.extent(Data, d => d.date))
      .range([0, width]);
  
    var yLinearScale1 = d3.scaleLinear()
      .domain([0, d3.max(smurfData, d => d.Nintendo)])
      .range([height, 0]);
  
    var yLinearScale2 = d3.scaleLinear()
      .domain([0, d3.max(smurfData, d => d.Sony)])
      .range([height, 0]);

      var yLinearScale3 = d3.scaleLinear()
      .domain([0, d3.max(smurfData, d => d.Microsoft)])
      .range([height, 0]);

  
    // Create axis functions
    var bottomAxis = d3.axisBottom(xTimeScale)
      .tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale1);
  
    // Add x-axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // Add y1-axis to the left side of the display
    chartGroup.append("g")
      // Define the color of the axis text
      .classed("green", true)
      .call(leftAxis);
  
    // Line generators for each line
    var line1 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale1(d.Nintendo));
  
    var line2 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale2(d.Microsoft));

      var line2 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale2(d.Sony));

  
  
  
  
  

  
  
  
  
  

  
  
  
  
  

  
  
  
  
  
  
  

