import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, User, Phone, Mail, Clock, AlertTriangle, CheckCircle, MessageSquare, Camera, Mic } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800', icon: AlertTriangle },
  resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800', icon: CheckCircle },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', className: 'bg-orange-100 text-orange-800' },
  high: { label: 'High', className: 'bg-red-100 text-red-800' },
};

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  const StatusIcon = statusConfig[report.status]?.icon || Clock;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold">{report.title}</span>
              <Badge className={statusConfig[report.status]?.className}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig[report.status]?.label}
              </Badge>
              <Badge className={priorityConfig[report.priority]?.className}>
                {priorityConfig[report.priority]?.label}
              </Badge>
            </div>
            <span className="text-sm font-mono text-muted-foreground">{report.id}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Citizen Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Citizen Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {report.citizenName?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{report.citizenName || 'Unknown'}</h3>
                      <p className="text-sm text-muted-foreground">Citizen ID: {report.user_id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{report.citizenPhone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{report.citizenEmail || 'Not provided'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Location Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{report.location || report.address}</p>
                    {report.coordinates && (
                      <p className="text-sm text-muted-foreground">
                        Coordinates: {report.coordinates}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Issue Description */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {report.description}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <Badge variant="outline">{report.category}</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Reported on {format(new Date(report.date || report.created_at), 'PPP')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Information */}
            {report.assignedTo && (
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{report.assignedTo}</p>
                      <p className="text-sm text-muted-foreground">Assigned Officer/Team</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Contact Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Issue Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Issue Reported</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(report.date || report.created_at), 'PPP p')}
                      </p>
                    </div>
                  </div>
                  
                  {report.status !== 'pending' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Status Updated to In Progress</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(report.startDate || report.created_at), 'PPP p')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {report.status === 'resolved' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Issue Resolved</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(report.resolvedDate || report.resolved_at), 'PPP p')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attached Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {report.image_url && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span className="text-sm font-medium">Photo Evidence</span>
                      </div>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  
                  {report.audio_url && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mic className="h-4 w-4" />
                        <span className="text-sm font-medium">Audio Recording</span>
                      </div>
                      <div className="p-4 bg-muted rounded-lg flex items-center justify-center">
                        <Mic className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  
                  {!report.image_url && !report.audio_url && (
                    <div className="col-span-2 text-center py-8 text-muted-foreground">
                      No media files attached to this report
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Assign Officer
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Citizen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {report.status === 'pending' && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Mark as In Progress
                    </Button>
                  )}
                  {report.status === 'in_progress' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Mark as Resolved
                    </Button>
                  )}
                  <Button variant="destructive" className="w-full">
                    Escalate Issue
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request More Info
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;