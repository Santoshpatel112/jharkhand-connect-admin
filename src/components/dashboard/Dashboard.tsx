import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
} from 'lucide-react';
import StatsCard from './StatsCard';
import RecentReports from './RecentReports';
import AnalyticsChart from './AnalyticsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { useReportStats } from '@/hooks/useCivicReports';

const Dashboard = () => {
  // Sync user data with Supabase
  useSupabaseSync();
  
  // Fetch real stats from Supabase
  const { data: stats, isLoading } = useReportStats();

  const statsData = [
    {
      title: 'Total Reports',
      value: stats?.total || 0,
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'primary' as const,
      delay: 0,
    },
    {
      title: 'Pending Issues',
      value: stats?.pending || 0,
      change: '-8% from last week',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'warning' as const,
      delay: 0.1,
    },
    {
      title: 'In Progress',
      value: stats?.in_progress || 0,
      change: '+25% from yesterday',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'success' as const,
      delay: 0.2,
    },
    {
      title: 'Resolved',
      value: stats?.resolved || 0,
      change: 'Great progress!',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      color: 'info' as const,
      delay: 0.3,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jharkhand-primary"></div>
      </div>
    );
  }

  const quickStats = [
    {
      label: 'Active Citizens',
      value: '1,204',
      icon: Users,
      color: 'text-primary',
    },
    {
      label: 'Response Rate',
      value: '94.2%',
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      label: 'Areas Covered',
      value: '28',
      icon: MapPin,
      color: 'text-saffron',
    },
    {
      label: 'Avg Resolution',
      value: '3.2 days',
      icon: Calendar,
      color: 'text-forest',
    },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Civic Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and manage civic issues across Jharkhand
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-card bg-gradient-to-r from-primary/5 to-saffron/5">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex p-3 rounded-full bg-white/50 mb-3 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reports - 2/3 width */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <RecentReports />
          </motion.div>

          {/* Analytics Chart - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AnalyticsChart />
          </motion.div>
        </div>

        {/* Additional Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Top Reporting Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { area: 'Ranchi City Center', count: 45, percentage: 85 },
                  { area: 'Doranda', count: 32, percentage: 65 },
                  { area: 'Kanke', count: 28, percentage: 55 },
                  { area: 'Hinoo', count: 24, percentage: 45 },
                ].map((item, index) => (
                  <div key={item.area} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{item.area}</span>
                      <span className="text-muted-foreground">{item.count} reports</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-primary to-saffron rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Issue Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Issue Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: 'Road Infrastructure', count: 156, color: 'bg-primary' },
                  { category: 'Water Supply', count: 98, color: 'bg-info' },
                  { category: 'Electricity', count: 87, color: 'bg-warning' },
                  { category: 'Waste Management', count: 76, color: 'bg-success' },
                  { category: 'Public Safety', count: 45, color: 'bg-destructive' },
                ].map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-foreground">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    metric: 'Resolution Rate', 
                    value: '87.5%', 
                    trend: '+2.3%',
                    positive: true 
                  },
                  { 
                    metric: 'Avg Response Time', 
                    value: '2.1 hrs', 
                    trend: '-15 min',
                    positive: true 
                  },
                  { 
                    metric: 'Citizen Satisfaction', 
                    value: '4.6/5', 
                    trend: '+0.2',
                    positive: true 
                  },
                  { 
                    metric: 'Backlog Issues', 
                    value: '42', 
                    trend: '-12',
                    positive: true 
                  },
                ].map((item) => (
                  <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.metric}</p>
                      <p className="text-lg font-bold text-primary">{item.value}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      item.positive ? 'text-success' : 'text-destructive'
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;