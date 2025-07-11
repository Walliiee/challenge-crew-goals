
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Plus, Target, Calendar, Flame } from "lucide-react";
import FamilyLeaderboard from "@/components/FamilyLeaderboard";
import KilometersUploadModal from "@/components/KilometersUploadModal";
import CelebrationModal from "@/components/CelebrationModal";

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);

  // Family kilometers challenge data
  const familyChallenge = {
    title: "Family Kilometers Challenge",
    description: "Let's reach 500km together this month!",
    totalGoal: 500,
    totalProgress: 187.5,
    endDate: "2025-01-31",
    daysLeft: 20
  };

  const familyMembers = [
    { name: "Sarah", kilometers: 67.2, lastActivity: "Today", streak: 12, avatar: "S" },
    { name: "Mike", kilometers: 52.8, lastActivity: "Today", streak: 8, avatar: "M" },
    { name: "Emma", kilometers: 43.1, lastActivity: "Yesterday", streak: 15, avatar: "E" },
    { name: "Alex", kilometers: 24.4, lastActivity: "2 days ago", streak: 5, avatar: "A" }
  ];

  const handleCelebration = (type, data) => {
    setCelebrationData({ type, data });
  };

  const progressPercentage = Math.round((familyChallenge.totalProgress / familyChallenge.totalGoal) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  Family Challenge
                </h1>
                <p className="text-sm text-gray-600">Working together, achieving more</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Log Kilometers
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Challenge Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-orange-500 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{familyChallenge.title}</CardTitle>
                <CardDescription className="text-blue-100">
                  {familyChallenge.description}
                </CardDescription>
              </div>
              <Target className="h-8 w-8 text-blue-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Family Progress</span>
                  <span className="text-sm">{familyChallenge.totalProgress}km / {familyChallenge.totalGoal}km</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span>{progressPercentage}% Complete</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{familyChallenge.daysLeft} days left</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-2xl font-bold">{familyMembers.length}</p>
                  <p className="text-xs text-blue-100">Family Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{familyMembers.filter(m => m.lastActivity === "Today").length}</p>
                  <p className="text-xs text-blue-100">Active Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{Math.max(...familyMembers.map(m => m.streak))}</p>
                  <p className="text-xs text-blue-100">Best Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <FamilyLeaderboard 
              members={familyMembers}
              onCelebration={handleCelebration}
            />
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  Quick Log
                </CardTitle>
                <CardDescription>
                  Add your kilometers quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Log My Kilometers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {familyMembers
                  .filter(member => member.lastActivity === "Today")
                  .map((member) => (
                    <div key={member.name} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
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
                {familyMembers.filter(member => member.lastActivity === "Today").length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">No one has logged today yet!</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Challenge Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium">{familyChallenge.totalGoal - familyChallenge.totalProgress}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Target:</span>
                  <span className="font-medium">{Math.ceil((familyChallenge.totalGoal - familyChallenge.totalProgress) / familyChallenge.daysLeft)}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Family Average:</span>
                  <span className="font-medium">{Math.round(familyChallenge.totalProgress / familyMembers.length * 10) / 10}km</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <KilometersUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={(data) => handleCelebration("upload", data)}
      />

      {celebrationData && (
        <CelebrationModal 
          isOpen={!!celebrationData}
          onClose={() => setCelebrationData(null)}
          type={celebrationData.type}
          data={celebrationData.data}
        />
      )}
    </div>
  );
};

export default Index;
