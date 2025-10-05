import { useState, useMemo } from "react";
import TaskCard from "@/components/TaskCard";
import { TaskDialog } from "@/components/TaskDialog";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function TaskBoard() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },
  });

  const columns = useMemo(() => {
    return {
      todo: tasks.filter((t: any) => t.status === 'todo'),
      inprogress: tasks.filter((t: any) => t.status === 'inprogress'),
      review: tasks.filter((t: any) => t.status === 'review'),
      done: tasks.filter((t: any) => t.status === 'done'),
    };
  }, [tasks]);

  const columnTitles = {
    todo: 'To Do',
    inprogress: 'In Progress',
    review: 'Review',
    done: 'Done',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Task Board</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage tasks with Kanban board</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-filter-tasks">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button data-testid="button-create-task" onClick={() => setTaskDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      <TaskDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(columnTitles) as Array<keyof typeof columnTitles>).map((columnKey) => (
          <Card key={columnKey} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{columnTitles[columnKey]}</CardTitle>
                <span className="text-sm font-medium text-muted-foreground">
                  {columns[columnKey].length}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 overflow-y-auto">
              {columns[columnKey].map((task: any) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => console.log('Task clicked:', task.id)}
                />
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                data-testid={`button-add-${columnKey}`}
                onClick={() => setTaskDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
