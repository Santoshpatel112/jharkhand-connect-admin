import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, User, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatsCard from '@/components/dashboard/StatsCard';

const pendingReports = [
  {
    id: 'RPT002',
    title: 'Street Light Not Working',
    description: 'Street lights have been out for 3 days in residential area',
    citizenName: 'Priya Sharma',
    location: 'Hinoo, Ranchi',
    date: new Date('2024-01-14'),
    priority: 'medium',
    category: 'Electricity',
    daysWaiting: 3,
  },
  {
    id: 'RPT007',
    title: 'Broken Drainage System',
    description: 'Water logging during monsoon due to broken drainage',
    citizenName: 'Mohammed Ali',
    location: 'Lalpur, Ranchi',
    date: new Date('2024-01-10'),
    priority: 'high',
    category: 'Infrastructure',
    daysWaiting: 7,
  },
  {
    id: 'RPT012',
    title: 'Damaged Bus Stop',
    description: 'Bus stop shelter damaged, causing inconvenience',
    citizenName: 'Rita Kumari',
    location: 'Circular Road, Ranchi',
    date: new Date('2024-01-11'),
    priority: 'low',
    category: 'Public Infrastructure',
    daysWaiting: 6,
  },
];

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const PendingIssues = () => {
  const avgWaitTime = pendingReports.reduce((acc, report) => acc + report.daysWaiting, 0) / pendingReports.length;
  const highPriorityCount = pendingReports.filter(r => r.priority === 'high').length;
  const totalPending = pendingReports.length;

  const statsData = [
    {
      title: 'Total Pending',
      value: totalPending,
      change: '+2 from yesterday',
      changeType: 'negative' as const,
      icon: Clock,
      color: 'warning' as const,
      delay: 0,
    },
    {
      title: 'High Priority',
      value: highPriorityCount,
      change: 'Needs urgent attention',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'info' as const,
      delay: 0.1,
    },
    {
      title: 'Avg Wait Time',
      value: `${avgWaitTime.toFixed(1)} days`,
      change: '+0.5 from last week',
      changeType: 'negative' as const,
      icon: Calendar,
      color: 'saffron' as const,
      delay: 0.2,
    },
    {
      title: 'Unassigned',
      value: totalPending,
      change: 'All pending issues',
      changeType: 'neutral' as const,
      icon: User,
      color: 'forest' as const,
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
          <h1 className="text-3xl font-bold text-foreground">Pending Issues</h1>
          <p className="text-muted-foreground">
            Issues awaiting assignment and resolution
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">Bulk Assign</Button>
          <Button>Priority Review</Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <h3 className="font-medium text-destructive">Action Required</h3>
                <p className="text-sm text-muted-foreground">
                  {highPriorityCount} high priority issues require immediate attention
                </p>
              </div>
              <Button size="sm" className="ml-auto">
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pending Reports List */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <span>Awaiting Assignment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {report.title}
                        </h4>
                        <Badge className={priorityConfig[report.priority].className}>
                          {priorityConfig[report.priority].label}
                        </Badge>
                        <Badge variant="outline" className="text-warning border-warning/20">
                          {report.daysWaiting} days waiting
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {report.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {report.citizenName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{report.citizenName}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{report.date.toLocaleDateString()}</span>
                        </div>
                        
                        <span className="text-xs px-2 py-1 bg-muted rounded">
                          {report.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm">
                        Assign Officer
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 flex-col space-y-2">
                <User className="h-5 w-5" />
                <span>Auto-Assign All</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Priority Sort</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Clock className="h-5 w-5" />
                <span>Escalate Overdue</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PendingIssues;