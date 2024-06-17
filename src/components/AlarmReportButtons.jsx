import { Grid, Button, Link } from "@mui/material";
import { SaveAlt as SaveAltIcon } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Document, Packer, Paragraph, TextRun } from "docx";
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

const exportToWord = (data, filename) => {
  const doc = new Document();
  const table = data.map((row) => {
    return new Paragraph({
      children: [
        new TextRun({ text: row.id.toString(), bold: true }),
        new TextRun(` ${row.name}`),
        new TextRun(` ${row.checkInDate}`),
        new TextRun(` ${row.checkOutDate}`),
        new TextRun(` ${row.status}`),
      ],
    });
  });

  doc.addSection({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: "Hotel Data Report",
            bold: true,
            size: 24,
          }),
        ],
      }),
      ...table,
    ],
  });

  Packer.toBlob(doc)
    .then((blob) => {
      saveAs(blob, filename);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
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
  exportToWord(data, "hotel_data.docx");
  exportToXls(data, "hotel_data.xlsx");
};

const AlarmReportButtons = ({ dateRange }) => {
  const filteredData = filterDataByDateRange(hotelData, dateRange);

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SaveAltIcon />}
          size="small"
          sx={{
            backgroundColor: "#4CAF50",
            color: "white",
            "&:hover": {
              backgroundColor: "#45A049",
            },
          }}
          onClick={() => exportToCsv(filteredData, "hotel_data.csv")}
        >
          CSV
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SaveAltIcon />}
          size="small"
          sx={{
            backgroundColor: "#2196F3",
            color: "white",
            "&:hover": {
              backgroundColor: "#1976D2",
            },
          }}
          onClick={() => exportToPdf(filteredData, "hotel_data.pdf")}
        >
          PDF
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SaveAltIcon />}
          size="small"
          sx={{
            backgroundColor: "#F44336",
            color: "white",
            "&:hover": {
              backgroundColor: "#D32F2F",
            },
          }}
          onClick={() => exportToWord(filteredData, "hotel_data.docx")}
        >
          Word
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SaveAltIcon />}
          size="small"
          sx={{
            backgroundColor: "#FF9800",
            color: "white",
            "&:hover": {
              backgroundColor: "#FB8C00",
            },
          }}
          onClick={() => exportToXls(filteredData, "hotel_data.xlsx")}
        >
          XLS
        </Button>
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
