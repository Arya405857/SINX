import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import QuickActions from "../../components/dashboard/QuickActionCard";
import StatisticsGrid from "../../components/dashboard/StatisticsGrid";
import LearningProgress from "../../components/dashboard/LearningProgress";
import RecentActivity from "../../components/dashboard/RecentActivity";
import DailyGoal from "../../components/dashboard/DailyGoal";
import AccessibilityTip from "../../components/dashboard/AccessibilityTip";
import AIRecommendation from "../../components/dashboard/AIRecommendation";
import SignaCard from "../../components/cards/SignaCard";
/**
 * Dashboard
 * Main authenticated landing page for SIGNIX. Composes the reusable
 * DashboardLayout shell with the dashboard-specific sections below.
 *
 * All handlers are backend-ready placeholders — no logic is implemented.
 * Wire these up to real routing/services without touching the layout,
 * sidebar, or topbar components.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  // ---- Backend-ready placeholders -----------------------------------
  const onNavigate = (id) => {
    // TODO: integrate with existing routing (react-router, etc.)
    const routes = { translator: "/translator", learning: "/learning", history: "/history" };
    if (routes[id]) navigate(routes[id]);
  };

  const onLogout = () => {
    navigate("/login");
  };

  const onContinueLearning = () => {
    // TODO: route to /learning
    navigate("/learning");
  };

  const onQuickTranslate = () => {
    // TODO: open quick translate modal or route to /translator
    navigate("/translator");
  };

  const onCameraTranslate = () => {
    // TODO: route to /translator?mode=camera
    navigate("/translator?mode=camera");
  };

  const onSpeechTranslate = () => {
    // TODO: route to /translator?mode=speech
    navigate("/translator?mode=speech");
  };

  const onTextTranslate = () => {
    // TODO: route to /translator?mode=text
    navigate("/translator?mode=text");
  };

  const onOpenLearning = () => {
    // TODO: route to /learning
    navigate("/learning");
  };

  const onOpenHistory = () => {
    // TODO: route to /history
    navigate("/history");
  };

  const onStartConversation = () => {
    // TODO: launch Signa AI assistant experience (future feature)
    console.log("startConversation");
  };

  const onStartLesson = () => {
    // TODO: route to recommended lesson in /learning
    navigate("/learning");
  };
  // ---------------------------------------------------------------------

  return (
    <DashboardLayout
      title="Dashboard"
      activeItem="dashboard"
      userName="Arya"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="space-y-6">
        <WelcomeCard
          userName="Arya"
          onContinueLearning={onContinueLearning}
          onQuickTranslate={onQuickTranslate}
        />

        <QuickActions
          onCameraTranslate={onCameraTranslate}
          onSpeechTranslate={onSpeechTranslate}
          onTextTranslate={onTextTranslate}
          onOpenLearning={onOpenLearning}
          onOpenHistory={onOpenHistory}
        />

        <StatisticsGrid />

        <SignaCard onStartConversation={onStartConversation} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LearningProgress onContinueLearning={onContinueLearning} />
          </div>
          <DailyGoal />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div className="space-y-5">
            <AIRecommendation onStartLesson={onStartLesson} />
            <AccessibilityTip />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
