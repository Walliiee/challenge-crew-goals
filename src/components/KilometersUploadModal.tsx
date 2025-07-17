
import { useState } from "react";
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

interface KilometersUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
  familyMembers: any[];
}

const KilometersUploadModal = ({ isOpen, onClose, onSuccess, familyMembers }: KilometersUploadModalProps) => {
  const [kilometers, setKilometers] = useState("");
  const [activityType, setActivityType] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const activityTypes = [
    { id: "running", name: "Running", icon: Activity },
    { id: "walking", name: "Walking", icon: Footprints },
    { id: "cycling", name: "Cycling", icon: Bike },
    { id: "swimming", name: "Swimming", icon: Waves }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format date properly as YYYY-MM-DD
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    const data = {
      kilometers: parseFloat(kilometers),
      activityType,
      memberName: selectedMember,
      notes,
      date: formattedDate,
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting activity data:', data);
    
    onSuccess(data);
    onClose();
    
    // Reset form
    setKilometers("");
    setActivityType("");
    setSelectedMember("");
    setNotes("");
    setSelectedDate(new Date());
  };

  const selectedActivity = activityTypes.find(a => a.id === activityType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-500" />
            Log Kilometers
          </DialogTitle>
          <DialogDescription>
            Add kilometers for a family member
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Family Member</Label>
            <Select onValueChange={setSelectedMember} required>
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
            <Select onValueChange={setActivityType} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose activity" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((activity) => (
                  <SelectItem key={activity.id} value={activity.id}>
                    <div className="flex items-center space-x-2">
                      <activity.icon className="h-4 w-4" />
                      <span>{activity.name}</span>
                    </div>
                  </SelectItem>
                ))}
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

              {/* Quick Distance Buttons */}
              <div className="space-y-2">
                <Label>Quick Add</Label>
                <div className="flex space-x-2">
                  {[1, 2, 5, 10].map((distance) => (
                    <Button
                      key={distance}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setKilometers(distance.toString())}
                      className="flex-1"
                    >
                      {distance}km
                    </Button>
                  ))}
                </div>
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
              Log Activity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KilometersUploadModal;
