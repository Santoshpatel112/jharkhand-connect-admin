import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  title: string;
  description: string;
  status: 'submitted' | 'progress' | 'resolved';
  citizenName: string;
  location: string;
  date: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const mockReports: Report[] = [
  {
    id: 'RPT001',
    title: 'Pothole on Main Road',
    description: 'Large pothole causing traffic issues near City Center',
    status: 'progress',
    citizenName: 'Rajesh Kumar',
    location: 'Ranchi City Center',
    date: new Date('2024-01-15'),
    priority: 'high',
    category: 'Road Infrastructure',
  },
  {
    id: 'RPT002', 
    title: 'Street Light Not Working',
    description: 'Street lights have been out for 3 days in residential area',
    status: 'submitted',
    citizenName: 'Priya Sharma',
    location: 'Hinoo, Ranchi',
    date: new Date('2024-01-14'),
    priority: 'medium',
    category: 'Electricity',
  },
  {
    id: 'RPT003',
    title: 'Water Supply Issue',
    description: 'No water supply for the past week in the locality',
    status: 'resolved',
    citizenName: 'Amit Singh',
    location: 'Doranda, Ranchi',
    date: new Date('2024-01-12'),
    priority: 'high',
    category: 'Water Supply',
  },
  {
    id: 'RPT004',
    title: 'Garbage Collection Delay',
    description: 'Garbage has not been collected for 5 days',
    status: 'progress',
    citizenName: 'Sunita Devi',
    location: 'Kanke, Ranchi',
    date: new Date('2024-01-13'),
    priority: 'medium',
    category: 'Waste Management',
  },
];

const statusConfig = {
  submitted: {
    label: 'Submitted',
    className: 'status-submitted',
  },
  progress: {
    label: 'In Progress',
    className: 'status-progress',
  },
  resolved: {
    label: 'Resolved',
    className: 'status-resolved',
  },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const RecentReports = () => {
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
        {mockReports.map((report, index) => (
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
                  <Badge className={statusConfig[report.status].className}>
                    {statusConfig[report.status].label}
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
                      {report.citizenName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {report.citizenName}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{report.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className={priorityConfig[report.priority].className}>
                  {priorityConfig[report.priority].label}
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(report.date, 'MMM dd')}</span>
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