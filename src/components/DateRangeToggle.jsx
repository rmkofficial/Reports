import { useState } from "react";
import { Grid, ButtonGroup, ToggleButton } from "@mui/material";
import { addWeeks, addMonths, addYears } from "date-fns";
import PropTypes from "prop-types";

const DateRangeToggle = ({ setDateRange }) => {
  const [selectedOption, setSelectedOption] = useState("day");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const now = new Date();

    switch (option) {
      case "day":
        setDateRange([now, now]);
        break;
      case "week":
        setDateRange([now, addWeeks(now, 1)]);
        break;
      case "month":
        setDateRange([now, addMonths(now, 1)]);
        break;
      case "year":
        setDateRange([now, addYears(now, 1)]);
        break;
      case "total":
        setDateRange([null, null]);
        break;
      default:
        setDateRange([null, null]);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ButtonGroup fullWidth>
          <ToggleButton
            value="day"
            selected={selectedOption === "day"}
            onChange={() => handleOptionChange("day")}
            variant="contained"
            sx={{
              backgroundColor: "#4C4B4D",
              color: "#ffffff",
              "&.Mui-selected": {
                backgroundColor: "#A8C5DA",
                color: "black",
              },
              height: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              "&:hover&.Mui-selected": {
                backgroundColor: "#A8C5DA",
              },
              borderRadius: "0px",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            Day
          </ToggleButton>
          <ToggleButton
            value="week"
            selected={selectedOption === "week"}
            onChange={() => handleOptionChange("week")}
            variant="contained"
            sx={{
              backgroundColor: "#4C4B4D",
              color: "#ffffff",
              "&.Mui-selected": {
                backgroundColor: "#A8C5DA",
                color: "black",
              },
              height: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              "&:hover&.Mui-selected": {
                backgroundColor: "#A8C5DA",
              },
              borderRadius: "0px",
            }}
          >
            Week
          </ToggleButton>
          <ToggleButton
            value="month"
            selected={selectedOption === "month"}
            onChange={() => handleOptionChange("month")}
            variant="contained"
            sx={{
              backgroundColor: "#4C4B4D",
              color: "#ffffff",
              "&.Mui-selected": {
                backgroundColor: "#A8C5DA",
                color: "black",
              },
              height: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              "&:hover&.Mui-selected": {
                backgroundColor: "#A8C5DA",
              },
              borderRadius: "0px",
              borderLeft: "none",
            }}
          >
            Month
          </ToggleButton>
          <ToggleButton
            value="year"
            selected={selectedOption === "year"}
            onChange={() => handleOptionChange("year")}
            variant="contained"
            sx={{
              backgroundColor: "#4C4B4D",
              color: "#ffffff",
              "&.Mui-selected": {
                backgroundColor: "#A8C5DA",
                color: "black",
              },
              height: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              "&:hover&.Mui-selected": {
                backgroundColor: "#A8C5DA",
              },
              borderRadius: "0px",
            }}
          >
            Year
          </ToggleButton>
          <ToggleButton
            value="total"
            selected={selectedOption === "total"}
            onChange={() => handleOptionChange("total")}
            variant="contained"
            sx={{
              backgroundColor: "#4C4B4D",
              color: "#ffffff",
              "&.Mui-selected": {
                backgroundColor: "#A8C5DA",
                color: "black",
              },
              height: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              "&:hover&.Mui-selected": {
                backgroundColor: "#A8C5DA",
              },
              borderRadius: "0px",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            Total
          </ToggleButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

DateRangeToggle.propTypes = {
  setDateRange: PropTypes.func.isRequired,
};

export default DateRangeToggle;
