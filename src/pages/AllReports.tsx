import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, MapPin, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

const mockReports = [
  {
    id: 'RPT001',
    title: 'Pothole on Main Road',
    description: 'Large pothole causing traffic issues near City Center. Multiple citizens have reported vehicle damage.',
    status: 'progress',
    citizenName: 'Rajesh Kumar',
    citizenPhone: '+91 9876543210',
    location: 'Ranchi City Center, Main Road',
    coordinates: '23.3441, 85.3096',
    date: new Date('2024-01-15'),
    priority: 'high',
    category: 'Road Infrastructure',
    assignedTo: 'PWD Team A',
  },
  {
    id: 'RPT002',
    title: 'Street Light Not Working',
    description: 'Street lights have been out for 3 days in residential area. Safety concern for pedestrians.',
    status: 'submitted',
    citizenName: 'Priya Sharma',
    citizenPhone: '+91 9876543211',
    location: 'Hinoo, Ranchi - Sector 2',
    coordinates: '23.3258, 85.3094',
    date: new Date('2024-01-14'),
    priority: 'medium',
    category: 'Electricity',
    assignedTo: 'Unassigned',
  },
  {
    id: 'RPT003',
    title: 'Water Supply Issue',
    description: 'No water supply for the past week in the locality. Affecting 50+ households.',
    status: 'resolved',
    citizenName: 'Amit Singh',
    citizenPhone: '+91 9876543212',
    location: 'Doranda, Ranchi - Ward 15',
    coordinates: '23.3703, 85.3312',
    date: new Date('2024-01-12'),
    priority: 'high',
    category: 'Water Supply',
    assignedTo: 'Water Board Team',
  },
  {
    id: 'RPT004',
    title: 'Garbage Collection Delay',
    description: 'Garbage has not been collected for 5 days. Creating hygiene issues.',
    status: 'progress',
    citizenName: 'Sunita Devi',
    citizenPhone: '+91 9876543213',
    location: 'Kanke, Ranchi - Block C',
    coordinates: '23.4241, 85.3381',
    date: new Date('2024-01-13'),
    priority: 'medium',
    category: 'Waste Management',
    assignedTo: 'Sanitation Dept',
  },
];

const statusConfig = {
  submitted: { label: 'Submitted', className: 'status-submitted' },
  progress: { label: 'In Progress', className: 'status-progress' },
  resolved: { label: 'Resolved', className: 'status-resolved' },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const AllReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive view of all civic issues reported by citizens
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search reports, citizens, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg text-foreground">
                          {report.title}
                        </h3>
                        <Badge className={statusConfig[report.status].className}>
                          {statusConfig[report.status].label}
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

                    {/* Details Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
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
                        <span>{format(report.date, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>

                    {/* Assignment */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Assigned to: </span>
                        <span className={`font-medium ${report.assignedTo === 'Unassigned' ? 'text-destructive' : 'text-success'}`}>
                          {report.assignedTo}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Category: {report.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Report</DropdownMenuItem>
                        <DropdownMenuItem>Assign Officer</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>View Location</DropdownMenuItem>
                        <DropdownMenuItem>Contact Citizen</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-muted-foreground"
      >
        Showing {filteredReports.length} of {mockReports.length} reports
      </motion.div>
    </div>
  );
};

export default AllReports;