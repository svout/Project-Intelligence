import Navbar from './marketing/Navbar';
import Hero from './marketing/Hero';
import Problem from './marketing/Problem';
import Solution from './marketing/Solution';
import HowItWorks from './marketing/HowItWorks';
import Features from './marketing/Features';
import FloatingDashboard from './marketing/FloatingDashboard';
import DashboardPreview from './marketing/DashboardPreview';
import Integrations from './marketing/Integrations';
import Testimonials from './marketing/Testimonials';
import Pricing from './marketing/Pricing';
import CTA from './marketing/CTA';
import Footer from './marketing/Footer';
import ProductOverview from './marketing/ProductOverview';
import IntroSection from './marketing/IntroSection';
import FeaturesSlider from './marketing/FeaturesSlider';
import KeyFeatures from './marketing/KeyFeatures';


import { InsightCard } from './meetings/InsightCard';
import { MeetingCard } from './meetings/MeetingCard';
import { MeetingIntelligenceWidget } from './meetings/MeetingIntelligenceWidget';

import AIActions from './dashboard/AIActions';
import BlockedTasks from './dashboard/BlockedTasks';
import ProjectHealth from './dashboard/ProjectHealth';
import RiskScore from './dashboard/RiskScore';
import TeamInsights from './dashboard/TeamInsights';

import { ProjectSwitcher } from './projects/ProjectSwitcher';
import FollowupList from './FollowupList';
import IntegrationCard from './settings/IntegrationCard';
import SettingsSidebar from './settings/SettingsSidebar';

const Widgets = {
  // Marketing
  Navbar,
  Hero,
  Problem,
  Solution,
  HowItWorks,
  Features,
  ProductOverview,
  IntroSection,
  FeaturesSlider,
  KeyFeatures,
  FloatingDashboard,
  DashboardPreview,
  Integrations,
  Testimonials,
  Pricing,
  CTA,
  Footer,

  // Marketing/sections


  // Meetings
  InsightCard,
  MeetingCard,
  MeetingIntelligenceWidget,

  // Dashboard
  AIActions,
  BlockedTasks,
  ProjectHealth,
  RiskScore,
  TeamInsights,

  // Projects/settings
  ProjectSwitcher,
  FollowupList,
  IntegrationCard,
  SettingsSidebar,
} as const;

export default Widgets;

