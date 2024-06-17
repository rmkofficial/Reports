import { Grid } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const DateRangePicker = ({ dateRange, handleDateChange }) => {
  return (
    <Grid item xs={4}>
      <DatePicker
        selectsRange
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className="form-control"
        placeholderText="Select Date Range"
        isClearable={false}
        style={{ width: "100%" }}
      />
    </Grid>
  );
};

DateRangePicker.propTypes = {
  dateRange: PropTypes.array.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
