import React from "react";

import { Button, IconButton, Stack, Typography, styled } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

const MAIN_BG_COLOR = "#3498db";
const LIGHT_GREY = "#ccc";
const INPUT_HEIGHT = 40;
const InputWrapper = styled(Stack)({
  width: "100%",
  height: INPUT_HEIGHT + "px",
  flexDirection: "row",
  input: {
    width: "100%",
    paddingLeft: "12px",
    outlineColor: "grey",
    border: `1px solid ${LIGHT_GREY}`,
    ":focus": {
      outlineColor: MAIN_BG_COLOR,
    },
    "::placeholder": {
      color: LIGHT_GREY,
    },
  },
});

const DatePickerWrapper = styled(Stack)({
  width: "auto",
  position: "relative",
  ".react-datepicker-popper": {
    transform: `translate(0px,${INPUT_HEIGHT + 4}px) !important`, // 달력 위치 조정
  },

  // 달력 스타일
  ".react-datepicker": {
    width: "360px", //달력 너비
    minHeight: "344px", // 달력 높이
    border: "0px", // 달력 테두리
    borderRadius: "4px",
    boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",

    // header 부분, 연도와 날짜있는 부분부터 요일이 포함된 부분까지 모두 header
    ".react-datepicker__header": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      height: "112px",
      borderBottom: "none",
      borderRadius: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      span: {
        fontWeight: 500,
      },
    },

    // 달력 이전 표시( < ) 화살표, nav
    ".react-datepicker__navigation--previous": {
      left: "70px",
      top: "24px",
      width: "24px",
      height: "24px",
    },

    // 달력 이후 표시( > ) 화살표, nav
    ".react-datepicker__navigation--next": {
      right: "70px",
      top: "24px",
      width: "24px",
      height: "24px",
    },

    // 달력 날짜 있는 부분 container (요일 부분은 포함하지 않음)
    ".react-datepicker__month-container": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      // 달력 요일 컨테이너
      ".react-datepicker__day-names": {
        width: "320px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        marginTop: "auto",
        // 달력 각 요일 별 스타일
        ".react-datepicker__day-name": {
          color: "grey",
          display: "flex",
          width: "36px",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
        },
      },

      // 달력 날짜 컨테이너
      ".react-datepicker__month": {
        margin: "0px",
        width: "320px",
      },

      // 달력 한 주 별 컨테이너
      ".react-datepicker__week": {
        width: "320px",
        display: "flex",
        justifyContent: "center",

        //.react-datepicker__week의 직계 자식들 즉 모든 날짜의 스타일,
        // .react-datepicker__day를 &> * 대신 사용해도 됨.
        "&> * ": {
          display: "flex",
          width: "36px",
          height: "36px",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          background: "transparent",
          ":hover": {
            backgroundColor: MAIN_BG_COLOR,
            opacity: 0.5,
            color: "white",
            borderRadius: "50%",
          },
        },

        // 해당 월의 날짜가 아닌 날짜
        // 즉 사용사자 4월을 보고있을때, 3월의 31일이 4월달에 보이는 경우
        // 31이 outside-month에 속함
        ".react-datepicker__day--outside-month": {
          opacity: 0.4,
        },

        // 4월 10일을 선택했을 경우 다른 월의 모든 10일에 대한 스타일
        ".react-datepicker__day--keyboard-selected": {
          background: "transparent",
        },

        // 선택한 날짜 스타일
        ".react-datepicker__day--selected": {
          backgroundColor: MAIN_BG_COLOR,
          color: "#fff",
          borderRadius: "50%",
        },
      },
    },
  },

  // 말풍선처럼 화살표 표시 해주는 모형
  ".react-datepicker__triangle": {
    display: "none",
  },
});
const ExampleCustomInput = React.forwardRef(
  (props: any, ref: React.LegacyRef<HTMLInputElement> | undefined) => (
    <InputWrapper onClick={props.onClick}>
      <input
        {...props}
        type="text"
        ref={ref}
        placeholder={props?.placeholder || "YYYY.MM.DD"}
      />
      <IconButton
        sx={{
          width: "40px",
          height: "40px",
          border: `1px solid ${LIGHT_GREY}`,
          borderLeft: "none",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <CalendarMonthIcon />
      </IconButton>
    </InputWrapper>
  )
);
export const DatePicker: React.FC<ReactDatePickerProps> = (props) => {
  return (
    <DatePickerWrapper>
      <ReactDatePicker
        {...props}
        customInput={<ExampleCustomInput />}
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        dateFormat="yyyy.MM.dd"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Stack direction={"row"} alignItems={"center"}>
            <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <ArrowBackIosIcon
                sx={{ color: prevMonthButtonDisabled ? LIGHT_GREY : "grey" }}
              />
            </Button>
            <Typography>
              {new Date(date).getFullYear()}.
              {String(new Date(date).getMonth() + 1).padStart(2, "0")}
            </Typography>
            <Button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <ArrowForwardIosIcon
                sx={{ color: nextMonthButtonDisabled ? LIGHT_GREY : "grey" }}
              />
            </Button>
          </Stack>
        )}
      />
    </DatePickerWrapper>
  );
};
