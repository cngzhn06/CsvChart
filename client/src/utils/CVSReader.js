import Papa from "papaparse";

const parseCSV = async (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;

        try {
          const cleanedData = rows.map((item) => {
            if (item.length < 2) throw new Error("Invalid data format");

            const name = item[0];
            const data = [];

            for (let i = 1; i < item.length; i++) {
              if (item[i]) {
                const entries = item[i].split(";");

                entries.forEach(entry => {
                  const [x, y] = entry.split(" ").map(Number);
                  if (isNaN(x) || isNaN(y)) throw new Error("Invalid number format");
                  data.push({ x, y });
                });
              }
            }

            return { name, data };
          });

          resolve(cleanedData);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export default parseCSV;
