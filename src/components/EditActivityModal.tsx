import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Activity, Footprints, Bike, Waves, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  familyMembers: any[];
  initialActivity: any;
}

const EditActivityModal = ({ isOpen, onClose, onSave, familyMembers, initialActivity }: EditActivityModalProps) => {
  const [kilometers, setKilometers] = useState("0");
  const [activityType, setActivityType] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (initialActivity) {
      setKilometers(String(initialActivity.kilometers));
      setActivityType(initialActivity.activity_type);
      const member = familyMembers.find(m => m.id === initialActivity.family_member_id);
      setSelectedMember(member ? member.name : "");
      setNotes(initialActivity.notes || "");
      setSelectedDate(new Date(initialActivity.date));
    }
  }, [initialActivity, familyMembers]);

  const activityTypes = [
    { id: "running", name: "Running", icon: Activity },
    { id: "walking", name: "Walking", icon: Footprints },
    { id: "cycling", name: "Cycling", icon: Bike },
    { id: "swimming", name: "Swimming", icon: Waves }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const data = {
      kilometers: parseFloat(kilometers),
      activityType,
      memberName: selectedMember,
      notes,
      date: formattedDate
    };
    onSave(data);
    onClose();
  };

  const selectedActivity = activityTypes.find(a => a.id === activityType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-500" />
            Edit Activity
          </DialogTitle>
          <DialogDescription>
            Update logged activity details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Family Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember} required>
              <SelectTrigger>
                <SelectValue placeholder="Select family member" />
              </SelectTrigger>
              <SelectContent>
                {familyMembers.map((member) => (
                  <SelectItem key={member.name} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Type</Label>
            <Select value={activityType} onValueChange={setActivityType} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose activity" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <SelectItem key={activity.id} value={activity.id}>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{activity.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {selectedActivity && selectedMember && (
            <>
              <div className="space-y-2">
                <Label>Activity Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometers">Distance (kilometers)</Label>
                <Input
                  id="kilometers"
                  type="number"
                  step="0.1"
                  value={kilometers}
                  onChange={(e) => setKilometers(e.target.value)}
                  placeholder="0.0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did it go? Where did you go?"
                  rows={2}
                />
              </div>
            </>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!activityType || !kilometers || !selectedMember}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditActivityModal;
