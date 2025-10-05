import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, AlertCircle } from "lucide-react";
import { Task } from "@shared/schema";

interface TaskCardProps {
  task: Partial<Task> & { assigneeName?: string; assigneeAvatar?: string };
  onClick?: () => void;
}

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-chart-3 text-white",
  low: "bg-chart-1 text-primary-foreground",
};

const statusLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  review: "Review",
  done: "Done",
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityColor = priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium;
  
  return (
    <Card 
      className="hover-elevate cursor-pointer" 
      onClick={onClick}
      data-testid={`card-task-${task.id}`}
    >
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium line-clamp-2">{task.title}</CardTitle>
          <Badge className={`${priorityColor} text-xs shrink-0`}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center justify-between gap-2">
          {task.assigneeName && (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={task.assigneeAvatar} />
                <AvatarFallback className="text-xs">
                  {task.assigneeName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{task.assigneeName}</span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
        {task.approvalStatus === "pending" && (
          <div className="flex items-center gap-1 text-xs text-chart-3">
            <AlertCircle className="w-3 h-3" />
            <span>Pending Approval</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
