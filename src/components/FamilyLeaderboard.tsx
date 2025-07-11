
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Flame, Calendar } from "lucide-react";

interface FamilyMember {
  name: string;
  kilometers: number;
  lastActivity: string;
  streak: number;
  avatar: string;
}

interface FamilyLeaderboardProps {
  members: FamilyMember[];
  onCelebration: (type: string, data: any) => void;
}

const FamilyLeaderboard = ({ members, onCelebration }: FamilyLeaderboardProps) => {
  const sortedMembers = [...members].sort((a, b) => b.kilometers - a.kilometers);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
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

  const getActivityBadge = (lastActivity: string) => {
    switch (lastActivity) {
      case "Today":
        return <Badge className="bg-green-100 text-green-700 text-xs">Active Today</Badge>;
      case "Yesterday":
        return <Badge variant="secondary" className="text-xs">Yesterday</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{lastActivity}</Badge>;
    }
  };

  const handleCelebration = (member: FamilyMember, rank: number) => {
    if (rank <= 3) {
      onCelebration("leaderboard", {
        title: `${member.name} is #${rank}!`,
        message: `Great work on ${member.kilometers}km!`,
        rank,
        member
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Family Leaderboard
          </h2>
          <p className="text-gray-600 mt-1">Who's leading the family challenge?</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {sortedMembers.slice(0, 3).map((member, index) => {
          const positions = [1, 0, 2]; // For podium effect: 2nd, 1st, 3rd
          const actualPosition = positions[index];
          const rank = index + 1;
          return (
            <Card 
              key={member.name}
              className={`text-center cursor-pointer hover:shadow-lg transition-all duration-200 ${
                rank === 1 ? 'scale-105 border-2 border-yellow-200' : ''
              }`}
              style={{ order: actualPosition }}
              onClick={() => handleCelebration(member, rank)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(rank)}`}>
                    {getRankIcon(rank)}
                  </div>
                  
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-orange-500 text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{member.kilometers}km</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{member.streak} day streak</span>
                  </div>
                  
                  {getActivityBadge(member.lastActivity)}
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
            Full Rankings
          </CardTitle>
          <CardDescription>Complete family leaderboard for this challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedMembers.map((member, index) => {
              const rank = index + 1;
              return (
                <div 
                  key={member.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCelebration(member, rank)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(rank)}
                    </div>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="font-semibold bg-gradient-to-r from-blue-500 to-orange-500 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>Last: {member.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">{member.streak}</span>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">{member.kilometers}km</p>
                      {getActivityBadge(member.lastActivity)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyLeaderboard;
