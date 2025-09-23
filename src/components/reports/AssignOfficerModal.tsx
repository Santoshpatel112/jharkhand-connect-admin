import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Search, Phone, Mail, MapPin, Star, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AssignOfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  onAssign: (officerId: string, notes: string) => void;
}

const mockOfficers = [
  {
    id: 'OFF001',
    name: 'Rajesh Kumar Singh',
    department: 'PWD Team A',
    specialization: 'Road Infrastructure',
    phone: '+91 9123456789',
    email: 'rajesh.singh@jharkhand.gov.in',
    rating: 4.8,
    activeIssues: 3,
    completedIssues: 45,
    location: 'Ranchi Zone',
    availability: 'Available',
  },
  {
    id: 'OFF002',
    name: 'Priya Sharma',
    department: 'Water Board Team',
    specialization: 'Water Supply & Drainage',
    phone: '+91 9123456790',
    email: 'priya.sharma@jharkhand.gov.in',
    rating: 4.9,
    activeIssues: 2,
    completedIssues: 67,
    location: 'Ranchi Zone',
    availability: 'Available',
  },
  {
    id: 'OFF003',
    name: 'Amit Verma',
    department: 'Electricity Board',
    specialization: 'Power & Street Lighting',
    phone: '+91 9123456791',
    email: 'amit.verma@jharkhand.gov.in',
    rating: 4.6,
    activeIssues: 5,
    completedIssues: 32,
    location: 'Ranchi Zone',
    availability: 'Busy',
  },
];

const AssignOfficerModal: React.FC<AssignOfficerModalProps> = ({ 
  isOpen, 
  onClose, 
  reportId, 
  onAssign 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const filteredOfficers = mockOfficers.filter(officer =>
    officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedOfficer) {
      onAssign(selectedOfficer, notes);
      onClose();
      setSelectedOfficer(null);
      setNotes('');
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Assign Officer to Report #{reportId}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search officers by name, department, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Officers List */}
          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            {filteredOfficers.map((officer) => (
              <motion.div
                key={officer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedOfficer === officer.id 
                    ? 'ring-2 ring-primary' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedOfficer(officer.id)}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {officer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground">{officer.name}</h3>
                            <Badge 
                              className={
                                officer.availability === 'Available' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {officer.availability}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {officer.department} • {officer.specialization}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{officer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{officer.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{officer.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {getRatingStars(officer.rating)}
                          <span className="text-sm font-medium">{officer.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>{officer.completedIssues} completed</p>
                          <p>{officer.activeIssues} active</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Assignment Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Assignment Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any specific instructions or notes for the assigned officer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!selectedOfficer}
              className="bg-primary hover:bg-primary/90"
            >
              Assign Officer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignOfficerModal;