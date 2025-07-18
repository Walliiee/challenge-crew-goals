import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Plus, UserPlus, LogOut } from "lucide-react";
import FamilyLeaderboard from "@/components/FamilyLeaderboard";
import KilometersUploadModal from "@/components/KilometersUploadModal";
import AddFamilyMemberModal, { NewFamilyMember } from "@/components/AddFamilyMemberModal";
import FamilyChallengeCard from "@/components/FamilyChallengeCard";
import QuickActionsCard from "@/components/QuickActionsCard";
import TodayActivityList from "@/components/TodayActivityList";
import ActivityBreakdown from "@/components/ActivityBreakdown";
import CelebrationModal from "@/components/CelebrationModal";
import ActivityCalendar from "@/components/ActivityCalendar";
import LongestStreakLeaderboard from "@/components/LongestStreakLeaderboard";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useAuth } from "@/hooks/useAuth";
import { recalcMemberStreak } from "@/lib/streak";

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);
  
  const { familyMembers, addMember, updateMember } = useFamilyMembers();
  const { addActivity, activityLogs } = useActivityLogs();
  const { user, signOut } = useAuth();

  // Transform database data to match component interface
  const transformedMembers = familyMembers.map(member => ({
    ...member,
    walkingKm: member.walking_km,
    runningKm: member.running_km,
    lastActivity: member.last_activity
  }));

  // Family kilometers challenge data
  const familyChallenge = {
    title: "Family Kilometers Challenge",
    description: "Let's reach 300km together this month!",
    totalGoal: 300,
    totalProgress: familyMembers.reduce((sum, member) => sum + Number(member.kilometers), 0),
    endDate: "2025-07-31",
    daysLeft: 20
  };

  const handleAddMember = async (newMember: NewFamilyMember) => {
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
    const { kilometers, activityType, memberName, date } = data;
    
    try {
      // Find the family member
      const member = familyMembers.find(m => m.name === memberName);
      if (!member) return;

      // Add activity log with the selected date
      await addActivity({
        family_member_id: member.id,
        activity_type: activityType,
        kilometers: Number(kilometers),
        date: date, // Use the selected date from the form
        notes: data.notes || null
      });

      // Update distance totals
      const updatedMember: any = {
        kilometers: Number(member.kilometers) + Number(kilometers)
      };

      if (activityType === 'walking') {
        updatedMember.walking_km = Number(member.walking_km) + Number(kilometers);
      } else if (activityType === 'running') {
        updatedMember.running_km = Number(member.running_km) + Number(kilometers);
      }

      await updateMember({ id: member.id, ...updatedMember });

      // Recalculate streak based on all logs
      await recalcMemberStreak(member.id);

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


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-lg">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent truncate">
                  Family Challenge
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Working together, achieving more</p>
              </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 sm:hidden">
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => setIsAddMemberModalOpen(true)}
                variant="outline"
                size="sm"
                className="border-blue-200 hover:bg-blue-50"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-red-200 hover:bg-red-50 text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden lg:block">
                Welcome, {user?.email}
              </span>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-red-200 hover:bg-red-50 text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
              <Button 
                onClick={() => setIsAddMemberModalOpen(true)}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Add Member</span>
              </Button>
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Log Kilometers</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <FamilyChallengeCard
          title={familyChallenge.title}
          description={familyChallenge.description}
          totalGoal={familyChallenge.totalGoal}
          totalProgress={familyChallenge.totalProgress}
          daysLeft={familyChallenge.daysLeft}
          memberCount={familyMembers.length}
          activeToday={familyMembers.filter(m => m.last_activity === "Today").length}
          bestStreak={familyMembers.length > 0 ? Math.max(...familyMembers.map(m => m.streak)) : 0}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <FamilyLeaderboard 
              members={transformedMembers}
              onCelebration={handleCelebration}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-4 sm:space-y-6">
            {/* Activity Breakdown */}
            <ActivityBreakdown members={transformedMembers} />

            {/* Activity Calendar */}
            <ActivityCalendar />

            <QuickActionsCard
              onLog={() => setIsUploadModalOpen(true)}
              onAddMember={() => setIsAddMemberModalOpen(true)}
            />

            <TodayActivityList members={familyMembers} />

            <LongestStreakLeaderboard
              members={familyMembers}
              activityLogs={activityLogs}
            />

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
