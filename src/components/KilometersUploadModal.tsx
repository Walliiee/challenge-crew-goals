
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Footprints, Bike, MapPin } from "lucide-react";

interface KilometersUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

const KilometersUploadModal = ({ isOpen, onClose, onSuccess }: KilometersUploadModalProps) => {
  const [kilometers, setKilometers] = useState("");
  const [activityType, setActivityType] = useState("");
  const [notes, setNotes] = useState("");

  const activityTypes = [
    { id: "running", name: "Running", icon: Activity },
    { id: "walking", name: "Walking", icon: Footprints },
    { id: "cycling", name: "Cycling", icon: Bike },
    { id: "hiking", name: "Hiking", icon: MapPin }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      kilometers: parseFloat(kilometers),
      activityType,
      notes,
      timestamp: new Date().toISOString()
    };
    
    onSuccess(data);
    onClose();
    
    // Reset form
    setKilometers("");
    setActivityType("");
    setNotes("");
  };

  const selectedActivity = activityTypes.find(a => a.id === activityType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-500" />
            Log Your Kilometers
          </DialogTitle>
          <DialogDescription>
            Add your distance to the family challenge
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Type</Label>
            <Select onValueChange={setActivityType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your activity" />
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

          {selectedActivity && (
            <>
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
              disabled={!activityType || !kilometers}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Add to Family Total
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KilometersUploadModal;
