import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target } from 'lucide-react'

type Props = {
  onLog: () => void
  onAddMember: () => void
}

const QuickActionsCard = ({ onLog, onAddMember }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center text-lg">
        <Target className="h-5 w-5 mr-2 text-green-500" />
        Quick Actions
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <Button
        onClick={onLog}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        Log Kilometers
      </Button>
      <Button onClick={onAddMember} variant="outline" className="w-full">
        Add Family Member
      </Button>
    </CardContent>
  </Card>
)

export default QuickActionsCard
