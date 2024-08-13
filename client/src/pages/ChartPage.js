import React from 'react';
import { useLocation } from 'react-router-dom';
import ChartCSV from "../components/ChartCSV";

export default function ChartPage() {
  const location = useLocation();
  const file = location.state?.file;

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {file ? <ChartCSV file={file} /> : <div>Dosya seçilmedi.</div>}
    </div>
  );
}
