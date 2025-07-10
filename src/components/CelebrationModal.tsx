
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Star, Sparkles, Crown } from "lucide-react";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "upload" | "milestone" | "leaderboard" | "achievement";
  data: any;
}

const CelebrationModal = ({ isOpen, onClose, type, data }: CelebrationModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const getCelebrationContent = () => {
    switch (type) {
      case "upload":
        return {
          icon: <Star className="h-16 w-16 text-yellow-500" />,
          title: "Progress Logged! 🎉",
          message: "Great job staying consistent!",
          color: "from-blue-500 to-green-500"
        };
      case "milestone":
        return {
          icon: <Trophy className="h-16 w-16 text-yellow-500" />,
          title: data?.title || "Milestone Reached! 🏆",
          message: data?.message || "You're doing amazing!",
          color: "from-yellow-400 to-orange-500"
        };
      case "leaderboard":
        return {
          icon: data?.rank === 1 ? <Crown className="h-16 w-16 text-yellow-500" /> : <Medal className="h-16 w-16 text-gray-400" />,
          title: data?.title || "Top Performer! 👑",
          message: data?.message || "You're in the top ranks!",
          color: data?.rank === 1 ? "from-yellow-400 to-yellow-600" : "from-gray-300 to-gray-500"
        };
      case "achievement":
        return {
          icon: <Sparkles className="h-16 w-16 text-purple-500" />,
          title: "Achievement Unlocked! ✨",
          message: "You've earned a new badge!",
          color: "from-purple-500 to-pink-500"
        };
      default:
        return {
          icon: <Star className="h-16 w-16 text-yellow-500" />,
          title: "Celebration! 🎉",
          message: "Keep up the great work!",
          color: "from-blue-500 to-purple-500"
        };
    }
  };

  const content = getCelebrationContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center border-0 bg-transparent shadow-none">
        <div className={`relative bg-gradient-to-br ${content.color} p-8 rounded-2xl text-white overflow-hidden`}>
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex justify-center animate-bounce">
              {content.icon}
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <p className="text-lg opacity-90">{content.message}</p>
            </div>

            {data?.progress && (
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-sm opacity-80">Progress</p>
                <p className="text-xl font-bold">{data.progress}%</p>
              </div>
            )}

            <Button 
              onClick={onClose}
              variant="secondary"
              className="mt-6 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationModal;
