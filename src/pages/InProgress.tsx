import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, TrendingUp, CheckCircle, User, MapPin, Calendar, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import StatsCard from '@/components/dashboard/StatsCard';

const inProgressReports = [
  {
    id: 'RPT001',
    title: 'Pothole on Main Road',
    description: 'Large pothole causing traffic issues near City Center',
    citizenName: 'Rajesh Kumar',
    location: 'Ranchi City Center',
    assignedTo: 'PWD Team A',
    assigneePhone: '+91 9123456789',
    startDate: new Date('2024-01-15'),
    estimatedCompletion: new Date('2024-01-20'),
    priority: 'high',
    category: 'Road Infrastructure',
    progress: 65,
    status: 'Materials procured, work in progress',
  },
  {
    id: 'RPT004',
    title: 'Garbage Collection Delay',
    description: 'Garbage has not been collected for 5 days',
    citizenName: 'Sunita Devi',
    location: 'Kanke, Ranchi',
    assignedTo: 'Sanitation Dept',
    assigneePhone: '+91 9123456790',
    startDate: new Date('2024-01-13'),
    estimatedCompletion: new Date('2024-01-18'),
    priority: 'medium',
    category: 'Waste Management',
    progress: 30,
    status: 'Route optimization in progress',
  },
  {
    id: 'RPT008',
    title: 'Water Pipe Leakage',
    description: 'Major water pipe leakage causing road flooding',
    citizenName: 'Vikash Sharma',
    location: 'Harmu, Ranchi',
    assignedTo: 'Water Board Team',
    assigneePhone: '+91 9123456791',
    startDate: new Date('2024-01-14'),
    estimatedCompletion: new Date('2024-01-19'),
    priority: 'high',
    category: 'Water Supply',
    progress: 85,
    status: 'Repair work almost complete',
  },
];

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const InProgress = () => {
  const totalInProgress = inProgressReports.length;
  const avgProgress = inProgressReports.reduce((acc, report) => acc + report.progress, 0) / totalInProgress;
  const nearCompletion = inProgressReports.filter(r => r.progress >= 80).length;
  const activeTeams = [...new Set(inProgressReports.map(r => r.assignedTo))].length;

  const statsData = [
    {
      title: 'In Progress',
      value: totalInProgress,
      change: '+3 from last week',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'info' as const,
      delay: 0,
    },
    {
      title: 'Avg Progress',
      value: `${Math.round(avgProgress)}%`,
      change: '+12% this week',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'success' as const,
      delay: 0.1,
    },
    {
      title: 'Near Completion',
      value: nearCompletion,
      change: 'Ready for review',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'saffron' as const,
      delay: 0.2,
    },
    {
      title: 'Active Teams',
      value: activeTeams,
      change: 'Working on issues',
      changeType: 'neutral' as const,
      icon: Users,
      color: 'forest' as const,
      delay: 0.3,
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-info';
  };

  const getDaysRemaining = (estimatedDate: Date) => {
    const today = new Date();
    const diff = estimatedDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issues In Progress</h1>
          <p className="text-muted-foreground">
            Track active work on civic issues across Jharkhand
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Team Performance
          </Button>
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark Complete
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-card bg-gradient-to-r from-success/5 to-info/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Overall Progress</h3>
              <Badge className="bg-success/10 text-success">
                {Math.round(avgProgress)}% Complete
              </Badge>
            </div>
            <Progress value={avgProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Average completion across all active issues</span>
              <span>{nearCompletion} issues near completion</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Issues */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-info" />
                <span>Active Work in Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {inProgressReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-6 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 hover-lift"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-lg text-foreground">
                            {report.title}
                          </h4>
                          <Badge className={priorityConfig[report.priority].className}>
                            {priorityConfig[report.priority].label}
                          </Badge>
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">
                          {report.id}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{report.progress}%</span>
                        </div>
                        <Progress 
                          value={report.progress} 
                          className={`h-2 ${getProgressColor(report.progress)}`}
                        />
                        <p className="text-sm text-muted-foreground">{report.status}</p>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Citizen:</span>
                            <span className="font-medium">{report.citizenName}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Location:</span>
                            <span className="font-medium">{report.location}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Assigned to:</span>
                            <span className="font-medium text-primary">{report.assignedTo}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Contact:</span>
                            <span className="font-medium">{report.assigneePhone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Started</p>
                          <p className="font-medium text-sm">{report.startDate.toLocaleDateString()}</p>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-1 bg-muted rounded">
                            <div 
                              className="h-1 bg-primary rounded transition-all duration-500" 
                              style={{ width: `${report.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Due</p>
                          <p className="font-medium text-sm">{report.estimatedCompletion.toLocaleDateString()}</p>
                          <p className="text-xs text-warning">
                            {getDaysRemaining(report.estimatedCompletion)} days left
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 lg:w-32">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Update Status
                      </Button>
                      {report.progress >= 80 && (
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InProgress;