
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Camera, MapPin } from "lucide-react";

interface ProgressUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

const ProgressUploadModal = ({ isOpen, onClose, onSuccess }: ProgressUploadModalProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [notes, setNotes] = useState("");

  const activeChallenges = [
    { id: "1", name: "January Running Challenge", type: "running", unit: "km" },
    { id: "2", name: "Daily Steps Competition", type: "steps", unit: "steps" },
    { id: "3", name: "Workout Warriors", type: "workout", unit: "sessions" },
    { id: "4", name: "Hyre Hoj", type: "hyre_hoj", unit: "trips" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      challenge: selectedChallenge,
      value: parseFloat(value),
      unit,
      notes,
      timestamp: new Date().toISOString()
    };
    
    onSuccess(data);
    onClose();
    
    // Reset form
    setSelectedChallenge("");
    setValue("");
    setUnit("");
    setNotes("");
  };

  const selectedChallengeData = activeChallenges.find(c => c.id === selectedChallenge);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2 text-blue-500" />
            Log Your Progress
          </DialogTitle>
          <DialogDescription>
            Update your progress on active challenges
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="challenge">Select Challenge</Label>
            <Select onValueChange={(value) => {
              setSelectedChallenge(value);
              const challenge = activeChallenges.find(c => c.id === value);
              if (challenge) setUnit(challenge.unit);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a challenge" />
              </SelectTrigger>
              <SelectContent>
                {activeChallenges.map((challenge) => (
                  <SelectItem key={challenge.id} value={challenge.id}>
                    {challenge.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedChallengeData && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="value">Amount</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={unit}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did it go? Any achievements?"
                  rows={2}
                />
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2 pt-2">
                <Button type="button" variant="outline" size="sm" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button type="button" variant="outline" size="sm" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </Button>
              </div>
            </>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedChallenge || !value}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Log Progress
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressUploadModal;
