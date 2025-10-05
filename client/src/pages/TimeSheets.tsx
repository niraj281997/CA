import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Plus, Download } from "lucide-react";

//todo: remove mock functionality
const mockTimeSheets = [
  {
    id: '1',
    employeeName: 'Priya Sharma',
    taskTitle: 'GST Return Filing Q3',
    date: '2025-10-05',
    hours: 8,
    description: 'Completed GST return preparation and filing',
    approved: true,
  },
  {
    id: '2',
    employeeName: 'Amit Patel',
    taskTitle: 'Audit Report - XYZ Ltd',
    date: '2025-10-05',
    hours: 6,
    description: 'Reviewed financial statements and prepared audit notes',
    approved: true,
  },
  {
    id: '3',
    employeeName: 'Sneha Reddy',
    taskTitle: 'TDS Reconciliation',
    date: '2025-10-05',
    hours: 5,
    description: 'Reconciled TDS statements with Form 26AS',
    approved: false,
  },
  {
    id: '4',
    employeeName: 'Rahul Verma',
    taskTitle: 'Income Tax Return - Client A',
    date: '2025-10-04',
    hours: 7,
    description: 'Prepared ITR-3 with all schedules',
    approved: true,
  },
  {
    id: '5',
    employeeName: 'Vikram Shah',
    taskTitle: 'GST Audit Q2',
    date: '2025-10-04',
    hours: 9,
    description: 'Conducted GST audit and prepared detailed report',
    approved: false,
  },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function TimeSheets() {
  const [selectedWeek] = useState('Oct 2-8, 2025');

  const totalHours = mockTimeSheets.reduce((sum, ts) => sum + ts.hours, 0);
  const approvedHours = mockTimeSheets.filter(ts => ts.approved).reduce((sum, ts) => sum + ts.hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Time Sheets</h1>
          <p className="text-sm text-muted-foreground mt-1">Track time spent on tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button data-testid="button-add-entry">
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalHours}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">{approvedHours}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">{totalHours - approvedHours}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Hours/Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(totalHours / 5).toFixed(1)}h</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>Weekly Time Sheet</CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{selectedWeek}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTimeSheets.map((entry) => (
                <TableRow key={entry.id} data-testid={`row-timesheet-${entry.id}`}>
                  <TableCell className="font-medium">{entry.employeeName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{entry.taskTitle}</TableCell>
                  <TableCell className="font-mono text-sm">{entry.date}</TableCell>
                  <TableCell className="font-mono text-sm font-medium">{entry.hours}h</TableCell>
                  <TableCell className="max-w-[250px] truncate text-sm text-muted-foreground">
                    {entry.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant={entry.approved ? 'default' : 'secondary'}>
                      {entry.approved ? 'Approved' : 'Pending'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
