import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RevenueBar= ({ data }) => {
    console.log(data)
  // Safely map only if data is valid
  const formattedData = Array.isArray(data)
    ?data.map((item) => {
        const month = item._id?.month;
        const year = item._id?.year;
        const revenue = item.revenue;

        if (month == null || year == null || revenue == null) return null;

        const label = `${monthNames[month - 1]} ${year}`;
        return { label, revenue };
      }).filter(Boolean) // remove nulls
    : [];

  return (
    <div className="w-full bg-white p-5 rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Monthly Revenue</h1>
      {formattedData.length === 0 ? (
        <p className="text-gray-500">No revenue data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" angle={-45} textAnchor="end" />
            <YAxis tickFormatter={(val) => `$${val.toLocaleString()}`} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#3b82f6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueBar;
