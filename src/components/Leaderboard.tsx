
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Crown, Flame, TrendingUp } from "lucide-react";

interface LeaderboardProps {
  onCelebration: (type: string, data: any) => void;
}

const Leaderboard = ({ onCelebration }: LeaderboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Johnson",
      points: 2847,
      change: "+2",
      streak: 12,
      avatar: "SJ",
      achievements: ["🔥", "🏃‍♀️", "⭐"]
    },
    {
      rank: 2,
      name: "Mike Chen",
      points: 2635,
      change: "0",
      streak: 8,
      avatar: "MC",
      achievements: ["💪", "🎯", "⚡"]
    },
    {
      rank: 3,
      name: "Emma Davis",
      points: 2421,
      change: "+1",
      streak: 15,
      avatar: "ED",
      achievements: ["🏆", "🔥", "🌟"]
    },
    {
      rank: 4,
      name: "Alex Rodriguez",
      points: 2156,
      change: "-1",
      streak: 5,
      avatar: "AR",
      achievements: ["🎯", "💪"]
    },
    {
      rank: 5,
      name: "Lisa Park",
      points: 1987,
      change: "+3",
      streak: 9,
      avatar: "LP",
      achievements: ["⭐", "🏃‍♀️"]
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCelebration = (participant: any) => {
    if (participant.rank <= 3) {
      onCelebration("leaderboard", {
        title: `${participant.name} is in the top 3!`,
        message: `Congratulations on reaching rank #${participant.rank}!`,
        rank: participant.rank,
        participant
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Leaderboard
          </h2>
          <p className="text-gray-600 mt-1">See how you stack up against friends and family</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {["week", "month", "all"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? "bg-white shadow-sm" : ""}
            >
              {period === "all" ? "All Time" : `This ${period.charAt(0).toUpperCase() + period.slice(1)}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((participant, index) => {
          const positions = [1, 0, 2]; // For podium effect: 2nd, 1st, 3rd
          const actualPosition = positions[index];
          return (
            <Card 
              key={participant.rank}
              className={`text-center cursor-pointer hover:shadow-lg transition-all duration-200 ${
                participant.rank === 1 ? 'scale-105 border-2 border-yellow-200' : ''
              }`}
              style={{ order: actualPosition }}
              onClick={() => handleCelebration(participant)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(participant.rank)}`}>
                    {getRankIcon(participant.rank)}
                  </div>
                  
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg font-semibold">
                      {participant.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{participant.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{participant.points.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">points</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{participant.streak} day streak</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    {participant.achievements.map((achievement, i) => (
                      <span key={i} className="text-lg">{achievement}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Full Rankings
          </CardTitle>
          <CardDescription>Complete leaderboard for this {selectedPeriod}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((participant) => (
              <div 
                key={participant.rank}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleCelebration(participant)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(participant.rank)}
                  </div>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="font-semibold">
                      {participant.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-semibold">{participant.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Flame className="h-3 w-3" />
                      <span>{participant.streak} day streak</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    {participant.achievements.map((achievement, i) => (
                      <span key={i} className="text-sm">{achievement}</span>
                    ))}
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{participant.points.toLocaleString()}</p>
                    <Badge 
                      variant={participant.change.startsWith('+') ? 'default' : 
                              participant.change.startsWith('-') ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {participant.change !== "0" && (participant.change.startsWith('+') ? "↗" : "↘")}
                      {participant.change === "0" ? "—" : participant.change}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
