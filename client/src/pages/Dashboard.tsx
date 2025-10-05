import { useState } from "react";
import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";
import { TaskDialog } from "@/components/TaskDialog";
import { CheckSquare, Users, Clock, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },
  });

  const recentTasks = tasks.slice(0, 3);
  const activeTasks = tasks.filter((t: any) => t.status !== 'done').length;
  const pendingApprovals = tasks.filter((t: any) => t.approvalStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's your overview</p>
        </div>
        <Button data-testid="button-create-task" onClick={() => setTaskDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      <TaskDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Tasks"
          value={activeTasks}
          icon={CheckSquare}
        />
        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={FileText}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals}
          icon={AlertCircle}
        />
        <StatCard
          title="Completed"
          value={tasks.filter((t: any) => t.status === 'done').length}
          icon={CheckSquare}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading tasks...</p>
            ) : recentTasks.length > 0 ? (
              recentTasks.map((task: any) => (
                <TaskCard key={task.id} task={task} onClick={() => console.log('Task clicked:', task.id)} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tasks yet. Create your first task!</p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed Today</span>
                <span className="text-lg font-semibold text-chart-2">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="text-lg font-semibold text-chart-1">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overdue</span>
                <span className="text-lg font-semibold text-destructive">3</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Tasks Completed</span>
                  <span className="text-sm font-medium">18/25</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Team Attendance</span>
                  <span className="text-sm font-medium">14/15</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1 rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
