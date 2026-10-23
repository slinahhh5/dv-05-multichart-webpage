// Load the aggregated data (Update 'tv_sizes.csv' to your actual KNIME export filename)
d3.csv("data/tv_sizes.csv").then(data => {
    // Map the actual CSV column names to the variables used in the chart
    data.forEach(d => {
        d.Count = +d.OCCURRENCE_COUNT;
        d.Screensize_Category = d.screensize_category;
    });
    
    // Check the console log to ensure data loaded correctly without NaN errors
    console.log(data); 
    
    // Call the function to draw the donut chart
    drawDonutChart(data);
});

// Function to set up and draw the donut chart
const drawDonutChart = data => {
    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    
    // Calculate radius to fit the shortest side with some padding
    const radius = Math.min(width, height) / 2 - 20;

    // Create color scale using D3's schemeSet2
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    // Set up the SVG container
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Create the inner chart group and translate it to the center of the SVG
    const innerChart = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Calculate angle for each slice using d3.pie
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); // Disable sorting to maintain original data order

    // Set up the arc generator
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.5) // Inner radius makes it a donut (set to 0 for a pie chart)
        .outerRadius(radius)
        .padAngle(0.02)
        .cornerRadius(6);

    // Bind data and create the donut chart arcs
    innerChart.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Add text labels inside the arcs
    innerChart.selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-family", "sans-serif")
        .style("fill", "black")
        .text(d => d.data.Screensize_Category);
};