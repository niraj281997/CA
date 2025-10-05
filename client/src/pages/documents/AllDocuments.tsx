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
import { Search, Plus, Download, Eye, FileText } from "lucide-react";

//todo: remove mock functionality
const mockDocuments = [
  {
    id: '1',
    documentName: 'Tax Audit Report 2024-25',
    documentNumber: 'TAR-2025-001',
    clientName: 'ABC Corporation Ltd',
    fileLocation: 'Shelf A-12',
    fileLabel: 'Tax Audits',
    type: 'Audit Report',
    status: 'inward',
    inwardDate: '2025-10-01',
  },
  {
    id: '2',
    documentName: 'GST Return Documents Q3',
    documentNumber: 'GST-2025-Q3',
    clientName: 'XYZ Industries Pvt Ltd',
    fileLocation: 'Shelf B-05',
    fileLabel: 'GST Returns',
    type: 'GST Filing',
    status: 'outward',
    outwardDate: '2025-10-05',
  },
  {
    id: '3',
    documentName: 'Financial Statements FY 2024-25',
    documentNumber: 'FS-2025-001',
    clientName: 'DEF Services Ltd',
    fileLocation: 'Shelf C-18',
    fileLabel: 'Financial Statements',
    type: 'Financial Report',
    status: 'inward',
    inwardDate: '2025-10-03',
  },
];

const statusColors = {
  inward: 'bg-chart-1 text-primary-foreground',
  outward: 'bg-chart-3 text-white',
  archived: 'bg-muted text-muted-foreground',
};

export default function AllDocuments() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">All Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete document repository</p>
        </div>
        <Button data-testid="button-add-document">
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockDocuments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-1">
              {mockDocuments.filter(d => d.status === 'inward').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">
              {mockDocuments.filter(d => d.status === 'outward').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">File Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-documents"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Document Number</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.map((doc) => (
                <TableRow key={doc.id} data-testid={`row-document-${doc.id}`}>
                  <TableCell className="font-medium">{doc.documentName}</TableCell>
                  <TableCell className="font-mono text-sm">{doc.documentNumber}</TableCell>
                  <TableCell>{doc.clientName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{doc.fileLocation}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.fileLabel}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[doc.status as keyof typeof statusColors]}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {doc.status === 'inward' ? doc.inwardDate : doc.outwardDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" data-testid={`button-view-${doc.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" data-testid={`button-download-${doc.id}`}>
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
