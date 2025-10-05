import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Calendar, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import type { TdsReturn, Client } from "@shared/schema";

export default function TDSReturns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: tdsReturns = [], isLoading } = useQuery<TdsReturn[]>({
    queryKey: ["/api/tds-returns"],
  });

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createReturnMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/tds-returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tds-returns"] });
      setIsDialogOpen(false);
      reset();
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    createReturnMutation.mutate(data);
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c: Client) => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const filteredReturns = tdsReturns.filter((ret: TdsReturn) =>
    getClientName(ret.clientId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.returnType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.acknowledgmentNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: tdsReturns.length,
    pending: tdsReturns.filter((r: TdsReturn) => r.status === 'pending').length,
    filed: tdsReturns.filter((r: TdsReturn) => r.status === 'filed').length,
    overdue: tdsReturns.filter((r: TdsReturn) => r.status === 'overdue').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">TDS Returns</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage TDS return filings and compliance</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add TDS Return
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New TDS Return</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientId">Client *</Label>
                  <select id="clientId" {...register("clientId", { required: true })} className="w-full border rounded-md px-3 py-2">
                    <option value="">Select Client</option>
                    {clients.map((client: Client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="returnType">Return Type *</Label>
                  <select id="returnType" {...register("returnType", { required: true })} className="w-full border rounded-md px-3 py-2">
                    <option value="">Select Return Type</option>
                    <option value="24Q">24Q (Salaries)</option>
                    <option value="26Q">26Q (Other than Salaries)</option>
                    <option value="27Q">27Q (Non-Residents)</option>
                    <option value="27EQ">27EQ (TCS)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="quarter">Quarter *</Label>
                  <select id="quarter" {...register("quarter", { required: true })} className="w-full border rounded-md px-3 py-2">
                    <option value="">Select Quarter</option>
                    <option value="Q1">Q1 (Apr-Jun)</option>
                    <option value="Q2">Q2 (Jul-Sep)</option>
                    <option value="Q3">Q3 (Oct-Dec)</option>
                    <option value="Q4">Q4 (Jan-Mar)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="financialYear">Financial Year *</Label>
                  <Input id="financialYear" {...register("financialYear", { required: true })} placeholder="e.g., 2024-25" />
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input id="dueDate" type="date" {...register("dueDate", { required: true })} />
                </div>

                <div>
                  <Label htmlFor="filingDate">Filing Date</Label>
                  <Input id="filingDate" type="date" {...register("filingDate")} />
                </div>

                <div>
                  <Label htmlFor="acknowledgmentNumber">Acknowledgment Number</Label>
                  <Input id="acknowledgmentNumber" {...register("acknowledgmentNumber")} />
                </div>

                <div>
                  <Label htmlFor="token">Token Number</Label>
                  <Input id="token" {...register("token")} />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select id="status" {...register("status")} className="w-full border rounded-md px-3 py-2">
                    <option value="pending">Pending</option>
                    <option value="filed">Filed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="totalDeductees">Total Deductees</Label>
                  <Input id="totalDeductees" type="number" {...register("totalDeductees")} />
                </div>

                <div>
                  <Label htmlFor="totalTdsDeposited">Total TDS Deposited (₹)</Label>
                  <Input id="totalTdsDeposited" type="number" {...register("totalTdsDeposited")} />
                </div>

                <div>
                  <Label htmlFor="totalTdsClaimed">Total TDS Claimed (₹)</Label>
                  <Input id="totalTdsClaimed" type="number" {...register("totalTdsClaimed")} />
                </div>

                <div>
                  <Label htmlFor="lateFees">Late Fees (₹)</Label>
                  <Input id="lateFees" type="number" {...register("lateFees")} />
                </div>

                <div>
                  <Label htmlFor="interest">Interest (₹)</Label>
                  <Input id="interest" type="number" {...register("interest")} />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Input id="remarks" {...register("remarks")} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createReturnMutation.isPending}>
                  {createReturnMutation.isPending ? "Creating..." : "Create Return"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.filed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by client, return type, or acknowledgment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All TDS Returns ({filteredReturns.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading TDS returns...</div>
          ) : filteredReturns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No returns found matching your search" : "No TDS returns added yet"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Return Type</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Acknowledgment</TableHead>
                  <TableHead>TDS Deposited</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((ret: TdsReturn) => (
                  <TableRow key={ret.id}>
                    <TableCell className="font-medium">{getClientName(ret.clientId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {ret.returnType}
                      </div>
                    </TableCell>
                    <TableCell>{ret.quarter}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {ret.dueDate ? format(new Date(ret.dueDate), 'dd MMM yyyy') : '-'}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{ret.acknowledgmentNumber || '-'}</TableCell>
                    <TableCell className="font-medium">
                      {ret.totalTdsDeposited ? `₹${ret.totalTdsDeposited.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        ret.status === 'filed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : ret.status === 'overdue'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {ret.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
