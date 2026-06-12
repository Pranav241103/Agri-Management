interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

export default function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 font-medium text-sm lg:text-base">
          {title}
        </h3>

        <span className="text-3xl">🌿</span>
      </div>

      <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-green-600 break-words">
        {value}
      </h2>

      <p className="mt-3 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}