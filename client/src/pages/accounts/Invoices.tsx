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
import { Search, Plus, Eye, Download } from "lucide-react";

//todo: remove mock functionality
const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    clientName: 'ABC Corporation Ltd',
    invoiceDate: '2025-10-01',
    dueDate: '2025-10-15',
    totalAmount: 125000,
    paidAmount: 125000,
    status: 'paid',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    clientName: 'XYZ Industries Pvt Ltd',
    invoiceDate: '2025-10-03',
    dueDate: '2025-10-17',
    totalAmount: 85000,
    paidAmount: 0,
    status: 'pending',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    clientName: 'DEF Services Ltd',
    invoiceDate: '2025-10-05',
    dueDate: '2025-10-19',
    totalAmount: 150000,
    paidAmount: 50000,
    status: 'partial',
  },
];

const statusColors = {
  paid: 'bg-chart-2 text-white',
  pending: 'bg-chart-3 text-white',
  partial: 'bg-chart-1 text-primary-foreground',
  overdue: 'bg-destructive text-destructive-foreground',
};

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalAmount = mockInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidAmount = mockInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage client invoices and billing</p>
        </div>
        <Button data-testid="button-create-invoice">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{(totalAmount / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">₹{(paidAmount / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">₹{(pendingAmount / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search invoices..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-invoices"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id} data-testid={`row-invoice-${invoice.id}`}>
                  <TableCell className="font-mono font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell className="font-mono text-sm">{invoice.invoiceDate}</TableCell>
                  <TableCell className="font-mono text-sm">{invoice.dueDate}</TableCell>
                  <TableCell className="font-mono">₹{invoice.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">₹{invoice.paidAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status as keyof typeof statusColors]}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" data-testid={`button-view-${invoice.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" data-testid={`button-download-${invoice.id}`}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
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
