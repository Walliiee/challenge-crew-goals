
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Activity, Footprints, Bike, Calendar as CalendarIcon } from "lucide-react";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { format, parseISO, isSameDay } from "date-fns";

const ActivityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { activityLogs } = useActivityLogs();
  const { familyMembers } = useFamilyMembers();

  // Get activities for the selected date
  const selectedDateActivities = activityLogs.filter(log => 
    isSameDay(parseISO(log.date), selectedDate)
  );

  // Get dates that have activities
  const activityDates = activityLogs.map(log => parseISO(log.date));

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'running':
        return <Activity className="h-3 w-3" />;
      case 'walking':
        return <Footprints className="h-3 w-3" />;
      case 'cycling':
        return <Bike className="h-3 w-3" />;
      default:
        return <Activity className="h-3 w-3" />;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType) {
      case 'running':
        return 'bg-orange-100 text-orange-700';
      case 'walking':
        return 'bg-blue-100 text-blue-700';
      case 'cycling':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getMemberName = (familyMemberId: string) => {
    const member = familyMembers.find(m => m.id === familyMemberId);
    return member?.name || 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
          Activity Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border p-3 pointer-events-auto"
          modifiers={{
            hasActivity: activityDates
          }}
          modifiersStyles={{
            hasActivity: {
              backgroundColor: 'rgb(59 130 246 / 0.1)',
              color: 'rgb(37 99 235)',
              fontWeight: 'bold'
            }
          }}
        />

        {/* Selected Date Activities */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">
            Activities for {format(selectedDate, 'MMM dd, yyyy')}
          </h4>
          
          {selectedDateActivities.length > 0 ? (
            <div className="space-y-2">
              {selectedDateActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={`${getActivityColor(activity.activity_type)} flex items-center space-x-1`}>
                      {getActivityIcon(activity.activity_type)}
                      <span className="capitalize text-xs">{activity.activity_type}</span>
                    </Badge>
                    <span className="text-sm font-medium">{getMemberName(activity.family_member_id)}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{activity.kilometers}km</span>
                </div>
              ))}
              
              {/* Daily total */}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Daily Total:</span>
                  <span className="text-lg font-bold text-green-600">
                    {selectedDateActivities.reduce((sum, activity) => sum + Number(activity.kilometers), 0).toFixed(1)}km
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No activities logged for this day
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="pt-3 border-t border-gray-200">
          <h4 className="font-semibold text-sm mb-2">This Month</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-blue-50 rounded">
              <p className="font-bold text-blue-600">{activityLogs.length}</p>
              <p className="text-blue-500">Total Activities</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="font-bold text-green-600">
                {activityLogs.reduce((sum, log) => sum + Number(log.kilometers), 0).toFixed(1)}km
              </p>
              <p className="text-green-500">Total Distance</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCalendar;
