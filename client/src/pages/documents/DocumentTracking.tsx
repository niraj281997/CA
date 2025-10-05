import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, FileText } from "lucide-react";

//todo: remove mock functionality
const mockTrackingData = {
  documentName: 'Tax Audit Report 2024-25',
  documentNumber: 'TAR-2025-001',
  clientName: 'ABC Corporation Ltd',
  currentLocation: 'Shelf A-12',
  currentStatus: 'Under Review',
  timeline: [
    {
      id: '1',
      date: '2025-10-01 09:30 AM',
      action: 'Document Received',
      location: 'Reception Desk',
      user: 'Priya Sharma',
      status: 'completed',
    },
    {
      id: '2',
      date: '2025-10-01 10:15 AM',
      action: 'Filed in Archive',
      location: 'Shelf A-12',
      user: 'Amit Patel',
      status: 'completed',
    },
    {
      id: '3',
      date: '2025-10-02 11:00 AM',
      action: 'Retrieved for Review',
      location: 'Review Room 2',
      user: 'Sneha Reddy',
      status: 'completed',
    },
    {
      id: '4',
      date: '2025-10-03 02:30 PM',
      action: 'Under Review',
      location: 'CA Desk 5',
      user: 'Rahul Verma',
      status: 'in-progress',
    },
  ],
};

export default function DocumentTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Document Tracking</h1>
        <p className="text-sm text-muted-foreground mt-1">Track document movement and status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Document Name</div>
              <div className="font-medium">{mockTrackingData.documentName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Document Number</div>
              <div className="font-mono font-medium">{mockTrackingData.documentNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Client Name</div>
              <div className="font-medium">{mockTrackingData.clientName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-chart-1" />
                <span className="font-medium">{mockTrackingData.currentLocation}</span>
              </div>
            </div>
          </div>
          <div>
            <Badge className="bg-chart-1 text-primary-foreground">
              {mockTrackingData.currentStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6">
            <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-border"></div>
            
            {mockTrackingData.timeline.map((event, index) => (
              <div key={event.id} className="relative flex gap-4" data-testid={`timeline-${event.id}`}>
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  event.status === 'completed' ? 'bg-chart-2' : 'bg-chart-1'
                }`}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                
                <Card className={`flex-1 ${event.status === 'in-progress' ? 'border-chart-1 border-2' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-foreground">{event.action}</h3>
                      <Badge variant={event.status === 'completed' ? 'default' : 'outline'}>
                        {event.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{event.user}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
