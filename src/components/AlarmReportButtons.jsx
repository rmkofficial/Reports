import { Grid, Link } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import hotelData from "../../public/data.json";

const filterDataByDateRange = (data, dateRange) => {
  const [startDate, endDate] = dateRange;
  if (!startDate || !endDate) {
    return data;
  }
  return data.filter((row) => {
    const checkInDate = new Date(row.checkInDate);
    return checkInDate >= startDate && checkInDate <= endDate;
  });
};

const exportToCsv = (data, filename) => {
  const csvStr = [
    ["id", "name", "checkInDate", "checkOutDate", "status"],
    ...data.map((row) => [
      row.id,
      row.name,
      row.checkInDate,
      row.checkOutDate,
      row.status,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");
  const blob = new Blob([csvStr], { type: "text/csv" });
  saveAs(blob, filename);
};

const exportToPdf = (data, filename) => {
  const doc = new jsPDF();
  const tableColumn = ["ID", "Name", "CheckInDate", "CheckOutDate", "Status"];
  const tableRows = data.map((row) => [
    row.id,
    row.name,
    row.checkInDate,
    row.checkOutDate,
    row.status,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save(filename);
};

const exportToXls = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};

const downloadAllFormats = (data) => {
  exportToCsv(data, "hotel_data.csv");
  exportToPdf(data, "hotel_data.pdf");
  exportToXls(data, "hotel_data.xlsx");
};

const AlarmReportButtons = ({ dateRange }) => {
  const filteredData = filterDataByDateRange(hotelData, dateRange);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <img
          src="/icons/CSV.png"
          alt="CSV Icon"
          style={{ width: "40px", cursor: "pointer" }}
          onClick={() => exportToCsv(filteredData, "hotel_data.csv")}
        />
      </Grid>
      <Grid item>
        <img
          src="/icons/PDF.png"
          alt="PDF Icon"
          style={{ width: "40px", cursor: "pointer" }}
          onClick={() => exportToPdf(filteredData, "hotel_data.pdf")}
        />
      </Grid>
      <Grid item>
        <img
          src="/icons/XLS.png"
          alt="XLS Icon"
          style={{ width: "40px", cursor: "pointer" }}
          onClick={() => exportToXls(filteredData, "hotel_data.xlsx")}
        />
      </Grid>
      <Grid item>
        <Link
          component="button"
          variant="body2"
          sx={{
            color: "#9C27B0",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => downloadAllFormats(filteredData)}
        >
          Download All
        </Link>
      </Grid>
    </Grid>
  );
};

AlarmReportButtons.propTypes = {
  dateRange: PropTypes.array.isRequired,
};

export default AlarmReportButtons;
