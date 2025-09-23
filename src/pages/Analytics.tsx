import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity, Clock, CheckCircle, Users, AlertTriangle, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/dashboard/StatsCard';
import AnalyticsCharts from '@/components/analytics/AnalyticsCharts';
import { useReportStats } from '@/hooks/useCivicReports';

const Analytics = () => {
  const { data: stats, isLoading } = useReportStats();

  const totalReports = stats?.total || 0;
  const totalResolved = stats?.resolved || 0;
  const resolutionRate = totalReports > 0 ? (totalResolved / totalReports * 100) : 0;
  const avgResponseTime = 4.2; // This would come from your API

  const statsData = [
    {
      title: 'Total Reports',
      value: totalReports,
      change: '+18% from last period',
      changeType: 'positive' as const,
      icon: BarChart3,
      color: 'primary' as const,
      delay: 0,
    },
    {
      title: 'Resolution Rate',
      value: `${resolutionRate.toFixed(1)}%`,
      change: '+5.2% improvement',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'success' as const,
      delay: 0.1,
    },
    {
      title: 'Avg Response Time',
      value: `${avgResponseTime.toFixed(1)}h`,
      change: '-0.8h from last week',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'info' as const,
      delay: 0.2,
    },
    {
      title: 'Active Areas',
      value: 28,
      change: 'Across Jharkhand',
      changeType: 'neutral' as const,
      icon: Activity,
      color: 'saffron' as const,
      delay: 0.3,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into civic issue management across Jharkhand
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Data
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Badge variant="outline" className="text-success border-success/20">
            Live Data
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Analytics Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <AnalyticsCharts />
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Efficiency</h3>
                <p className="text-2xl font-bold text-primary">{resolutionRate.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">Resolution rate</p>
              </div>
              
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Quality</h3>
                <p className="text-2xl font-bold text-success">4.6/5</p>
                <p className="text-sm text-muted-foreground">Citizen rating</p>
              </div>
              
              <div className="text-center p-4 bg-info/5 rounded-lg">
                <Clock className="h-8 w-8 text-info mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Speed</h3>
                <p className="text-2xl font-bold text-info">{avgResponseTime}h</p>
                <p className="text-sm text-muted-foreground">Avg response</p>
              </div>
              
              <div className="text-center p-4 bg-warning/5 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Backlog</h3>
                <p className="text-2xl font-bold text-warning">{stats?.pending || 0}</p>
                <p className="text-sm text-muted-foreground">Pending issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;