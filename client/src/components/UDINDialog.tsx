import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

interface UDINDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UDINDialog({ open, onOpenChange }: UDINDialogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    udinNumber: "",
    documentType: "",
    clientName: "",
    taskId: "",
    employeeId: "",
    generatedDate: "",
    expiryDate: "",
  });

  const { data: tasks } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },
    enabled: open,
  });

  const { data: employees } = useQuery({
    queryKey: ["/api/employees"],
    queryFn: async () => {
      const response = await fetch("/api/employees", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch employees");
      return response.json();
    },
    enabled: open,
  });

  const createUDIN = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/udin-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create UDIN");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/udin-records"] });
      handleClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const udinData = {
      ...formData,
      generatedDate: formData.generatedDate ? new Date(formData.generatedDate).toISOString() : new Date().toISOString(),
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
      taskId: formData.taskId || null,
      status: "active",
    };
    createUDIN.mutate(udinData);
  };

  const handleClose = () => {
    setFormData({
      udinNumber: "",
      documentType: "",
      clientName: "",
      taskId: "",
      employeeId: "",
      generatedDate: "",
      expiryDate: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate UDIN</DialogTitle>
          <DialogDescription>
            Create a new Unique Document Identification Number for your document.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="udinNumber">UDIN Number *</Label>
            <Input
              id="udinNumber"
              value={formData.udinNumber}
              onChange={(e) => setFormData({ ...formData, udinNumber: e.target.value })}
              placeholder="e.g., 24071428ABCDEF123456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type *</Label>
              <Select value={formData.documentType} onValueChange={(value) => setFormData({ ...formData, documentType: value })}>
                <SelectTrigger id="documentType">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tax Audit Report">Tax Audit Report</SelectItem>
                  <SelectItem value="Financial Statement">Financial Statement</SelectItem>
                  <SelectItem value="Statutory Audit">Statutory Audit</SelectItem>
                  <SelectItem value="GST Audit">GST Audit</SelectItem>
                  <SelectItem value="Income Tax Return">Income Tax Return</SelectItem>
                  <SelectItem value="Form 15CA/15CB">Form 15CA/15CB</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Client or company name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">CA Name *</Label>
              <Select value={formData.employeeId} onValueChange={(value) => setFormData({ ...formData, employeeId: value })}>
                <SelectTrigger id="employeeId">
                  <SelectValue placeholder="Select CA" />
                </SelectTrigger>
                <SelectContent>
                  {(employees as any[])?.map((employee: any) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taskId">Related Task</Label>
              <Select value={formData.taskId} onValueChange={(value) => setFormData({ ...formData, taskId: value })}>
                <SelectTrigger id="taskId">
                  <SelectValue placeholder="Select task (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {(tasks as any[])?.map((task: any) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="generatedDate">Generated Date</Label>
              <Input
                id="generatedDate"
                type="date"
                value={formData.generatedDate}
                onChange={(e) => setFormData({ ...formData, generatedDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={createUDIN.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createUDIN.isPending || !formData.udinNumber || !formData.documentType || !formData.clientName || !formData.employeeId}>
              {createUDIN.isPending ? "Generating..." : "Generate UDIN"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
