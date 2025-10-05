import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Calendar, Users, IndianRupee, FolderOpen, Clock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            CA Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Complete solution for Chartered Accountants to manage tasks, employees, accounts, and documents
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-login"
          >
            Log In to Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-md">
                  <CheckSquare className="w-6 h-6 text-chart-1" />
                </div>
                <CardTitle>Task Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                JIRA-like task board with sprints, approvals, transfers, and cycle tracking. Manage all your client work efficiently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-2/10 rounded-md">
                  <Users className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle>Employee Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete HR suite with attendance tracking, time sheets, Form 108 generation, and employee scheduling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-3/10 rounded-md">
                  <IndianRupee className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle>Accounts & Billing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Invoice generation, payment receipts, client ledger, petty cash, and reimbursement management.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-4/10 rounded-md">
                  <FolderOpen className="w-6 h-6 text-chart-4" />
                </div>
                <CardTitle>Document Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track inward/outward documents, file locations, labels, and complete document tracking with timeline.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-md">
                  <Calendar className="w-6 h-6 text-chart-1" />
                </div>
                <CardTitle>Calendar & Scheduling</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Integrated calendar for deadlines, meetings, task scheduling, and important dates with visual timeline.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-2/10 rounded-md">
                  <Clock className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle>UDIN Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Manage Unique Document Identification Numbers with client linking, expiry tracking, and status monitoring.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Ready to streamline your CA practice?</h2>
              <p className="text-muted-foreground mb-6">
                Join hundreds of CAs who are managing their practice more efficiently with our comprehensive system.
              </p>
              <Button
                size="lg"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-get-started"
              >
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
