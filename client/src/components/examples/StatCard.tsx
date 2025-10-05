import StatCard from '../StatCard';
import { CheckSquare } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-6 bg-background">
      <StatCard
        title="Active Tasks"
        value={24}
        icon={CheckSquare}
        trend={{ value: "12% from last month", isPositive: true }}
      />
    </div>
  );
}
