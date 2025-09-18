import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, MapPin, Calendar, ArrowRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useCivicReports } from '@/hooks/useCivicReports';

const RecentReports = () => {
  const { data: reports = [], isLoading } = useCivicReports();

  const statusConfig = {
    pending: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800',
    },
    in_progress: {
      label: 'In Progress',
      className: 'bg-blue-100 text-blue-800',
    },
    resolved: {
      label: 'Resolved',
      className: 'bg-green-100 text-green-800',
    },
  };

  const priorityConfig = {
    low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
    medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
    high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-jharkhand-primary" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentReports = reports.slice(0, 5);
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Latest civic issues reported by citizens
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {report.title}
                  </h4>
                  <Badge className={statusConfig[report.status as keyof typeof statusConfig]?.className || statusConfig.pending.className}>
                    {statusConfig[report.status as keyof typeof statusConfig]?.label || 'Pending'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {report.user_id.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    User {report.user_id.substring(0, 8)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{report.address || 'Unknown location'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className={priorityConfig[report.priority as keyof typeof priorityConfig]?.className || priorityConfig.medium.className}>
                  {priorityConfig[report.priority as keyof typeof priorityConfig]?.label || 'Medium'}
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(report.created_at), 'MMM dd')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentReports;