
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface TrackOrderCardProps {
  itemVariants: any;
}

const TrackOrderCard: React.FC<TrackOrderCardProps> = ({ itemVariants }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-purple-gradient text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Track your order</h3>
              <p className="text-sm text-white/80">
                Get updates about your order status
              </p>
            </div>
            <Button variant="secondary" size="sm" className="text-purple-600">
              Track Order <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrackOrderCard;
