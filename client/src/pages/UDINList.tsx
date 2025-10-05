import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Copy, Check } from "lucide-react";
import { UDINDialog } from "@/components/UDINDialog";
import { useQuery } from "@tanstack/react-query";

export default function UDINList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [udinDialogOpen, setUdinDialogOpen] = useState(false);

  const { data: udins = [], isLoading } = useQuery({
    queryKey: ["/api/udin-records"],
    queryFn: async () => {
      const response = await fetch("/api/udin-records", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch UDIN records");
      return response.json();
    },
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["/api/employees"],
    queryFn: async () => {
      const response = await fetch("/api/employees", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch employees");
      return response.json();
    },
  });

  const getEmployeeName = (employeeId: string) => {
    const employee = (employees as any[])?.find((e: any) => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : "Unknown";
  };

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  const copyUDIN = (udin: string, id: string) => {
    navigator.clipboard.writeText(udin);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">UDIN List</h1>
          <p className="text-sm text-muted-foreground mt-1">Unique Document Identification Numbers</p>
        </div>
        <Button data-testid="button-generate-udin" onClick={() => setUdinDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Generate UDIN
        </Button>
      </div>

      <UDINDialog open={udinDialogOpen} onOpenChange={setUdinDialogOpen} />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search UDIN or client..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-udin"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UDIN Number</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead>CA Name</TableHead>
              <TableHead>Generated Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Loading UDIN records...
                </TableCell>
              </TableRow>
            ) : udins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No UDIN records found. Click "Generate UDIN" to create one.
                </TableCell>
              </TableRow>
            ) : (
              (udins as any[]).map((udin) => (
                <TableRow key={udin.id} data-testid={`row-udin-${udin.id}`}>
                  <TableCell className="font-mono text-sm font-medium">{udin.udinNumber}</TableCell>
                  <TableCell>{udin.clientName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{udin.documentType}</TableCell>
                  <TableCell>{getEmployeeName(udin.employeeId)}</TableCell>
                  <TableCell className="font-mono text-sm">{formatDate(udin.generatedDate)}</TableCell>
                  <TableCell className="font-mono text-sm">{formatDate(udin.expiryDate)}</TableCell>
                  <TableCell>
                    <Badge variant={udin.status === 'active' ? 'default' : 'secondary'}>
                      {udin.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyUDIN(udin.udinNumber, udin.id)}
                      data-testid={`button-copy-${udin.id}`}
                    >
                      {copiedId === udin.id ? (
                        <Check className="w-4 h-4 text-chart-2" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
