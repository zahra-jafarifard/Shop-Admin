import React, { useState, useEffect } from "react";

import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import { fetchDataFunction } from '../../shared/FetchData'

const SalesChart = () => {
  const [productState, setProductState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFunction('products');
      setProductState(data);
    }
    fetchData();
  }, [setProductState])
  const users = productState.map(p => p.createdByUserId.name)

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "zahra",
        "alireza",
        "fati",
       
      ],
    },
    responsive: [
      {
        breakpoint: 2,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "2020",
      data: [2 ,3 ,5],
    },
    {
      name: "2022",
      data: [2, 2, 6],

    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart options={options} series={series} type="bar" height="379" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
