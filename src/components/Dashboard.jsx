import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard(summary) {
  const chartData = [
    { name: "Pending", value: summary.pending },
    { name: "In Progress", value: summary.in_progress },
    { name: "Completed", value: summary.completed },
  ];

  const priorityData = [
    { name: "Low", value: summary.low },
    { name: "Medium", value: summary.medium },
    { name: "High", value: summary.high },
  ];

  const categoriesData = summary.categories
    ? Object.entries(summary.categories).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <div className="px-8 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-gray-400">Total Tasks</h2>
          <p className="text-2xl font-bold text-white">{summary.total}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-gray-400">Pending</h2>
          <p className="text-2xl font-bold text-yellow-400">{summary.pending}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-gray-400">In Progress</h2>
          <p className="text-2xl font-bold text-blue-400">{summary.in_progress}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-gray-400">Completed</h2>
          <p className="text-2xl font-bold text-green-400">{summary.completed}</p>
        </div>
      </div>
      <div className="border-2 rounded-md border-white shadow-md my-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 mt-8 flex justify-center">
            <PieChart width={400} height={400}>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="flex-1 mt-8 flex justify-center items-center">
            <LineChart width={400} height={400} data={priorityData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <BarChart width={500} height={300} data={categoriesData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {categoriesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
