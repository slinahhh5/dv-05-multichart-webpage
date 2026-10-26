# Exercise 5: Multi-chart page (bar chart, line chart, donut chart)

COS30045 Data Visualisation, Week 5. One web page with three D3.js charts, each drawn by its own JavaScript file.

Author: Thi To Quyen Le
Live site: https://mercury.swin.edu.au/cos30045/s105715804/ex5-multichart/index.html

## Charts

| Exercise | Chart | Data | What it shows |
|---|---|---|---|
| 5.1 | Vertical bar chart | `data/screenTech55in.csv` | Mean energy consumption (kWh/year) of 55-inch TVs for each screen type |
| 5.2 | Line chart | `data/[spot prices file].csv` | Average electricity spot price per megawatt hour in Australia, 1998 to 2024 |
| 5.3 | Donut chart | `data/[donut file].csv` | Share of small, medium and large TV models |

## How to run

The data is loaded with `d3.csv`, so the page needs a web server. Opening `index.html` directly from the folder will not load the data.

1. Open the folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server**.

## Files

```
index.html           one page with a div for each chart
css/style.css        styles
data/                CSV files for the three charts
js/bar-chart.js      vertical bar chart (5.1)
js/line-chart.js     line chart (5.2)
js/donut-chart.js    donut chart (5.3)
```

## Main ideas used

- Margin convention: an inner group moved with `translate` leaves room for the axes and labels.
- Bar chart: `scaleBand` for screen types and `scaleLinear` for energy, with a reversed y range because the SVG y-axis points down.
- Line chart: linear scales for year and price, and `d3.line` to turn the data points into a path.
- Donut chart: `d3.pie` to calculate the angles, `d3.arc` to draw them, and an ordinal colour scale.

## GenAI use

I used Gemini to help with starting code and explanations, and I tested and changed the code myself. Details are in the separate GenAI declaration document submitted on Canvas.
