import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: 'primary' | 'saffron' | 'forest' | 'success' | 'warning' | 'info';
  delay?: number;
}

const StatsCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color = 'primary',
  delay = 0,
}: StatsCardProps) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    saffron: 'text-saffron bg-saffron/10',
    forest: 'text-forest bg-forest/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-info bg-info/10',
  };

  const changeColorClasses = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden border-0 shadow-card hover:shadow-elegant transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
                className="text-3xl font-bold text-foreground"
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
                className={cn('text-sm font-medium', changeColorClasses[changeType])}
              >
                {changeType === 'positive' && '↗'} 
                {changeType === 'negative' && '↘'} 
                {change}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.1, type: 'spring', stiffness: 200 }}
              className={cn(
                'p-3 rounded-xl',
                colorClasses[color]
              )}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          </div>
          
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className={cn(
              'w-full h-full rounded-full',
              color === 'primary' && 'bg-primary',
              color === 'saffron' && 'bg-saffron',
              color === 'forest' && 'bg-forest',
              color === 'success' && 'bg-success',
              color === 'warning' && 'bg-warning',
              color === 'info' && 'bg-info'
            )} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;