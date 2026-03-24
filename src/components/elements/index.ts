import AnimatedCard from './AnimatedCard';
import { AppDialog, AppDialogActions } from './AppDialog';
import { AppMenu, AppMenuItem } from './AppMenu';
import { AppSkeleton, AIActionsSkeleton, BlockedTasksSkeleton, CardSkeleton, FollowupListSkeleton, InsightSkeleton, MeetingIntelligenceSkeleton, MetricCardSkeleton, SidebarSkeleton, TableSkeleton, TasksPageSkeleton, TaskCardSkeleton, TeamInsightsSkeleton } from './AppSkeleton';
import { DashboardCard, MetricCard } from './Card';
import { Badge, PriorityBadge, StatusBadge } from './Badge';
import Button from './Button';
import Card from './Card';
import { Carousel } from './Carousel';
import { EmptyState } from './EmptyState';
import FeatureCard from './FeatureCard';
import GradientText from './GradientText';
import { Input, Textarea } from './Input';
import IntegrationLogo from './IntegrationLogo';
import PricingCard from './PricingCard';
import SectionContainer from './SectionContainer';
import TestimonialCard from './TestimonialCard';
import { Toggle } from './Toggle';
import ConsentBanner from './ConsentBanner';

const Elements = {
  // Generic UI primitives
  AnimatedCard,
  AppDialog,
  AppDialogActions,
  AppMenu,
  AppMenuItem,
  AppSkeleton,
  Card,
  DashboardCard,
  MetricCard,
  Badge,
  StatusBadge,
  PriorityBadge,
  Button,
  Carousel,
  EmptyState,
  FeatureCard,
  GradientText,
  Input,
  Textarea,
  IntegrationLogo,
  PricingCard,
  SectionContainer,
  TestimonialCard,
  Toggle,

  // Skeletons
  CardSkeleton,
  TableSkeleton,
  SidebarSkeleton,
  InsightSkeleton,
  MetricCardSkeleton,
  MeetingIntelligenceSkeleton,
  AIActionsSkeleton,
  BlockedTasksSkeleton,
  TeamInsightsSkeleton,
  FollowupListSkeleton,
  TaskCardSkeleton,
  TasksPageSkeleton,

  // Compliance/consent
  ConsentBanner,
} as const;

export default Elements;

