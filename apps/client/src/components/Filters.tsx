import { Alert, DatePicker, Select, Space, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useGetMoviesQuery } from "../services/movies.service";
import { useAppDispatch, useAppSelector } from "../store";
import { updateEndYear, updateStartYear, setMovieId } from "../store/filters";

type Props = {};

const Filters = (props: Props) => {
  const dispatch = useAppDispatch();
  const { start_year, end_year, selected_movie_id } = useAppSelector(
    (state) => state.filters
  );
  const { isLoading, isError, data } = useGetMoviesQuery(
    { start_year, end_year },
    { skip: start_year === undefined || end_year === undefined }
  );

  const handleCalendarChange = (
    _values: any,
    formatString: [string, string],
    info: { range: "start" | "end" }
  ) => {
    if (info.range === "start")
      dispatch(updateStartYear(Number(formatString[0])));
    else dispatch(updateEndYear(Number(formatString[1])));
  };

  const handleMovieSelection = (value: number) => {
    dispatch(setMovieId(value));
  };

  return (
    <>
      {isError && (
        <Alert
          closable
          message="An Erorr Occured Fetching Movies! Please Try Again Later!"
          type="error"
        />
      )}
      <Space size="large" wrap>
        <Space direction="vertical">
          <Typography.Text>Select Year Range</Typography.Text>
          <DatePicker.RangePicker
            disabledDate={(current) =>
              current &&
              (current > moment().endOf("day") ||
                current < moment().set("year", 1888))
            }
            value={
              start_year === undefined || end_year === undefined
                ? undefined
                : [
                    moment().set("year", start_year),
                    moment().set("year", end_year),
                  ]
            }
            inputReadOnly
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
          <Select
            value={selected_movie_id}
            style={{ width: 220 }}
            size="large"
            loading={isLoading}
            disabled={
              start_year === undefined || end_year === undefined || isLoading
            }
            onChange={handleMovieSelection}
          >
            {data?.map((movie) => (
              <Select.Option key={movie.id} value={movie.id}>
                {movie.title}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Space>
    </>
  );
};

export default Filters;
