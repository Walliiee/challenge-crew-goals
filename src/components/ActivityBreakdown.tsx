
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Footprints, Activity } from "lucide-react";

interface FamilyMember {
  name: string;
  walkingKm: number;
  runningKm: number;
  kilometers: number;
}

interface ActivityBreakdownProps {
  members: FamilyMember[];
}

const ActivityBreakdown = ({ members }: ActivityBreakdownProps) => {
  const totalWalking = members.reduce((sum, member) => sum + member.walkingKm, 0);
  const totalRunning = members.reduce((sum, member) => sum + member.runningKm, 0);
  const totalKm = totalWalking + totalRunning;

  const walkingPercentage = totalKm > 0 ? Math.round((totalWalking / totalKm) * 100) : 0;
  const runningPercentage = totalKm > 0 ? Math.round((totalRunning / totalKm) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Family Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            Activity Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Footprints className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Walking</span>
              </div>
              <span className="text-sm font-bold">{totalWalking.1}km ({walkingPercentage}%)</span>
            </div>
            <Progress value={walkingPercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Running</span>
              </div>
              <span className="text-sm font-bold">{totalRunning.toFixed(1)}km ({runningPercentage}%)</span>
            </div>
            <Progress value={runningPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Individual Breakdowns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Individual Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map((member) => {
            const memberTotal = member.walkingKm + member.runningKm;
            const memberWalkingPct = memberTotal > 0 ? Math.round((member.walkingKm / memberTotal) * 100) : 0;
            const memberRunningPct = memberTotal > 0 ? Math.round((member.runningKm / memberTotal) * 100) : 0;

            return (
              <div key={member.name} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">{member.name}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Footprints className="h-3 w-3 text-blue-500" />
                      <span>Walking</span>
                    </div>
                    <span>{member.walkingKm.toFixed(1)}km ({memberWalkingPct}%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-3 w-3 text-orange-500" />
                      <span>Running</span>
                    </div>
                    <span>{member.runningKm.toFixed(1)}km ({memberRunningPct}%)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityBreakdown;
