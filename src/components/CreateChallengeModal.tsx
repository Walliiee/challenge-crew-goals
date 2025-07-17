
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Footprints, Dumbbell, Target, Gamepad, Users } from "lucide-react";

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateChallengeModal = ({ isOpen, onClose }: CreateChallengeModalProps) => {
  const [challengeType, setChallengeType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [target, setTarget] = useState("");

  const challengeTypes = [
    { value: "running", label: "Running", icon: Activity, description: "Track distance or time" },
    { value: "walking", label: "Walking", icon: Footprints, description: "Count steps or distance" },
    { value: "workout", label: "Workout", icon: Dumbbell, description: "Exercise sessions" },
    { value: "steps", label: "Daily Steps", icon: Target, description: "Step counting challenge" },
    { value: "games", label: "Games", icon: Gamepad, description: "Gaming competitions" },
    { value: "custom", label: "Custom", icon: Users, description: "Create your own challenge" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the challenge
    console.log("Creating challenge:", { challengeType, title, description, duration, target });
    onClose();
    // Reset form
    setChallengeType("");
    setTitle("");
    setDescription("");
    setDuration("");
    setTarget("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Challenge</DialogTitle>
          <DialogDescription>
            Set up a fun competition for your friends and family
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Challenge Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Challenge Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {challengeTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      challengeType === type.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setChallengeType(type.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`h-6 w-6 ${
                            challengeType === type.value ? 'text-blue-600' : 'text-gray-600'
                          }`}
                        />
                        <div>
                          <h3 className="font-semibold">{type.label}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Challenge Details */}
          {challengeType && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Challenge Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a catchy challenge name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what participants need to do"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="How long?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target">Target Goal</Label>
                  <Input
                    id="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder={
                      challengeType === "running" ? "e.g., 50 km" :
                      challengeType === "steps" ? "e.g., 10,000 steps" :
                      challengeType === "workout" ? "e.g., 20 sessions" :
                      "e.g., Your goal"
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!challengeType || !title}
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600"
            >
              Create Challenge
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeModal;
