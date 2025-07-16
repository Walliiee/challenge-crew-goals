
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Plus, Target, Calendar, Flame, UserPlus, LogOut } from "lucide-react";
import FamilyLeaderboard from "@/components/FamilyLeaderboard";
import KilometersUploadModal from "@/components/KilometersUploadModal";
import AddFamilyMemberModal from "@/components/AddFamilyMemberModal";
import ActivityBreakdown from "@/components/ActivityBreakdown";
import CelebrationModal from "@/components/CelebrationModal";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);
  
  const { familyMembers, addMember, updateMember } = useFamilyMembers();
  const { addActivity } = useActivityLogs();
  const { user, signOut } = useAuth();

  // Family kilometers challenge data
  const familyChallenge = {
    title: "Family Kilometers Challenge",
    description: "Let's reach 300km together this month!",
    totalGoal: 300,
    totalProgress: familyMembers.reduce((sum, member) => sum + Number(member.kilometers), 0),
    endDate: "2025-07-31",
    daysLeft: 20
  };

  const handleAddMember = async (newMember: any) => {
    try {
      await addMember({
        name: newMember.name,
        avatar: newMember.avatar,
        kilometers: 0,
        walking_km: 0,
        running_km: 0,
        last_activity: 'Never',
        streak: 0
      });
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleKilometerLog = async (data: any) => {
    const { kilometers, activityType, memberName } = data;
    
    try {
      // Find the family member
      const member = familyMembers.find(m => m.name === memberName);
      if (!member) return;

      // Add activity log
      await addActivity({
        family_member_id: member.id,
        activity_type: activityType,
        kilometers: Number(kilometers),
        date: new Date().toISOString().split('T')[0],
        notes: data.notes || null
      });

      // Update family member stats
      const updatedMember = {
        kilometers: Number(member.kilometers) + Number(kilometers),
        last_activity: "Today",
        streak: member.last_activity === "Today" ? member.streak : member.streak + 1
      };

      if (activityType === 'walking') {
        updatedMember.walking_km = Number(member.walking_km) + Number(kilometers);
      } else if (activityType === 'running') {
        updatedMember.running_km = Number(member.running_km) + Number(kilometers);
      }

      await updateMember({ id: member.id, ...updatedMember });
      
      handleCelebration("upload", data);
    } catch (error) {
      console.error('Error logging kilometers:', error);
    }
  };

  const handleCelebration = (type: string, data: any) => {
    setCelebrationData({ type, data });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const progressPercentage = Math.round((familyChallenge.totalProgress / familyChallenge.totalGoal) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, {user?.email}
              </span>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-red-200 hover:bg-red-50 text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button 
                onClick={() => setIsAddMemberModalOpen(true)}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
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
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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
                  <span className="text-sm">{familyChallenge.totalProgress.toFixed(1)}km / {familyChallenge.totalGoal}km</span>
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
                  <p className="text-2xl font-bold">{familyMembers.filter(m => m.last_activity === "Today").length}</p>
                  <p className="text-xs text-blue-100">Active Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{familyMembers.length > 0 ? Math.max(...familyMembers.map(m => m.streak)) : 0}</p>
                  <p className="text-xs text-blue-100">Best Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <FamilyLeaderboard 
              members={familyMembers}
              onCelebration={handleCelebration}
            />
          </div>

          {/* Activity Breakdown */}
          <div className="lg:col-span-1">
            <ActivityBreakdown members={familyMembers} />
          </div>

          {/* Quick Actions & Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Log Kilometers
                </Button>
                <Button 
                  onClick={() => setIsAddMemberModalOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  Add Family Member
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {familyMembers
                  .filter(member => member.last_activity === "Today")
                  .map((member) => (
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
                {familyMembers.filter(member => member.last_activity === "Today").length === 0 && (
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
                  <span className="font-medium">{(familyChallenge.totalGoal - familyChallenge.totalProgress).toFixed(1)}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Target:</span>
                  <span className="font-medium">{Math.ceil((familyChallenge.totalGoal - familyChallenge.totalProgress) / familyChallenge.daysLeft)}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Family Average:</span>
                  <span className="font-medium">{familyMembers.length > 0 ? (familyChallenge.totalProgress / familyMembers.length).toFixed(1) : '0.0'}km</span>
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
        onSuccess={handleKilometerLog}
        familyMembers={familyMembers}
      />

      <AddFamilyMemberModal 
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSuccess={handleAddMember}
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
