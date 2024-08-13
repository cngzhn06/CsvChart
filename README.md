# CSV Graph Generator

This React application allows you to generate graphs from CSV files in a specific format.

## Features

- **CSV File Upload:** Upload CSV files to generate graphs.
- **Data Visualization:** Interactive graphs based on your data.
- **Zoom and Pan:** You can zoom in and out and pan through the graph.
- **Toggle Data Series:** Show or hide different data series.
- **Error Handling:** Alerts if the CSV format is incorrect and automatically refreshes the page after 10 seconds.
## Usage

1. **Upload a CSV File:** Click on the "Choose File" button and select a CSV file in the correct format.
2. **View the Graph:** The graph will be generated based on the uploaded CSV data.
3. **Error Handling:** If an incorrect file is uploaded, a popup will appear with an error message, and the page will automatically refresh after 10 seconds.

## CSV Format

The application expects CSV files to be in the following format:

- Each dataset should be separated by a semicolon (`;`).
- Data points should be represented as space-separated values.
- Example:

  ```csv
  vel1; 10000 0.9; 20000 1.2; 30000 1.5
  vel2; 10000 0.8; 20000 1.1; 30000 1.4
  ```

## Components

- **`HomePage`:** Main landing page with file upload functionality.
- **`ChartPage`:** Displays the generated graph and allows you to interact with the data.
- **`ChartCSV`:** Component responsible for processing the CSV file and rendering the graph.

