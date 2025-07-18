import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame } from 'lucide-react'

interface Member {
  id: string
  name: string
  avatar: string
  last_activity: string | null
  streak: number
}

type Props = {
  members: Member[]
}

const TodayActivityList = ({ members }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Today's Activity</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {members
        .filter(m => m.last_activity === 'Today')
        .map(member => (
          <div key={member.id} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {member.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{member.name}</p>
              <p className="text-xs text-gray-600">Logged today</p>
            </div>
            <div className="flex items-center space-x-1 text-orange-500">
              <Flame className="h-3 w-3" />
              <span className="text-xs font-medium">{member.streak}</span>
            </div>
          </div>
        ))}
      {members.filter(m => m.last_activity === 'Today').length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">No one has logged today yet!</p>
      )}
    </CardContent>
  </Card>
)

export default TodayActivityList
