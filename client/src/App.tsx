import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import TaskBoard from "@/pages/TaskBoard";
import AllTasks from "@/pages/AllTasks";
import UDINList from "@/pages/UDINList";
import CalendarView from "@/pages/CalendarView";
import Attendance from "@/pages/Attendance";
import Employees from "@/pages/Employees";
import TimeSheets from "@/pages/TimeSheets";
import Form108 from "@/pages/Form108";
import Invoices from "@/pages/accounts/Invoices";
import PaymentReceipts from "@/pages/accounts/PaymentReceipts";
import ClientLedger from "@/pages/accounts/ClientLedger";
import PettyCash from "@/pages/accounts/PettyCash";
import Reimbursements from "@/pages/accounts/Reimbursements";
import AllDocuments from "@/pages/documents/AllDocuments";
import DocumentTracking from "@/pages/documents/DocumentTracking";
import Clients from "@/pages/Clients";
import GSTReturns from "@/pages/compliance/GSTReturns";
import TDSReturns from "@/pages/compliance/TDSReturns";
import NotFound from "@/pages/not-found";

function AuthenticatedRouter() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tasks" component={TaskBoard} />
      <Route path="/all-tasks" component={AllTasks} />
      <Route path="/udin" component={UDINList} />
      <Route path="/calendar" component={CalendarView} />
      <Route path="/attendance" component={Attendance} />
      <Route path="/employees" component={Employees} />
      <Route path="/timesheets" component={TimeSheets} />
      <Route path="/form108" component={Form108} />
      <Route path="/accounts/invoices" component={Invoices} />
      <Route path="/accounts/receipts" component={PaymentReceipts} />
      <Route path="/accounts/ledger" component={ClientLedger} />
      <Route path="/accounts/petty-cash" component={PettyCash} />
      <Route path="/accounts/reimbursements" component={Reimbursements} />
      <Route path="/documents/all" component={AllDocuments} />
      <Route path="/documents/tracking" component={DocumentTracking} />
      <Route path="/clients" component={Clients} />
      <Route path="/compliance/gst-returns" component={GSTReturns} />
      <Route path="/compliance/tds-returns" component={TDSReturns} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route component={Landing} />
      </Switch>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <AuthenticatedRouter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
