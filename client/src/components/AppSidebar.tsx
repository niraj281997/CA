import {
  Calendar,
  CheckSquare,
  Users,
  Clock,
  FileText,
  LayoutDashboard,
  ListTodo,
  ClipboardList,
  IndianRupee,
  FolderOpen,
  Building2,
  FileBarChart,
  Receipt,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const taskMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Task Board", url: "/tasks", icon: CheckSquare },
  { title: "All Tasks", url: "/all-tasks", icon: ListTodo },
  { title: "UDIN List", url: "/udin", icon: ClipboardList },
  { title: "Calendar", url: "/calendar", icon: Calendar },
];

const employeeMenuItems = [
  { title: "Attendance", url: "/attendance", icon: Clock },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Time Sheets", url: "/timesheets", icon: FileText },
  { title: "Form 108", url: "/form108", icon: FileText },
];

const accountsMenuItems = [
  { title: "Invoices", url: "/accounts/invoices", icon: IndianRupee },
  { title: "Payment Receipts", url: "/accounts/receipts", icon: IndianRupee },
  { title: "Client Ledger", url: "/accounts/ledger", icon: IndianRupee },
  { title: "Petty Cash", url: "/accounts/petty-cash", icon: IndianRupee },
  { title: "Reimbursements", url: "/accounts/reimbursements", icon: IndianRupee },
];

const documentMenuItems = [
  { title: "All Documents", url: "/documents/all", icon: FolderOpen },
  { title: "Document Tracking", url: "/documents/tracking", icon: FolderOpen },
];

const complianceMenuItems = [
  { title: "Clients", url: "/clients", icon: Building2 },
  { title: "GST Returns", url: "/compliance/gst-returns", icon: FileBarChart },
  { title: "TDS Returns", url: "/compliance/tds-returns", icon: Receipt },
];

export default function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">CA Management</h1>
          <p className="text-sm text-muted-foreground">Complete System</p>
        </div>

        <div className="space-y-4">
          <SidebarGroup>
            <SidebarGroupLabel>Task Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {taskMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Employee & HR</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {employeeMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Accounts</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountsMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {documentMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>India CA Compliance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {complianceMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
