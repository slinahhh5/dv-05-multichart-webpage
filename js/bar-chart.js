// ===== Load and prepare the data =====

// d3.csv() reads the file and converts every row as it is loaded
d3.csv("data/screenTech55in.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech,                   // text stays a string
    Energy_Consumption: +d.Energy_Consumption     // + converts the string to a number
  };
}).then(data => {
  // Check the data in the console: strings and numbers should be typed correctly
  console.log(data);

  // Sort from the highest to the lowest energy consumption
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

  // Pass the data to the function that draws the chart
  drawBarChart(data);
});


// ===== Draw the vertical bar chart =====

const drawBarChart = data => {

  // Set up the inner chart margins and dimensions
  // The margins leave room for the axes and labels
  const margin = { top: 40, right: 40, bottom: 40, left: 60 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Main svg container; the border is only for development and can be removed later
  const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`)
      .style("border", "1px solid black");

  // Inner chart group, moved so that (0,0) starts after the left and top margins
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Band scale for the categories (screen types) on the x-axis
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

  // Linear scale for the energy consumption on the y-axis
  // The range is reversed because svg y-values grow downwards
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0]);

  // Axis generators
  const bottomAxis = d3.axisBottom(xScale)
    .tickSize(0);                         // remove the tick marks
  const leftAxis = d3.axisLeft(yScale);

  // Add the x-axis and move it to the bottom of the inner chart
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)
      .style("font-size", "14px");

  // Add the y-axis
  innerChart
    .append("g")
      .call(leftAxis)
      .style("font-size", "12px");

  // Add the y-axis label above the axis
  innerChart
    .append("text")
      .text("Energy Consumption (kWh/year)")
      .attr("x", -margin.left)
      .attr("y", -15)
      .attr("text-anchor", "start")
      .style("font-size", "14px");

  // Add the bars
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
      .attr("class", "bar")
      // Each bar is as wide as one band
      .attr("width", xScale.bandwidth())
      // The scale is upside down, so subtract the y-value from the inner height
      .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
      .attr("x", d => xScale(d.Screen_Tech))
      .attr("y", d => yScale(d.Energy_Consumption))
      .attr("fill", "green");

  // Add value labels on top of the bars
  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
      .attr("class", "bar-label")
      .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
      // Centre the label over the bar
      .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
      // Place the label slightly above the top of the bar
      .attr("y", d => yScale(d.Energy_Consumption) - 6)
      .attr("text-anchor", "middle")
      .style("font-size", "13px");

};