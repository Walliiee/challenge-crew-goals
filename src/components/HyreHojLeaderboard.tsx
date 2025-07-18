import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Crown, Medal, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const HyreHojLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          kilometers,
          family_members (
            name,
            avatar
          )
        `)
        .eq('activity_type', 'hyre_hoj');

      if (error) {
        console.error("Error fetching leaderboard data:", error);
        setLeaderboardData([]);
      } else {
        const aggregatedData = data.reduce((acc, log) => {
          const memberName = log.family_members.name;
          if (!acc[memberName]) {
            acc[memberName] = {
              name: memberName,
              avatar: log.family_members.avatar,
              trips: 0,
            };
          }
          acc[memberName].trips += log.kilometers;
          return acc;
        }, {} as any);

        const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => b.trips - a.trips);
        setLeaderboardData(sortedData);
      }
      setLoading(false);
    };

    fetchLeaderboardData();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank + 1}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
          Hyre Hoj Leaderboard
        </CardTitle>
        <CardDescription>Top performers in the Hyre Hoj challenge</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {leaderboardData.map((participant, index) => (
              <div
                key={participant.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index)}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="font-semibold">
                      {participant.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{participant.name}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{participant.trips}</p>
                  <p className="text-sm text-gray-500">trips</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HyreHojLeaderboard;
