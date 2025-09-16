import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const weeklyData = [
  { name: 'Mon', reports: 24, resolved: 18 },
  { name: 'Tue', reports: 32, resolved: 28 },
  { name: 'Wed', reports: 28, resolved: 22 },
  { name: 'Thu', reports: 45, resolved: 35 },
  { name: 'Fri', reports: 38, resolved: 42 },
  { name: 'Sat', reports: 22, resolved: 25 },
  { name: 'Sun', reports: 18, resolved: 15 },
];

const statusData = [
  { name: 'Resolved', value: 68, color: 'hsl(var(--success))' },
  { name: 'In Progress', value: 24, color: 'hsl(var(--warning))' },
  { name: 'Submitted', value: 8, color: 'hsl(var(--info))' },
];

const AnalyticsChart = () => {
  return (
    <Card className="border-0 shadow-card h-fit">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly Trend</TabsTrigger>
            <TabsTrigger value="status">Status Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="reportsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="reports"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#reportsGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="hsl(var(--success))"
                    fillOpacity={1}
                    fill="url(#resolvedGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Resolved</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="mt-4">
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
            <div className="space-y-2 mt-4">
              {statusData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;