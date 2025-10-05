import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

//todo: remove mock functionality
const mockAttendance = [
  { id: '1', name: 'Priya Sharma', status: 'present', clockIn: '09:15 AM', clockOut: '06:30 PM', hours: 9.25 },
  { id: '2', name: 'Amit Patel', status: 'present', clockIn: '09:00 AM', clockOut: '06:15 PM', hours: 9.25 },
  { id: '3', name: 'Sneha Reddy', status: 'present', clockIn: '09:30 AM', clockOut: '06:45 PM', hours: 9.25 },
  { id: '4', name: 'Rahul Verma', status: 'present', clockIn: '08:45 AM', clockOut: '06:00 PM', hours: 9.25 },
  { id: '5', name: 'Vikram Shah', status: 'absent', clockIn: '-', clockOut: '-', hours: 0 },
];

export default function Attendance() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn);
    console.log(isClockedIn ? 'Clocking out' : 'Clocking in');
  };

  const presentCount = mockAttendance.filter(a => a.status === 'present').length;
  const attendancePercentage = Math.round((presentCount / mockAttendance.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">Track team attendance and work hours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Clock In/Out
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono mb-2">{currentTime}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <Button
                size="lg"
                className="w-full"
                variant={isClockedIn ? "destructive" : "default"}
                onClick={handleClockToggle}
                data-testid="button-clock-toggle"
              >
                {isClockedIn ? 'Clock Out' : 'Clock In'}
              </Button>
            </div>
            {isClockedIn && (
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Clocked In:</span>
                  <span className="font-mono font-medium">09:00 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-mono font-medium">8h 30m</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-2">{presentCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Present</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">
                  {mockAttendance.length - presentCount}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-1">{attendancePercentage}%</div>
                <div className="text-sm text-muted-foreground mt-1">Attendance</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Team Attendance Rate</span>
                <span className="text-sm text-muted-foreground">{presentCount}/{mockAttendance.length}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-chart-2 rounded-full transition-all"
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendance.map((record) => (
                <TableRow key={record.id} data-testid={`row-attendance-${record.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {record.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={record.status === 'present' ? 'default' : 'secondary'}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{record.clockIn}</TableCell>
                  <TableCell className="font-mono text-sm">{record.clockOut}</TableCell>
                  <TableCell className="font-mono text-sm">{record.hours}h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
