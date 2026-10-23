// Load the data from the CSV file
d3.csv("data/ARE_Spot_Prices.csv").then(data => {
    // Convert string to number matching exact CSV column headers
    data.forEach(d => {
        d.year = +d.Year; 
        d.averagePrice = +d["Average Price (notTas-Snowy)"]; 
    });
    
    // Output data to console for debugging
    console.log(data); 
    
    // Call the function to draw the chart
    drawLineChart(data);
});

// Function to draw the line chart and scatter plot
const drawLineChart = data => {
    // Set up the margins and dimensions
    const margin = {top: 40, right: 40, bottom: 60, left: 60};
    const width = 800; 
    const height = 400; 
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the main SVG container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create the inner chart group with margins applied
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set up the X and Y scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Setup the Axes
    // Use tickFormat("d") to prevent years from having commas (e.g., 2,000)
    const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    // Append the X axis to the chart
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Append the Y axis to the chart
    innerChart.append("g")
        .call(leftAxis);

    // Add Y-axis label
    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 15)
        .attr("x", 0 - (innerHeight / 2))
        .style("text-anchor", "middle")
        .text("Average Price ($ per MWh)");

    // Add X-axis label
    innerChart.append("text")
        .attr("transform", `translate(${innerWidth / 2}, ${innerHeight + 40})`)
        .style("text-anchor", "middle")
        .text("Year");

    // Draw the Scatter Plot (Circles)
    innerChart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "green");

    // Draw the Line Chart
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice))
        .curve(d3.curveStep); // Use d3.curveStep for the step effect

    // Append a path that uses the data in our lineGenerator to draw the line
    innerChart.append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green");
};