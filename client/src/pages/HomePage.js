import React, { useState } from "react";
import Logo from "../utils/sageLogo.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerateChart = () => {
    if (file) {
      navigate("/chart", { state: { file } });
    } else {
      console.log("dosya eklenmedi");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="mb-3 text-center">
        <img src={Logo} alt="Logo" className="mb-4" />
        <div className="text-xl font-bold">Sage Grafik Oluşturma Aracı</div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          CSV Dosyası Ekle
        </label>
        <input
          type="file"
          accept=".csv"
          className="mt-2 p-2 border border-gray-300 rounded-md"
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-9">
        <button
          onClick={handleGenerateChart}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Grafik Oluştur
          </span>
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-medium mb-4">Dosya ekleyiniz.</p>
            <button
              onClick={closePopup}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
