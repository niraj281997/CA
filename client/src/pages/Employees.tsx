import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, Briefcase } from "lucide-react";

//todo: remove mock functionality
const mockEmployees = [
  {
    id: '1',
    name: 'Priya Sharma',
    designation: 'Senior CA',
    email: 'priya.sharma@firm.com',
    phone: '+91 98765 43210',
    status: 'available',
    tasksCount: 5,
    avatar: '',
  },
  {
    id: '2',
    name: 'Amit Patel',
    designation: 'CA Manager',
    email: 'amit.patel@firm.com',
    phone: '+91 98765 43211',
    status: 'busy',
    tasksCount: 8,
    avatar: '',
  },
  {
    id: '3',
    name: 'Sneha Reddy',
    designation: 'Junior CA',
    email: 'sneha.reddy@firm.com',
    phone: '+91 98765 43212',
    status: 'available',
    tasksCount: 3,
    avatar: '',
  },
  {
    id: '4',
    name: 'Rahul Verma',
    designation: 'Tax Consultant',
    email: 'rahul.verma@firm.com',
    phone: '+91 98765 43213',
    status: 'available',
    tasksCount: 4,
    avatar: '',
  },
  {
    id: '5',
    name: 'Vikram Shah',
    designation: 'Audit Manager',
    email: 'vikram.shah@firm.com',
    phone: '+91 98765 43214',
    status: 'busy',
    tasksCount: 7,
    avatar: '',
  },
  {
    id: '6',
    name: 'Anjali Kapoor',
    designation: 'Senior CA',
    email: 'anjali.kapoor@firm.com',
    phone: '+91 98765 43215',
    status: 'available',
    tasksCount: 2,
    avatar: '',
  },
];

const statusColors = {
  available: 'bg-chart-2 text-white',
  busy: 'bg-chart-3 text-white',
  offline: 'bg-muted text-muted-foreground',
};

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage team members and assignments</p>
        </div>
        <Button data-testid="button-add-employee">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-employees"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEmployees.map((employee) => (
          <Card
            key={employee.id}
            className="hover-elevate cursor-pointer"
            data-testid={`card-employee-${employee.id}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.designation}</p>
                  <Badge className={`mt-2 ${statusColors[employee.status as keyof typeof statusColors]}`}>
                    {employee.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>{employee.tasksCount} Active Tasks</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" data-testid={`button-view-${employee.id}`}>
                  View Profile
                </Button>
                <Button size="sm" className="flex-1" data-testid={`button-assign-${employee.id}`}>
                  Assign Task
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
