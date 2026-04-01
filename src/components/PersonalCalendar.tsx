import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarDays, Plus, Trash2, Clock, StickyNote, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  event_date: string;
  title: string;
  note: string;
  color: string;
}

const COLOR_OPTIONS = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "pink", label: "Pink", class: "bg-pink-500" },
];

const getColorClass = (color: string) =>
  COLOR_OPTIONS.find((c) => c.value === color)?.class || "bg-blue-500";

const getISTTime = () => {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

const PersonalCalendar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState("blue");
  const [loading, setLoading] = useState(false);
  const [currentIST, setCurrentIST] = useState(getISTTime());

  useEffect(() => {
    const interval = setInterval(() => setCurrentIST(getISTTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user.id)
      .order("event_date", { ascending: true });

    if (!error && data) setEvents(data as CalendarEvent[]);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const openAddDialog = () => {
    setEditingEvent(null);
    setTitle("");
    setNote("");
    setColor("blue");
    setDialogOpen(true);
  };

  const openEditDialog = (event: CalendarEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setNote(event.note);
    setColor(event.color);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const dateStr = format(selectedDate, "yyyy-MM-dd");

    if (editingEvent) {
      const { error } = await supabase
        .from("calendar_events")
        .update({ title, note, color, event_date: dateStr, updated_at: new Date().toISOString() })
        .eq("id", editingEvent.id);

      if (error) toast.error("Failed to update event");
      else toast.success("Event updated!");
    } else {
      const { error } = await supabase
        .from("calendar_events")
        .insert({ user_id: user.id, title, note, color, event_date: dateStr });

      if (error) toast.error("Failed to add event");
      else toast.success("Event added!");
    }

    setDialogOpen(false);
    setLoading(false);
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("calendar_events").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      toast.success("Event removed");
      fetchEvents();
    }
  };

  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const eventsForDate = events.filter((e) => e.event_date === selectedDateStr);

  const eventDates = events.map((e) => new Date(e.event_date + "T00:00:00"));

  const today = new Date();
  const next7 = new Date(today);
  next7.setDate(next7.getDate() + 7);
  const todayStr = format(today, "yyyy-MM-dd");
  const next7Str = format(next7, "yyyy-MM-dd");
  const upcomingEvents = events.filter((e) => e.event_date >= todayStr && e.event_date <= next7Str);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10">
            <CalendarDays className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-semibold">My Calendar</h3>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>IST: {currentIST}</span>
              {upcomingEvents.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[9px] font-medium animate-pulse">
                  {upcomingEvents.length} upcoming
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="flex justify-end mb-3">
                <Button size="sm" onClick={openAddDialog} className="gap-1 text-xs h-8">
                  <Plus className="w-3.5 h-3.5" /> Add Event
                </Button>
              </div>

              <div className="flex justify-center mb-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-xl border border-border/50 pointer-events-auto"
                  modifiers={{ hasEvent: eventDates }}
                  modifiersClassNames={{
                    hasEvent: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary",
                  }}
                />
              </div>

              {selectedDate && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                    {eventsForDate.length === 0 && (
                      <button
                        onClick={openAddDialog}
                        className="text-[10px] text-primary hover:underline"
                      >
                        + Mark this date
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {eventsForDate.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/30 mb-2 group"
                      >
                        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", getColorClass(event.color))} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{event.title}</p>
                          {event.note && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{event.note}</p>
                          )}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditDialog(event)}
                            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                          >
                            <StickyNote className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {upcomingEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-medium text-muted-foreground">Upcoming (7 days)</p>
                  </div>
                  <div className="space-y-1.5">
                    {upcomingEvents.slice(0, 5).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => {
                          setSelectedDate(new Date(event.event_date + "T00:00:00"));
                        }}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", getColorClass(event.color))} />
                        <span className="text-xs flex-1 truncate">{event.title}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {format(new Date(event.event_date + "T00:00:00"), "MMM d")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
            <DialogDescription>
              {selectedDate
                ? `For ${format(selectedDate, "MMMM d, yyyy")}`
                : "Select a date on the calendar first"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Event title (e.g. DGCA Exam)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Add notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", c.class)} />
                      {c.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : editingEvent ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default PersonalCalendar;
