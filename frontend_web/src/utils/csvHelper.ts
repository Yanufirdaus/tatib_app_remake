import Papa from "papaparse";

export const extractGoogleSheetId = (url: string): string | null => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
};

export const fetchAndParseCsv = <T>(url: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Gagal mengambil data CSV");
                return response.text();
            })
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        resolve(results.data as T[]);
                    },
                    error: (error: Error) => {
                        reject(error);
                    }
                });
            })
            .catch(reject);
    });
};

export const getGoogleSheetCsvUrl = (sheetId: string): string => {
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
};
