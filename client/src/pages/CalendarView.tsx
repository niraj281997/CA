import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EventDialog } from "@/components/EventDialog";
import { useQuery } from "@tanstack/react-query";

const eventTypeColors: Record<string, string> = {
  deadline: 'bg-destructive',
  task: 'bg-chart-1',
  meeting: 'bg-chart-3',
  gst_filing: 'bg-orange-500',
  tds_filing: 'bg-blue-500',
  itr_filing: 'bg-purple-500',
  audit: 'bg-yellow-500',
  other: 'bg-gray-500',
};

export default function CalendarView() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [currentMonth] = useState('October 2025');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["/api/calendar-events"],
    queryFn: async () => {
      const response = await fetch("/api/calendar-events", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch calendar events");
      return response.json();
    },
  });
  
  const getDaysInMonth = () => {
    const daysArray = [];
    for (let i = 0; i < 5; i++) {
      daysArray.push(i + 1);
    }
    for (let i = 1; i <= 31; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event: any) => {
      const eventDate = new Date(event.eventDate);
      return eventDate.getDate() === day && eventDate.getMonth() === 9;
    });
  };

  const eventsByType = useMemo(() => {
    return {
      deadlines: events.filter((e: any) => e.eventType === 'deadline'),
      meetings: events.filter((e: any) => e.eventType === 'meeting'),
      tasks: events.filter((e: any) => ['task', 'gst_filing', 'tds_filing', 'itr_filing', 'audit'].includes(e.eventType)),
    };
  }, [events]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Task schedule and appointments</p>
        </div>
        <Button data-testid="button-create-event" onClick={() => setEventDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <EventDialog open={eventDialogOpen} onOpenChange={setEventDialogOpen} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{currentMonth}</CardTitle>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" data-testid="button-prev-month">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" data-testid="button-next-month">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
            {getDaysInMonth().map((day, index) => {
              const events = getEventsForDay(day);
              const isCurrentMonth = day > 5;
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] border rounded-md p-2 ${
                    isCurrentMonth
                      ? 'bg-card hover-elevate cursor-pointer'
                      : 'bg-muted/30 text-muted-foreground'
                  }`}
                  data-testid={`day-${day}`}
                >
                  <div className="text-sm font-medium mb-1">{day > 5 ? day : ''}</div>
                  <div className="space-y-1">
                    {events.map((event: any) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded ${eventTypeColors[event.eventType] || 'bg-gray-500'} text-white truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-destructive"></div>
              Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : eventsByType.deadlines.length > 0 ? (
              eventsByType.deadlines.map((event: any) => (
                <div key={event.id} className="flex items-center justify-between text-sm">
                  <span>{event.title}</span>
                  <Badge variant="outline">{new Date(event.eventDate).toLocaleDateString()}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No deadlines</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-1"></div>
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : eventsByType.tasks.length > 0 ? (
              eventsByType.tasks.map((event: any) => (
                <div key={event.id} className="flex items-center justify-between text-sm">
                  <span>{event.title}</span>
                  <Badge variant="outline">{new Date(event.eventDate).toLocaleDateString()}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tasks</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-3"></div>
              Meetings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : eventsByType.meetings.length > 0 ? (
              eventsByType.meetings.map((event: any) => (
                <div key={event.id} className="flex items-center justify-between text-sm">
                  <span>{event.title}</span>
                  <Badge variant="outline">{new Date(event.eventDate).toLocaleDateString()}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No meetings</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
