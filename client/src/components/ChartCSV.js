import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import parseCSV from "../utils/CVSReader";
import { useNavigate } from "react-router-dom";

ChartJS.register(...registerables, zoomPlugin);

const ChartCSV = ({ file }) => {
  const [chartData, setChartData] = useState(null);
  const [visibleSeries, setVisibleSeries] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateColors = (numColors) => {
    const colors = [];
  
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 360) / numColors; 
      const saturation = 50 + (i % 2) * 25;
      const lightness = 40 + (i % 3) * 15; 
      
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
  
    return colors;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        try {
          const data = await parseCSV(file);
          const labels = Array.from(
            new Set(data.flatMap((series) => series.data.map((item) => item.x)))
          ).sort((a, b) => a - b);

          const colors = generateColors(data.length);

          setChartData({
            labels,
            datasets: data.map((series, index) => ({
              label: series.name,
              data: series.data,
              borderColor: colors[index],
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              showLine: true,
              pointRadius: 5,
              hidden: !visibleSeries.includes(series.name),
            })),
          });
        } catch (error) {
          setError(error.message);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      }
    };

    fetchData();
  }, [file, visibleSeries, navigate]);

  const handleCheckboxChange = (seriesName) => {
    setVisibleSeries((prevVisibleSeries) =>
      prevVisibleSeries.includes(seriesName)
        ? prevVisibleSeries.filter((name) => name !== seriesName)
        : [...prevVisibleSeries, seriesName]
    );
  };

  const handleDragToggle = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  const handlePrev = () => {
    navigate("/");
  };

  const options = {
    scales: {
      y: {
        border: { dash: [4, 4] },
        grid: {
          color: "#aaa",
          tickColor: "#000",
          tickBorderDash: [2, 3],
          tickLength: 10,
          tickWidth: 2,
          offset: true,
          drawTicks: true,
          drawOnChartArea: true,
        },
        beginAtZero: true,
      },
      x: {
        display: true,
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "xy",
          drag: {
            enabled: clicked,
            backgroundColor: "rgba(225,225,225,0.3)",
            borderColor: "rgba(225,225,225)",
            borderWidth: 1,
          },
        },
        pan: { enabled: true, mode: "xy" },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw
              ? ` (${context.raw.x}, ${context.raw.y})`
              : "";
            return `${label}${value}`;
          },
          title: function () {
            return "";
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      {error ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-red-100 text-red-800">
          <div className="p-4 bg-red-500 text-white rounded">
            <p>Veri formatı hatalı: </p>
            <p>Birazdan yönlendireceksiniz.</p>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={handlePrev}
            type="button"
            className="absolute top-0 left-0 m-2 p-2 bg-gray-800 text-white rounded-xl border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3"
          >
            <div className="flex flex-row align-middle">
              <svg
                className="w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="ml-2">Geri</p>
            </div>
          </button>
          <button
            onClick={handleDragToggle}
            className="absolute top-0 right-0 m-2 p-2 bg-gray-800 text-white rounded-xl border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3"
          >
            <div className="flex flex-row align-middle">
              <p className="ml-2"> Zoom {clicked ? "Açık" : "Kapalı"}</p>
            </div>
          </button>

          {chartData && (
            <div className="absolute top-0 items-center flex justify-center mt-9 w-full">
              <div
                className={`flex space-x-4 ${
                  chartData.datasets.length > 5 ? "overflow-x-auto" : ""
                } max-w-lg`}
              >
                {chartData.datasets.map((dataset, index) => (
                  <label
                    key={index}
                    className="m-2 p-2 rounded-md flex bg-gray-200 items-center"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={visibleSeries.includes(dataset.label)}
                      onChange={() => handleCheckboxChange(dataset.label)}
                    />
                    <span
                      style={{
                        borderColor: dataset.borderColor,
                        borderWidth: 2,
                        borderStyle: "solid",
                        padding: "2px 6px",
                      }}
                    >
                      {dataset.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {chartData ? (
            <Chart className="m-10 mt-32" type="scatter" data={chartData} options={options} />
          ) : (
            <div>Veriler yükleniyor...</div>
          )}
        </>
      )}
    </>
  );
};

export default ChartCSV;
