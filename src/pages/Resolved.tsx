import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, TrendingUp, Clock, Star, User, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatsCard from '@/components/dashboard/StatsCard';
import { format } from 'date-fns';

const resolvedReports = [
  {
    id: 'RPT003',
    title: 'Water Supply Issue',
    description: 'No water supply for the past week in the locality',
    citizenName: 'Amit Singh',
    location: 'Doranda, Ranchi',
    resolvedBy: 'Water Board Team',
    resolvedDate: new Date('2024-01-16'),
    submittedDate: new Date('2024-01-12'),
    priority: 'high',
    category: 'Water Supply',
    rating: 5,
    feedback: 'Excellent work! Water supply restored quickly and efficiently.',
    resolutionTime: 4, // days
  },
  {
    id: 'RPT005',
    title: 'Traffic Signal Malfunction',
    description: 'Traffic lights not working at major intersection',
    citizenName: 'Dr. Meera Gupta',
    location: 'Main Road Junction, Ranchi',
    resolvedBy: 'Traffic Management Team',
    resolvedDate: new Date('2024-01-15'),
    submittedDate: new Date('2024-01-13'),
    priority: 'high',
    category: 'Traffic Management',
    rating: 4,
    feedback: 'Quick response, but took a bit longer than expected.',
    resolutionTime: 2,
  },
  {
    id: 'RPT006',
    title: 'Park Maintenance Required',
    description: 'Broken benches and overgrown vegetation in community park',
    citizenName: 'Ravi Prasad',
    location: 'Gandhi Park, Ranchi',
    resolvedBy: 'Parks & Gardens Dept',
    resolvedDate: new Date('2024-01-14'),
    submittedDate: new Date('2024-01-09'),
    priority: 'medium',
    category: 'Parks & Recreation',
    rating: 5,
    feedback: 'Park looks beautiful now. Thank you for the great work!',
    resolutionTime: 5,
  },
];

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const Resolved = () => {
  const totalResolved = resolvedReports.length;
  const avgRating = resolvedReports.reduce((acc, report) => acc + report.rating, 0) / totalResolved;
  const avgResolutionTime = resolvedReports.reduce((acc, report) => acc + report.resolutionTime, 0) / totalResolved;
  const excellentRatings = resolvedReports.filter(r => r.rating >= 4).length;

  const statsData = [
    {
      title: 'Total Resolved',
      value: totalResolved,
      change: '+15 this week',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'success' as const,
      delay: 0,
    },
    {
      title: 'Avg Rating',
      value: avgRating.toFixed(1),
      change: '+0.3 from last month',
      changeType: 'positive' as const,
      icon: Star,
      color: 'saffron' as const,
      delay: 0.1,
    },
    {
      title: 'Avg Resolution',
      value: `${avgResolutionTime.toFixed(1)} days`,
      change: '-1.2 days improvement',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'info' as const,
      delay: 0.2,
    },
    {
      title: 'Satisfaction Rate',
      value: `${Math.round((excellentRatings / totalResolved) * 100)}%`,
      change: 'Excellent ratings',
      changeType: 'positive' as const,
      icon: Award,
      color: 'forest' as const,
      delay: 0.3,
    },
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-saffron fill-saffron' 
            : 'text-muted-foreground'
        }`}
      />
    ));
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
          <h1 className="text-3xl font-bold text-foreground">Resolved Issues</h1>
          <p className="text-muted-foreground">
            Successfully completed civic issues with citizen feedback
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" />
            Performance Report
          </Button>
          <Button>
            <Award className="mr-2 h-4 w-4" />
            Recognition Program
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Success Metrics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-card bg-gradient-to-r from-success/5 to-saffron/5">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-success">{totalResolved}</h3>
                <p className="text-sm text-muted-foreground">Issues Resolved</p>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  {getRatingStars(Math.round(avgRating)).slice(0, Math.round(avgRating))}
                </div>
                <h3 className="text-2xl font-bold text-saffron">{avgRating.toFixed(1)}/5</h3>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8 text-info" />
                </div>
                <h3 className="text-2xl font-bold text-info">{avgResolutionTime.toFixed(1)}</h3>
                <p className="text-sm text-muted-foreground">Days to Resolve</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resolved Issues List */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Recently Resolved Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {resolvedReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-6 border border-success/20 rounded-lg bg-success/5 hover:bg-success/10 transition-all duration-200 hover-lift"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      {/* Header with Status Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-lg text-foreground">
                            {report.title}
                          </h4>
                          <Badge className="bg-success/10 text-success border border-success/20">
                            Resolved
                          </Badge>
                          <Badge className={priorityConfig[report.priority].className}>
                            {priorityConfig[report.priority].label}
                          </Badge>
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">
                          {report.id}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {report.description}
                      </p>

                      {/* Resolution Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/50 rounded-lg">
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
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-muted-foreground">Resolved by:</span>
                            <span className="font-medium text-success">{report.resolvedBy}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Completed:</span>
                            <span className="font-medium">{format(report.resolvedDate, 'MMM dd, yyyy')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Submitted</p>
                          <p className="font-medium text-sm">{format(report.submittedDate, 'MMM dd')}</p>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-1 bg-success rounded">
                            <div className="h-1 bg-success rounded w-full" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Resolved</p>
                          <p className="font-medium text-sm">{format(report.resolvedDate, 'MMM dd')}</p>
                          <p className="text-xs text-success font-medium">
                            {report.resolutionTime} days
                          </p>
                        </div>
                      </div>

                      {/* Citizen Feedback */}
                      <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Citizen Feedback</span>
                          <div className="flex items-center space-x-1">
                            {getRatingStars(report.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "{report.feedback}"
                        </p>
                      </div>
                    </div>

                    {/* Success Badge */}
                    <div className="flex flex-col items-center space-y-2 lg:w-24">
                      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <Badge className="bg-success/10 text-success">
                        {report.rating}.0★
                      </Badge>
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

export default Resolved;