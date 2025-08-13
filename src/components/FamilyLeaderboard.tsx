
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Flame, Calendar, Activity, Footprints } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  kilometers: number;
  walkingKm: number;
  runningKm: number;
  lastActivity: string;
  streak: number;
  avatar: string;
  gender?: string;
  age?: number;
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {sortedMembers.slice(0, 3).map((member, index) => {
          const positions = [1, 0, 2]; // For podium effect: 2nd, 1st, 3rd
          const actualPosition = positions[index];
          const rank = index + 1;
          return (
            <Card 
              key={member.id}
              className={`text-center cursor-pointer hover:shadow-lg transition-all duration-200 touch-manipulation ${
                rank === 1 ? 'sm:scale-105 border-2 border-yellow-200' : ''
              }`}
              style={{ order: window.innerWidth >= 640 ? actualPosition : index }}
              onClick={() => handleCelebration(member, rank)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getRankBadgeColor(rank)}`}>
                    {getRankIcon(rank)}
                  </div>
                  
                  <Avatar className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <AvatarFallback className="text-sm sm:text-lg font-semibold bg-gradient-to-r from-blue-500 to-orange-500 text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 sm:flex-none text-left sm:text-center">
                    <h3 className="font-semibold text-base sm:text-lg truncate">{member.name}</h3>
                    {member.age && member.gender && (
                      <p className="text-xs text-gray-500">{member.age}y, {member.gender}</p>
                    )}
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{member.kilometers}km</p>
                    
                    {/* Activity Breakdown */}
                    <div className="flex items-center space-x-2 text-xs mt-1 sm:justify-center">
                      <div className="flex items-center space-x-1">
                        <Footprints className="h-3 w-3 text-blue-500" />
                        <span>{member.walkingKm.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-3 w-3 text-orange-500" />
                        <span>{member.runningKm.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-1 sm:justify-center">
                      <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                      <span className="text-xs sm:text-sm font-medium">{member.streak} days</span>
                    </div>
                    
                    <div className="mt-2">
                      {getActivityBadge(member.lastActivity)}
                    </div>
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
                  key={member.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation"
                  onClick={() => handleCelebration(member, rank)}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                      {getRankIcon(rank)}
                    </div>
                    
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback className="font-semibold bg-gradient-to-r from-blue-500 to-orange-500 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold truncate">{member.name}</h4>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span className="truncate">Last: {member.lastActivity}</span>
                        {member.age && member.gender && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{member.age}y, {member.gender}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs mt-1">
                        <div className="flex items-center space-x-1">
                          <Footprints className="h-3 w-3 text-blue-500" />
                          <span className="hidden sm:inline">{member.walkingKm.toFixed(1)}km walking</span>
                          <span className="sm:hidden">{member.walkingKm.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-3 w-3 text-orange-500" />
                          <span className="hidden sm:inline">{member.runningKm.toFixed(1)}km running</span>
                          <span className="sm:hidden">{member.runningKm.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                      <span className="text-xs sm:text-sm font-medium">{member.streak}</span>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-base sm:text-lg">{member.kilometers}km</p>
                      <div className="hidden sm:block">
                        {getActivityBadge(member.lastActivity)}
                      </div>
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
