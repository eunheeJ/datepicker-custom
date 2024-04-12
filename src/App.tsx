import React from "react";
import { DatePicker } from "./DatePicker";
import { Box, Stack } from "@mui/material";

export const App = () => {
  const [selected, setSelected] = React.useState<null | Date>(null);
  const onChangeDateHandler = (date: Date | null) => {
    setSelected(date);
    console.log("date", date);
  };
  return (
    <Stack>
      <Box sx={{ width: "360px" }}>
        <DatePicker onChange={onChangeDateHandler} selected={selected} />
      </Box>
    </Stack>
  );
};
