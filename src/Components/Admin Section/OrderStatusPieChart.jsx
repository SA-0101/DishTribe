// OrderStatusPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusPieChart = ({ total, delivered, pending }) => {
  const safeTotal = total > 0 ? total : 1; // prevent div by zero

  const data = {
    labels: ['Delivered', 'Pending'],
    datasets: [
      {
        label: 'Order Status',
        data: [
          ((delivered / safeTotal) * 100).toFixed(2),
          ((pending / safeTotal) * 100).toFixed(2),
        ],
        backgroundColor: ['#4CAF50', '#FFC107'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto' }}>
      <h3>Order Status Pie Chart</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default OrderStatusPieChart;
