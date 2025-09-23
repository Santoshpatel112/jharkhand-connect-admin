import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, MapPin, Calendar, MoreVertical, User, Phone } from 'lucide-react';
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
import ReportDetailsModal from '@/components/reports/ReportDetailsModal';
import AssignOfficerModal from '@/components/reports/AssignOfficerModal';
import DataTable from '@/components/common/DataTable';
import { format } from 'date-fns';
import { useCivicReports } from '@/hooks/useCivicReports';

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', className: 'status-resolved' },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const AllReports = () => {
  const { data: reports = [], isLoading } = useCivicReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.address || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  const handleAssignOfficer = (report) => {
    setSelectedReport(report);
    setShowAssignModal(true);
  };

  const handleAssignment = (officerId: string, notes: string) => {
    console.log('Assigning officer:', officerId, 'to report:', selectedReport?.id, 'with notes:', notes);
    // Here you would typically make an API call to assign the officer
  };

  const columns = [
    {
      key: 'id',
      label: 'Report ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-muted-foreground line-clamp-1">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge className={statusConfig[value]?.className}>
          {statusConfig[value]?.label || 'Unknown'}
        </Badge>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value) => (
        <Badge className={priorityConfig[value]?.className}>
          {priorityConfig[value]?.label || 'Medium'}
        </Badge>
      ),
    },
    {
      key: 'user_id',
      label: 'Citizen',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {value.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{value.substring(0, 8)}...</span>
        </div>
      ),
    },
    {
      key: 'address',
      label: 'Location',
      render: (value) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{value || 'Not specified'}</span>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{format(new Date(value), 'MMM dd, yyyy')}</span>
        </div>
      ),
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
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

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          title="All Civic Reports"
          data={filteredReports}
          columns={columns}
          onRowClick={handleViewDetails}
          actions={(row) => (
            <>
              <DropdownMenuItem onClick={() => handleViewDetails(row)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAssignOfficer(row)}>
                <User className="mr-2 h-4 w-4" />
                Assign Officer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Contact Citizen
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MapPin className="mr-2 h-4 w-4" />
                View Location
              </DropdownMenuItem>
            </>
          )}
        />
      </motion.div>

      {/* Modals */}
      <ReportDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        report={selectedReport}
      />
      
      <AssignOfficerModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        reportId={selectedReport?.id || ''}
        onAssign={handleAssignment}
      />
    </div>
  );
};

export default AllReports;