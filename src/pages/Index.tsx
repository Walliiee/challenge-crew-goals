
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Target, Users, Plus, Star, Flame, Zap } from "lucide-react";
import ChallengeCard from "@/components/ChallengeCard";
import Leaderboard from "@/components/Leaderboard";
import CreateChallengeModal from "@/components/CreateChallengeModal";
import ProgressUploadModal from "@/components/ProgressUploadModal";
import CelebrationModal from "@/components/CelebrationModal";

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);
  const [activeTab, setActiveTab] = useState("challenges");

  const mockChallenges = [
    {
      id: 1,
      title: "January Running Challenge",
      type: "running",
      description: "Run 100km this month",
      participants: 12,
      endDate: "2025-01-31",
      progress: 65,
      isActive: true
    },
    {
      id: 2,
      title: "Daily Steps Competition",
      type: "steps",
      description: "10,000 steps daily for 2 weeks",
      participants: 8,
      endDate: "2025-01-24",
      progress: 43,
      isActive: true
    },
    {
      id: 3,
      title: "Workout Warriors",
      type: "workout",
      description: "Complete 20 workouts this month",
      participants: 15,
      endDate: "2025-01-31",
      progress: 78,
      isActive: true
    }
  ];

  const handleCelebration = (type, data) => {
    setCelebrationData({ type, data });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                Challenge Arena
              </h1>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Challenge
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Challenges</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Total Points</p>
                  <p className="text-3xl font-bold">1,247</p>
                </div>
                <Star className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Achievements</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <Medal className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Friends</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "challenges" ? "default" : "ghost"}
            onClick={() => setActiveTab("challenges")}
            className={activeTab === "challenges" ? "bg-white shadow-sm" : ""}
          >
            <Target className="h-4 w-4 mr-2" />
            Challenges
          </Button>
          <Button
            variant={activeTab === "leaderboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("leaderboard")}
            className={activeTab === "leaderboard" ? "bg-white shadow-sm" : ""}
          >
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab === "challenges" ? (
            <>
              {/* Active Challenges */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Active Challenges</h2>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <Flame className="h-3 w-3 mr-1" />
                    3 Active
                  </Badge>
                </div>
                <div className="space-y-4">
                  {mockChallenges.map((challenge) => (
                    <ChallengeCard 
                      key={challenge.id} 
                      challenge={challenge}
                      onUploadProgress={() => setIsUploadModalOpen(true)}
                      onCelebration={handleCelebration}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      Quick Upload
                    </CardTitle>
                    <CardDescription>
                      Log your progress quickly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setIsUploadModalOpen(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Upload Progress
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                      <Medal className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium text-sm">First Place!</p>
                        <p className="text-xs text-gray-600">Steps Challenge</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <Star className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">Streak Master</p>
                        <p className="text-xs text-gray-600">7 days in a row</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="lg:col-span-3">
              <Leaderboard onCelebration={handleCelebration} />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateChallengeModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      <ProgressUploadModal 
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
