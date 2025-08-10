import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Mountain, Calendar, Target } from "lucide-react";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useMemo } from "react";

const HyreHojLeaderboard = () => {
  const { activityLogs } = useActivityLogs();
  const { familyMembers } = useFamilyMembers();

  // Filter for "hyre hoj" activities only
  const hyreHojLogs = useMemo(() => {
    return activityLogs.filter(log => log.activity_type === 'hyre_hoj');
  }, [activityLogs]);

  // Calculate daily leaderboard (today's trips)
  const dailyLeaderboard = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = hyreHojLogs.filter(log => log.date === today);
    
    const memberTrips: Record<string, number> = {};
    
    todayLogs.forEach(log => {
      const member = familyMembers.find(m => m.id === log.family_member_id);
      if (member) {
        if (!memberTrips[member.name]) {
          memberTrips[member.name] = 0;
        }
        memberTrips[member.name] += Number(log.kilometers);
      }
    });

    return Object.entries(memberTrips)
      .map(([name, trips]) => {
        const member = familyMembers.find(m => m.name === name);
        return {
          name,
          trips,
          avatar: member?.avatar || '👤'
        };
      })
      .sort((a, b) => b.trips - a.trips);
  }, [hyreHojLogs, familyMembers]);

  // Calculate total leaderboard (all time trips)
  const totalLeaderboard = useMemo(() => {
    const memberTrips: Record<string, number> = {};
    
    hyreHojLogs.forEach(log => {
      const member = familyMembers.find(m => m.id === log.family_member_id);
      if (member) {
        if (!memberTrips[member.name]) {
          memberTrips[member.name] = 0;
        }
        memberTrips[member.name] += Number(log.kilometers);
      }
    });

    return Object.entries(memberTrips)
      .map(([name, trips]) => {
        const member = familyMembers.find(m => m.name === name);
        return {
          name,
          trips,
          avatar: member?.avatar || '👤'
        };
      })
      .sort((a, b) => b.trips - a.trips);
  }, [hyreHojLogs, familyMembers]);

  const renderLeaderboard = (data: typeof dailyLeaderboard, isDaily = false) => {
    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Mountain className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No trips to Hyre Høj recorded {isDaily ? 'today' : 'yet'}!</p>
          <p className="text-sm mt-1">Be the first to conquer the mountain!</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {data.map((member, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isThird = index === 2;
          
          return (
            <div
              key={member.name}
              className={`relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                isFirst
                  ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 shadow-sm'
                  : isSecond
                  ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300'
                  : isThird
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      isFirst 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                        : isSecond
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                        : isThird
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                        : 'bg-gradient-to-r from-blue-400 to-blue-500'
                    }`}>
                      {member.avatar}
                    </div>
                    {(isFirst || isSecond || isThird) && (
                      <div className="absolute -top-1 -right-1">
                        <Trophy className={`h-4 w-4 ${
                          isFirst ? 'text-yellow-500' : isSecond ? 'text-gray-500' : 'text-orange-500'
                        }`} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={isFirst ? "default" : "secondary"} className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Mountain className="h-4 w-4 text-gray-600" />
                    <span className="text-lg font-bold text-gray-900">
                      {member.trips}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {member.trips === 1 ? 'trip' : 'trips'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mountain className="h-5 w-5 text-green-600" />
          <span>Hyre Høj Challenge</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Track trips up the mountain</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily" className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Today</span>
            </TabsTrigger>
            <TabsTrigger value="total" className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>Total</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-4">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Today's Leaders</h3>
                <p className="text-sm text-gray-600">Who conquered Hyre Høj today?</p>
              </div>
              {renderLeaderboard(dailyLeaderboard, true)}
            </div>
          </TabsContent>
          
          <TabsContent value="total" className="mt-4">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">All-Time Champions</h3>
                <p className="text-sm text-gray-600">Total trips to the summit</p>
              </div>
              {renderLeaderboard(totalLeaderboard)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HyreHojLeaderboard;