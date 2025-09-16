import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, Clock, CheckCircle, Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/dashboard/StatsCard';

// Mock data for analytics
const monthlyData = [
  { month: 'Jan', submitted: 45, resolved: 42, pending: 8 },
  { month: 'Feb', submitted: 52, resolved: 48, pending: 12 },
  { month: 'Mar', submitted: 61, resolved: 55, pending: 18 },
  { month: 'Apr', submitted: 48, resolved: 51, pending: 15 },
  { month: 'May', submitted: 67, resolved: 58, pending: 24 },
  { month: 'Jun', submitted: 73, resolved: 69, pending: 28 },
];

const categoryData = [
  { name: 'Road Infrastructure', value: 156, color: 'hsl(var(--primary))' },
  { name: 'Water Supply', value: 98, color: 'hsl(var(--info))' },
  { name: 'Electricity', value: 87, color: 'hsl(var(--warning))' },
  { name: 'Waste Management', value: 76, color: 'hsl(var(--success))' },
  { name: 'Public Safety', value: 45, color: 'hsl(var(--destructive))' },
  { name: 'Parks & Recreation', value: 32, color: 'hsl(var(--saffron))' },
];

const responseTimeData = [
  { day: 'Mon', avgHours: 4.2 },
  { day: 'Tue', avgHours: 3.8 },
  { day: 'Wed', avgHours: 5.1 },
  { day: 'Thu', avgHours: 2.9 },
  { day: 'Fri', avgHours: 3.5 },
  { day: 'Sat', avgHours: 6.2 },
  { day: 'Sun', avgHours: 7.8 },
];

const locationData = [
  { area: 'Ranchi City Center', reports: 45, resolved: 38 },
  { area: 'Doranda', reports: 32, resolved: 28 },
  { area: 'Kanke', reports: 28, resolved: 24 },
  { area: 'Hinoo', reports: 24, resolved: 22 },
  { area: 'Lalpur', reports: 19, resolved: 15 },
];

const Analytics = () => {
  const totalReports = monthlyData.reduce((acc, month) => acc + month.submitted, 0);
  const totalResolved = monthlyData.reduce((acc, month) => acc + month.resolved, 0);
  const resolutionRate = (totalResolved / totalReports * 100);
  const avgResponseTime = responseTimeData.reduce((acc, day) => acc + day.avgHours, 0) / responseTimeData.length;

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
      value: locationData.length,
      change: 'Across Jharkhand',
      changeType: 'neutral' as const,
      icon: Activity,
      color: 'saffron' as const,
      delay: 0.3,
    },
  ];

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
          <Badge variant="outline" className="text-success border-success/20">
            Live Data
          </Badge>
          <Badge variant="outline">
            Last Updated: 2 min ago
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Monthly Report Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="submittedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="submitted"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#submittedGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="resolved"
                          stroke="hsl(var(--success))"
                          fillOpacity={1}
                          fill="url(#resolvedGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">Submitted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-sm text-muted-foreground">Resolved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-info" />
                    <span>Weekly Response Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="day" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="avgHours"
                          stroke="hsl(var(--info))"
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--info))', strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: 'hsl(var(--info))', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Average response time: <span className="font-semibold text-info">{avgResponseTime.toFixed(1)} hours</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChartIcon className="h-5 w-5 text-saffron" />
                    <span>Issue Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {categoryData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Category Performance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Category Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          width={120}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="hsl(var(--primary))"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Efficiency</h3>
                    <p className="text-2xl font-bold text-primary">87.5%</p>
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
                    <p className="text-2xl font-bold text-info">2.1h</p>
                    <p className="text-sm text-muted-foreground">Avg response</p>
                  </div>
                  
                  <div className="text-center p-4 bg-warning/5 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Backlog</h3>
                    <p className="text-2xl font-bold text-warning">42</p>
                    <p className="text-sm text-muted-foreground">Pending issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          {/* Geographic Analysis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Reports by Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locationData.map((item, index) => (
                    <div key={item.area} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-medium">{item.area}</span>
                        <span className="text-muted-foreground">
                          {item.resolved}/{item.reports} resolved ({Math.round(item.resolved/item.reports * 100)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.reports / Math.max(...locationData.map(l => l.reports))) * 100}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-saffron rounded-full relative"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.resolved / item.reports) * 100}%` }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                            className="h-full bg-success rounded-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;