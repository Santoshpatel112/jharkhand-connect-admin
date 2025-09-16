import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Layers, Filter, Search, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock map data - in a real app, this would integrate with MapBox or Google Maps
const mockLocations = [
  {
    id: 'RPT001',
    title: 'Pothole on Main Road',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    status: 'progress',
    priority: 'high',
    category: 'Road Infrastructure',
    address: 'Ranchi City Center, Main Road',
    reportDate: '2024-01-15',
  },
  {
    id: 'RPT002',
    title: 'Street Light Not Working',
    coordinates: { lat: 23.3258, lng: 85.3094 },
    status: 'submitted',
    priority: 'medium',
    category: 'Electricity',
    address: 'Hinoo, Ranchi - Sector 2',
    reportDate: '2024-01-14',
  },
  {
    id: 'RPT003',
    title: 'Water Supply Issue',
    coordinates: { lat: 23.3703, lng: 85.3312 },
    status: 'resolved',
    priority: 'high',
    category: 'Water Supply',
    address: 'Doranda, Ranchi - Ward 15',
    reportDate: '2024-01-12',
  },
  {
    id: 'RPT004',
    title: 'Garbage Collection Delay',
    coordinates: { lat: 23.4241, lng: 85.3381 },
    status: 'progress',
    priority: 'medium',
    category: 'Waste Management',
    address: 'Kanke, Ranchi - Block C',
    reportDate: '2024-01-13',
  },
];

const statusConfig = {
  submitted: { label: 'Submitted', className: 'bg-info/10 text-info border border-info/20', color: '#3B82F6' },
  progress: { label: 'In Progress', className: 'bg-warning/10 text-warning border border-warning/20', color: '#F59E0B' },
  resolved: { label: 'Resolved', className: 'bg-success/10 text-success border border-success/20', color: '#10B981' },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
};

const MapView = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Geographic Map View</h1>
          <p className="text-muted-foreground">
            Visual representation of civic issues across Jharkhand
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Navigation className="mr-2 h-4 w-4" />
            Directions
          </Button>
          <Button>
            <Layers className="mr-2 h-4 w-4" />
            Layer Options
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Filters */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <span>Map Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Search Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search area..." className="pl-10" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="road">Road Infrastructure</SelectItem>
                    <SelectItem value="water">Water Supply</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Map Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-info"></div>
                <span className="text-sm text-foreground">Submitted</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-warning"></div>
                <span className="text-sm text-foreground">In Progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-success"></div>
                <span className="text-sm text-foreground">Resolved</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Area Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-foreground">High Priority</span>
                </div>
                <Badge className="bg-destructive/10 text-destructive">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-sm text-foreground">In Progress</span>
                </div>
                <Badge className="bg-warning/10 text-warning">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm text-foreground">Resolved</span>
                </div>
                <Badge className="bg-success/10 text-success">1</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card className="border-0 shadow-card h-[800px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Ranchi - Civic Issues Map</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">4 Active Issues</Badge>
                  <Button size="sm" variant="outline">
                    Full Screen
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 h-full">
              {/* Placeholder for Interactive Map */}
              <div className="relative w-full h-full bg-gradient-to-br from-primary/5 via-background to-saffron/5 rounded-lg border border-border overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Issue Markers */}
                {mockLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${20 + index * 15}%`,
                    }}
                  >
                    <div 
                      className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform group-hover:scale-125 transition-transform`}
                      style={{ backgroundColor: statusConfig[location.status].color }}
                    >
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div className="bg-card border border-border rounded-lg shadow-lg p-3 min-w-64">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {location.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {location.address}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge className={statusConfig[location.status].className}>
                            {statusConfig[location.status].label}
                          </Badge>
                          <Badge className={priorityConfig[location.priority].className}>
                            {priorityConfig[location.priority].label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                    +
                  </Button>
                  <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                    -
                  </Button>
                  <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-lg border border-border">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Interactive Map View
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      This would integrate with MapBox or Google Maps to show real-time locations of civic issues across Jharkhand.
                    </p>
                    <Button>
                      Integrate Map Service
                    </Button>
                  </div>
                </div>

                {/* Scale */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-card/90 backdrop-blur-sm rounded px-3 py-1 border border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1 bg-primary"></div>
                      <span className="text-xs text-muted-foreground">2 km</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Location Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Issue List</TabsTrigger>
            <TabsTrigger value="clusters">Area Clusters</TabsTrigger>
            <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Issues on Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLocations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: statusConfig[location.status].color }}
                        />
                        <div>
                          <h4 className="font-medium text-foreground">{location.title}</h4>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={statusConfig[location.status].className}>
                          {statusConfig[location.status].label}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <MapPin className="mr-1 h-3 w-3" />
                          Locate
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clusters">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Area Clustering</h3>
                  <p className="text-muted-foreground">
                    Cluster analysis of issue hotspots would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Heat Map View</h3>
                  <p className="text-muted-foreground">
                    Intensity heat map showing issue density across regions
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MapView;