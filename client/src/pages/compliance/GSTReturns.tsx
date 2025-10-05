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
import type { GstReturn, Client } from "@shared/schema";

export default function GSTReturns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: gstReturns = [], isLoading } = useQuery<GstReturn[]>({
    queryKey: ["/api/gst-returns"],
  });

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createReturnMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/gst-returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gst-returns"] });
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

  const filteredReturns = gstReturns.filter((ret: GstReturn) =>
    getClientName(ret.clientId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.returnType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.arn?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: gstReturns.length,
    pending: gstReturns.filter((r: GstReturn) => r.status === 'pending').length,
    filed: gstReturns.filter((r: GstReturn) => r.status === 'filed').length,
    overdue: gstReturns.filter((r: GstReturn) => r.status === 'overdue').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">GST Returns</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage GST return filings and compliance</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add GST Return
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New GST Return</DialogTitle>
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
                    <option value="GSTR-1">GSTR-1</option>
                    <option value="GSTR-3B">GSTR-3B</option>
                    <option value="GSTR-4">GSTR-4</option>
                    <option value="GSTR-5">GSTR-5</option>
                    <option value="GSTR-6">GSTR-6</option>
                    <option value="GSTR-7">GSTR-7</option>
                    <option value="GSTR-8">GSTR-8</option>
                    <option value="GSTR-9">GSTR-9 (Annual)</option>
                    <option value="GSTR-9C">GSTR-9C (Reconciliation)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="returnPeriod">Return Period *</Label>
                  <Input id="returnPeriod" {...register("returnPeriod", { required: true })} placeholder="e.g., Oct 2024" />
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
                  <Label htmlFor="arn">ARN (Acknowledgment Reference Number)</Label>
                  <Input id="arn" {...register("arn")} placeholder="AA123456789012345" />
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
                  <Label htmlFor="grossTurnover">Gross Turnover (₹)</Label>
                  <Input id="grossTurnover" type="number" {...register("grossTurnover")} />
                </div>

                <div>
                  <Label htmlFor="taxableValue">Taxable Value (₹)</Label>
                  <Input id="taxableValue" type="number" {...register("taxableValue")} />
                </div>

                <div>
                  <Label htmlFor="igst">IGST (₹)</Label>
                  <Input id="igst" type="number" {...register("igst")} />
                </div>

                <div>
                  <Label htmlFor="cgst">CGST (₹)</Label>
                  <Input id="cgst" type="number" {...register("cgst")} />
                </div>

                <div>
                  <Label htmlFor="sgst">SGST (₹)</Label>
                  <Input id="sgst" type="number" {...register("sgst")} />
                </div>

                <div>
                  <Label htmlFor="cess">Cess (₹)</Label>
                  <Input id="cess" type="number" {...register("cess")} />
                </div>

                <div>
                  <Label htmlFor="itcClaimed">ITC Claimed (₹)</Label>
                  <Input id="itcClaimed" type="number" {...register("itcClaimed")} />
                </div>

                <div>
                  <Label htmlFor="lateFees">Late Fees (₹)</Label>
                  <Input id="lateFees" type="number" {...register("lateFees")} />
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
            placeholder="Search by client, return type, or ARN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All GST Returns ({filteredReturns.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading GST returns...</div>
          ) : filteredReturns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No returns found matching your search" : "No GST returns added yet"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Return Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>ARN</TableHead>
                  <TableHead>Tax Payable</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((ret: GstReturn) => (
                  <TableRow key={ret.id}>
                    <TableCell className="font-medium">{getClientName(ret.clientId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {ret.returnType}
                      </div>
                    </TableCell>
                    <TableCell>{ret.returnPeriod}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {ret.dueDate ? format(new Date(ret.dueDate), 'dd MMM yyyy') : '-'}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{ret.arn || '-'}</TableCell>
                    <TableCell className="font-medium">
                      {ret.taxPayable ? `₹${ret.taxPayable.toLocaleString()}` : '-'}
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
