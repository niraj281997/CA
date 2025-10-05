import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter } from "lucide-react";

//todo: remove mock functionality
const mockLedger = [
  {
    id: '1',
    date: '2025-10-01',
    description: 'Invoice INV-2025-001',
    debit: 125000,
    credit: 0,
    balance: 125000,
  },
  {
    id: '2',
    date: '2025-10-10',
    description: 'Payment Received - REC-2025-001',
    debit: 0,
    credit: 125000,
    balance: 0,
  },
  {
    id: '3',
    date: '2025-10-03',
    description: 'Invoice INV-2025-002',
    debit: 85000,
    credit: 0,
    balance: 85000,
  },
];

export default function ClientLedger() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState("ABC Corporation Ltd");

  const totalDebit = mockLedger.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = mockLedger.reduce((sum, entry) => sum + entry.credit, 0);
  const outstandingBalance = totalDebit - totalCredit;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Client Ledger</h1>
          <p className="text-sm text-muted-foreground mt-1">View client account statements</p>
        </div>
        <Button variant="outline" data-testid="button-filter">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Client Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold truncate">{selectedClient}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Debit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalDebit / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">₹{(totalCredit / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">₹{(outstandingBalance / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-ledger"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ledger Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLedger.map((entry) => (
                <TableRow key={entry.id} data-testid={`row-ledger-${entry.id}`}>
                  <TableCell className="font-mono text-sm">{entry.date}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="font-mono font-medium text-destructive">
                    {entry.debit > 0 ? `₹${entry.debit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="font-mono font-medium text-chart-2">
                    {entry.credit > 0 ? `₹${entry.credit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="font-mono font-medium">₹{entry.balance.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
