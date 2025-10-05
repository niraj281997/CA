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
import { Search, Plus, Eye, Download } from "lucide-react";

//todo: remove mock functionality
const mockReceipts = [
  {
    id: '1',
    receiptNumber: 'REC-2025-001',
    clientName: 'ABC Corporation Ltd',
    invoiceNumber: 'INV-2025-001',
    amount: 125000,
    paymentDate: '2025-10-10',
    paymentMode: 'Bank Transfer',
    transactionRef: 'TXN123456789',
  },
  {
    id: '2',
    receiptNumber: 'REC-2025-002',
    clientName: 'DEF Services Ltd',
    invoiceNumber: 'INV-2025-003',
    amount: 50000,
    paymentDate: '2025-10-08',
    paymentMode: 'Cheque',
    transactionRef: 'CHQ987654',
  },
];

export default function PaymentReceipts() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Payment Receipts</h1>
          <p className="text-sm text-muted-foreground mt-1">Record and track payment receipts</p>
        </div>
        <Button data-testid="button-create-receipt">
          <Plus className="w-4 h-4 mr-2" />
          Add Receipt
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search receipts..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-receipts"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Receipt List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt Number</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Transaction Ref</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReceipts.map((receipt) => (
                <TableRow key={receipt.id} data-testid={`row-receipt-${receipt.id}`}>
                  <TableCell className="font-mono font-medium">{receipt.receiptNumber}</TableCell>
                  <TableCell>{receipt.clientName}</TableCell>
                  <TableCell className="font-mono text-sm">{receipt.invoiceNumber}</TableCell>
                  <TableCell className="font-mono font-medium">₹{receipt.amount.toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-sm">{receipt.paymentDate}</TableCell>
                  <TableCell>{receipt.paymentMode}</TableCell>
                  <TableCell className="font-mono text-sm">{receipt.transactionRef}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" data-testid={`button-view-${receipt.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" data-testid={`button-download-${receipt.id}`}>
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
