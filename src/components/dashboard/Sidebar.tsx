import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
    badge: null,
  },
  {
    title: 'All Reports',
    icon: FileText,
    path: '/reports',
    badge: '248',
  },
  {
    title: 'Pending Issues',
    icon: Clock,
    path: '/reports/pending',
    badge: '42',
    color: 'warning',
  },
  {
    title: 'In Progress',
    icon: AlertCircle,
    path: '/reports/progress',
    badge: '78',
    color: 'info',
  },
  {
    title: 'Resolved',
    icon: CheckCircle,
    path: '/reports/resolved',
    badge: '128',
    color: 'success',
  },
  {
    title: 'Citizens',
    icon: Users,
    path: '/citizens',
    badge: '1,204',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
    badge: null,
  },
  {
    title: 'Map View',
    icon: MapPin,
    path: '/map',
    badge: null,
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    badge: null,
  },
];

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem = '/' }: SidebarProps) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-64 bg-sidebar-bg border-r border-border shadow-elegant"
    >
      <div className="flex flex-col h-full">
        {/* Navigation Header */}
        <div className="p-6 border-b border-border">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold text-foreground"
          >
            Navigation
          </motion.h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.path;
            
            return (
              <motion.div key={item.path} variants={itemVariants}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start h-11 transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        item.color === 'warning' && 'bg-warning/10 text-warning',
                        item.color === 'success' && 'bg-success/10 text-success',
                        item.color === 'info' && 'bg-info/10 text-info',
                        !item.color && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 border-t border-border"
        >
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Government of Jharkhand
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Civic Dashboard v2.0
            </p>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;