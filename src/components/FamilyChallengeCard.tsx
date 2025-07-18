import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Target } from 'lucide-react'

type Props = {
  title: string
  description: string
  totalProgress: number
  totalGoal: number
  daysLeft: number
  memberCount: number
  activeToday: number
  bestStreak: number
}

const FamilyChallengeCard = ({ title, description, totalProgress, totalGoal, daysLeft, memberCount, activeToday, bestStreak }: Props) => {
  const progressPercentage = Math.round((totalProgress / totalGoal) * 100)
  return (
    <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-500 to-orange-500 text-white">
      <CardHeader className="pb-4 sm:pb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl sm:text-2xl mb-2 leading-tight">{title}</CardTitle>
            <CardDescription className="text-blue-100 text-sm sm:text-base">
              {description}
            </CardDescription>
          </div>
          <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Family Progress</span>
              <span className="text-sm">{totalProgress.toFixed(1)}km / {totalGoal}km</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span>{progressPercentage}% Complete</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold">{memberCount}</p>
              <p className="text-xs text-blue-100">Members</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold">{activeToday}</p>
              <p className="text-xs text-blue-100">Active Today</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold">{bestStreak}</p>
              <p className="text-xs text-blue-100">Best Streak</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FamilyChallengeCard
