import { DatePicker, Select, Space, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { updateEndYear, updateStartYear } from "../store/filters";

type Props = {};

const Filters = (props: Props) => {
  const dispatch = useAppDispatch();
  const { start_year, end_year } = useAppSelector((state) => state.filters);

  const handleCalendarChange = (
    _values: any,
    formatString: [string, string],
    info: { range: "start" | "end" }
  ) => {
    if (info.range === "start")
      dispatch(updateStartYear(Number(formatString[0])));
    else dispatch(updateEndYear(Number(formatString[1])));
  };

  return (
    <Space size="large" wrap>
      <Space direction="vertical">
        <Typography.Text>Select Year Range</Typography.Text>
        <DatePicker.RangePicker
          allowClear={false}
          picker="year"
          size="large"
          onCalendarChange={handleCalendarChange}
        />
      </Space>
      <Space direction="vertical">
        <Typography.Text
          disabled={start_year === undefined || end_year === undefined}
        >
          Select Movie from {start_year} - {end_year}
        </Typography.Text>
        <Select style={{ width: 292 }} size="large" disabled>
          <Select.Option>Movie One</Select.Option>
        </Select>
      </Space>
    </Space>
  );
};

export default Filters;
