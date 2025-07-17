import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flame } from "lucide-react";
import { calculateStreaks } from "@/lib/streak";

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
}

interface ActivityLog {
  family_member_id: string;
  date: string;
}

interface Props {
  members: FamilyMember[];
  activityLogs: ActivityLog[];
}

const LongestStreakLeaderboard = ({ members, activityLogs }: Props) => {
  const memberData = members.map(member => {
    const logs = activityLogs.filter(l => l.family_member_id === member.id);
    const { longestStreak } = calculateStreaks(logs.map(l => l.date));
    return { ...member, longestStreak };
  });

  const sorted = memberData.sort((a, b) => b.longestStreak - a.longestStreak);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Flame className="h-5 w-5 mr-2 text-orange-500" />
          Longest Streaks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sorted.map((member, idx) => (
            <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-semibold">{idx + 1}.</span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{member.name}</span>
              </div>
              <span className="text-sm font-bold">{member.longestStreak} days</span>
            </div>
          ))}
          {sorted.length === 0 && (
            <p className="text-sm text-center text-gray-500">No streaks yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LongestStreakLeaderboard;
