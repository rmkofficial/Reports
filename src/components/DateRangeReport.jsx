import { useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import DateRangeToggle from "./DateRangeToggle";
import AlarmReportButtons from "./AlarmReportButtons";

const DateRangeReport = () => {
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "100%",
          maxWidth: "800px",
          margin: "20px",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <DateRangePicker
              dateRange={dateRange}
              handleDateChange={(update) => setDateRange(update)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <DateRangeToggle setDateRange={setDateRange} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px", marginLeft: "400px" }}
        >
          <AlarmReportButtons dateRange={dateRange} />
        </Grid>
      </Paper>
    </Box>
  );
};

export default DateRangeReport;
