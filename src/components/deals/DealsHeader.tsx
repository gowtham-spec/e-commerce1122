
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DealsHeaderProps {
  timeLeft: string;
}

const DealsHeader: React.FC<DealsHeaderProps> = ({ timeLeft }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold purple-gradient-text">Today's Deals</h1>
      </div>
      <div className="flex items-center mt-2">
        <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700 animate-pulse-purple">
          <Timer className="h-3 w-3" /> Ends in: {timeLeft}
        </Badge>
      </div>
    </div>
  );
};

export default DealsHeader;
