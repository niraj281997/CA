import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

//todo: remove mock functionality
const mockPettyCash = [
  {
    id: '1',
    date: '2025-10-05',
    description: 'Office Supplies Purchase',
    category: 'Office Supplies',
    amount: 2500,
    type: 'expense',
  },
  {
    id: '2',
    date: '2025-10-04',
    description: 'Cash Deposit',
    category: 'Deposit',
    amount: 10000,
    type: 'income',
  },
  {
    id: '3',
    date: '2025-10-03',
    description: 'Courier Charges',
    category: 'Courier',
    amount: 850,
    type: 'expense',
  },
];

export default function PettyCash() {
  const totalIncome = mockPettyCash.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = mockPettyCash.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Petty Cash</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage small cash transactions</p>
        </div>
        <Button data-testid="button-add-entry">
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{balance.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">₹{totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">₹{totalExpense.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPettyCash.map((entry) => (
                <TableRow key={entry.id} data-testid={`row-petty-${entry.id}`}>
                  <TableCell className="font-mono text-sm">{entry.date}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{entry.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {entry.type === 'income' ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-chart-2" />
                          <span className="text-chart-2">Income</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-destructive" />
                          <span className="text-destructive">Expense</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={`font-mono font-medium ${entry.type === 'income' ? 'text-chart-2' : 'text-destructive'}`}>
                    {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString()}
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
