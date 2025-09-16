import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserPlus, Search, Filter, Phone, MapPin, Calendar, MoreVertical } from 'lucide-react';
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
import StatsCard from '@/components/dashboard/StatsCard';
import { format } from 'date-fns';

const mockCitizens = [
  {
    id: 'CIT001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    location: 'Ranchi City Center',
    joinDate: new Date('2023-06-15'),
    totalReports: 8,
    resolvedReports: 6,
    status: 'active',
    rating: 4.5,
    lastReport: new Date('2024-01-15'),
  },
  {
    id: 'CIT002',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211',
    location: 'Hinoo, Ranchi',
    joinDate: new Date('2023-08-22'),
    totalReports: 12,
    resolvedReports: 11,
    status: 'active',
    rating: 4.8,
    lastReport: new Date('2024-01-14'),
  },
  {
    id: 'CIT003',
    name: 'Amit Singh',
    email: 'amit.singh@email.com',
    phone: '+91 9876543212',
    location: 'Doranda, Ranchi',
    joinDate: new Date('2023-03-10'),
    totalReports: 15,
    resolvedReports: 14,
    status: 'verified',
    rating: 4.9,
    lastReport: new Date('2024-01-12'),
  },
  {
    id: 'CIT004',
    name: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    phone: '+91 9876543213',
    location: 'Kanke, Ranchi',
    joinDate: new Date('2023-11-05'),
    totalReports: 4,
    resolvedReports: 3,
    status: 'active',
    rating: 4.2,
    lastReport: new Date('2024-01-13'),
  },
];

const statusConfig = {
  active: { label: 'Active', className: 'bg-success/10 text-success' },
  verified: { label: 'Verified', className: 'bg-primary/10 text-primary' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground' },
};

const Citizens = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCitizens = mockCitizens.filter(citizen => {
    const matchesSearch = citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || citizen.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalCitizens = mockCitizens.length;
  const activeCitizens = mockCitizens.filter(c => c.status === 'active' || c.status === 'verified').length;
  const avgReports = mockCitizens.reduce((acc, c) => acc + c.totalReports, 0) / totalCitizens;
  const avgRating = mockCitizens.reduce((acc, c) => acc + c.rating, 0) / totalCitizens;

  const statsData = [
    {
      title: 'Total Citizens',
      value: totalCitizens,
      change: '+48 this month',
      changeType: 'positive' as const,
      icon: Users,
      color: 'primary' as const,
      delay: 0,
    },
    {
      title: 'Active Users',
      value: activeCitizens,
      change: `${Math.round((activeCitizens / totalCitizens) * 100)}% of total`,
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'success' as const,
      delay: 0.1,
    },
    {
      title: 'Avg Reports/User',
      value: avgReports.toFixed(1),
      change: '+2.3 from last month',
      changeType: 'positive' as const,
      icon: UserPlus,
      color: 'info' as const,
      delay: 0.2,
    },
    {
      title: 'Satisfaction',
      value: `${avgRating.toFixed(1)}/5`,
      change: 'High engagement',
      changeType: 'positive' as const,
      icon: Users,
      color: 'saffron' as const,
      delay: 0.3,
    },
  ];

  const getEngagementLevel = (reports: number) => {
    if (reports >= 10) return { level: 'High', className: 'bg-success/10 text-success' };
    if (reports >= 5) return { level: 'Medium', className: 'bg-warning/10 text-warning' };
    return { level: 'Low', className: 'bg-muted text-muted-foreground' };
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
          <h1 className="text-3xl font-bold text-foreground">Citizens Directory</h1>
          <p className="text-muted-foreground">
            Manage and engage with citizens across Jharkhand
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Citizen
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Engagement Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search citizens by name, email, location..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Citizens Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCitizens.map((citizen, index) => (
          <motion.div
            key={citizen.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {citizen.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{citizen.name}</h3>
                      <p className="text-sm text-muted-foreground">{citizen.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={statusConfig[citizen.status].className}>
                          {statusConfig[citizen.status].label}
                        </Badge>
                        <Badge className={getEngagementLevel(citizen.totalReports).className}>
                          {getEngagementLevel(citizen.totalReports).level} Activity
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Contact Citizen</DropdownMenuItem>
                      <DropdownMenuItem>View Reports</DropdownMenuItem>
                      <DropdownMenuItem>Send Notification</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{citizen.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{citizen.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="font-medium">{format(citizen.joinDate, 'MMM yyyy')}</span>
                  </div>
                </div>

                {/* Activity Summary */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-accent/30 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{citizen.totalReports}</p>
                    <p className="text-xs text-muted-foreground">Total Reports</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{citizen.resolvedReports}</p>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-saffron">{citizen.rating.toFixed(1)}★</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last report:</span>
                    <span className="font-medium">{format(citizen.lastReport, 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="mr-1 h-3 w-3" />
                    Contact
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Engagement Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Citizen Engagement Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <UserCheck className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Active Citizens</h3>
                <p className="text-2xl font-bold text-primary">{activeCitizens}</p>
                <p className="text-sm text-muted-foreground">Regular contributors</p>
              </div>
              
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <Users className="h-8 w-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Resolution Rate</h3>
                <p className="text-2xl font-bold text-success">
                  {Math.round((mockCitizens.reduce((acc, c) => acc + c.resolvedReports, 0) / 
                              mockCitizens.reduce((acc, c) => acc + c.totalReports, 0)) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Issues resolved</p>
              </div>
              
              <div className="text-center p-4 bg-saffron/5 rounded-lg">
                <UserPlus className="h-8 w-8 text-saffron mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Avg Satisfaction</h3>
                <p className="text-2xl font-bold text-saffron">{avgRating.toFixed(1)}/5</p>
                <p className="text-sm text-muted-foreground">Citizen rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="text-center text-muted-foreground"
      >
        Showing {filteredCitizens.length} of {totalCitizens} citizens
      </motion.div>
    </div>
  );
};

export default Citizens;