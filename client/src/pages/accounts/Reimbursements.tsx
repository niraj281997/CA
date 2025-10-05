import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";

//todo: remove mock functionality
const mockReimbursements = [
  {
    id: '1',
    employeeName: 'Priya Sharma',
    date: '2025-10-03',
    category: 'Travel',
    amount: 3500,
    description: 'Client meeting travel expenses',
    status: 'approved',
  },
  {
    id: '2',
    employeeName: 'Amit Patel',
    date: '2025-10-05',
    category: 'Office Supplies',
    amount: 1200,
    description: 'Printer cartridges and paper',
    status: 'pending',
  },
  {
    id: '3',
    employeeName: 'Sneha Reddy',
    date: '2025-10-04',
    category: 'Food',
    amount: 850,
    description: 'Client lunch meeting',
    status: 'approved',
  },
];

const statusColors = {
  pending: 'bg-chart-3 text-white',
  approved: 'bg-chart-2 text-white',
  rejected: 'bg-destructive text-destructive-foreground',
};

export default function Reimbursements() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalPending = mockReimbursements
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalApproved = mockReimbursements
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Reimbursements</h1>
          <p className="text-sm text-muted-foreground mt-1">Track employee expense reimbursements</p>
        </div>
        <Button data-testid="button-create-reimbursement">
          <Plus className="w-4 h-4 mr-2" />
          Add Reimbursement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockReimbursements.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">₹{totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">₹{totalApproved.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search reimbursements..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-reimbursements"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reimbursement Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReimbursements.map((reimb) => (
                <TableRow key={reimb.id} data-testid={`row-reimbursement-${reimb.id}`}>
                  <TableCell className="font-medium">{reimb.employeeName}</TableCell>
                  <TableCell className="font-mono text-sm">{reimb.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{reimb.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{reimb.description}</TableCell>
                  <TableCell className="font-mono font-medium">₹{reimb.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[reimb.status as keyof typeof statusColors]}>
                      {reimb.status}
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
