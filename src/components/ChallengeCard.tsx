
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Calendar, Activity, Target, Footprints, Dumbbell } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  type: string;
  description: string;
  participants: number;
  endDate: string;
  progress: number;
  isActive: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onUploadProgress: () => void;
  onCelebration: (type: string, data: any) => void;
}

const ChallengeCard = ({ challenge, onUploadProgress, onCelebration }: ChallengeCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "running":
        return <Activity className="h-4 w-4" />;
      case "steps":
        return <Footprints className="h-4 w-4" />;
      case "workout":
        return <Dumbbell className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-100 text-blue-700";
      case "steps":
        return "bg-green-100 text-green-700";
      case "workout":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleUpload = () => {
    onUploadProgress();
    // Simulate milestone celebration
    if (challenge.progress >= 50 && Math.random() > 0.7) {
      onCelebration("milestone", {
        title: "Halfway There!",
        message: `Great job on ${challenge.title}!`,
        progress: challenge.progress
      });
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getTypeColor(challenge.type)}>
                {getTypeIcon(challenge.type)}
                <span className="ml-1 capitalize">{challenge.type}</span>
              </Badge>
              {challenge.isActive && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Active
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{challenge.title}</CardTitle>
            <CardDescription className="mt-1">{challenge.description}</CardDescription>
          </div>
          <Trophy className="h-6 w-6 text-yellow-500" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{challenge.participants} participants</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            onClick={handleUpload}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Log Progress
          </Button>
          <Button variant="outline" className="px-6">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
