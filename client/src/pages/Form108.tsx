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
import { Search, Plus, Download, Eye } from "lucide-react";

//todo: remove mock functionality
const mockForm108Records = [
  {
    id: '1',
    employeeName: 'CA Priya Sharma',
    assessmentYear: '2024-25',
    clientName: 'ABC Corporation Ltd',
    panNumber: 'AAACA1234A',
    formType: 'Form 3CA',
    filingDate: '2024-09-15',
    acknowledgmentNumber: 'ACK123456789',
    status: 'filed',
  },
  {
    id: '2',
    employeeName: 'CA Amit Patel',
    assessmentYear: '2024-25',
    clientName: 'XYZ Industries Pvt Ltd',
    panNumber: 'AAACX5678B',
    formType: 'Form 3CD',
    filingDate: '2024-09-20',
    acknowledgmentNumber: 'ACK987654321',
    status: 'filed',
  },
  {
    id: '3',
    employeeName: 'CA Sneha Reddy',
    assessmentYear: '2024-25',
    clientName: 'DEF Services Ltd',
    panNumber: 'AAACD9012C',
    formType: 'Form 3CA',
    filingDate: '',
    acknowledgmentNumber: '',
    status: 'draft',
  },
  {
    id: '4',
    employeeName: 'CA Rahul Verma',
    assessmentYear: '2023-24',
    clientName: 'GHI Technologies',
    panNumber: 'AAACG3456D',
    formType: 'Form 3CB',
    filingDate: '2024-08-30',
    acknowledgmentNumber: 'ACK456789123',
    status: 'filed',
  },
];

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  filed: 'bg-chart-2 text-white',
  rejected: 'bg-destructive text-destructive-foreground',
};

export default function Form108() {
  const [searchQuery, setSearchQuery] = useState("");

  const draftCount = mockForm108Records.filter(r => r.status === 'draft').length;
  const filedCount = mockForm108Records.filter(r => r.status === 'filed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Form 108</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage CA compliance forms</p>
        </div>
        <Button data-testid="button-create-form">
          <Plus className="w-4 h-4 mr-2" />
          Create Form
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockForm108Records.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">{filedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">{draftCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by client or PAN..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-forms"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form 108 Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CA Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead>Form Type</TableHead>
                <TableHead>Assessment Year</TableHead>
                <TableHead>Filing Date</TableHead>
                <TableHead>ACK Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockForm108Records.map((record) => (
                <TableRow key={record.id} data-testid={`row-form-${record.id}`}>
                  <TableCell className="font-medium">{record.employeeName}</TableCell>
                  <TableCell>{record.clientName}</TableCell>
                  <TableCell className="font-mono text-sm">{record.panNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.formType}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{record.assessmentYear}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {record.filingDate || '-'}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {record.acknowledgmentNumber || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[record.status as keyof typeof statusColors]}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => console.log('View form:', record.id)}
                        data-testid={`button-view-${record.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => console.log('Download form:', record.id)}
                        data-testid={`button-download-${record.id}`}
                      >
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
