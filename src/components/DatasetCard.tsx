
import { Check, Database, Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DatasetCardProps {
  title: string;
  description: string;
  resolution: string;
  format: string;
  isSelected: boolean;
  onClick: () => void;
}

const DatasetCard = ({ 
  title, 
  description, 
  resolution, 
  format, 
  isSelected, 
  onClick 
}: DatasetCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border-emerald-500 ring-2 ring-emerald-500/30' 
          : 'bg-slate-800/50 border-slate-600 hover:border-slate-500 hover:bg-slate-800/70'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isSelected ? 'bg-emerald-600' : 'bg-slate-700'
            }`}>
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">{title}</CardTitle>
              <CardDescription className="text-slate-300 text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
          {isSelected && (
            <div className="p-1 bg-emerald-600 rounded-full">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-slate-300 border-slate-500">
            <Image className="h-3 w-3 mr-1" />
            {resolution}
          </Badge>
          <Badge variant="outline" className="text-slate-300 border-slate-500">
            {format}
          </Badge>
        </div>
        
        <div className="text-xs text-slate-400 space-y-1">
          {title === 'DVS Gesture' ? (
            <>
              <div>• Event-based gesture recognition</div>
              <div>• 128×128 pixel resolution</div>
              <div>• AEDAT 3.1 format with labels</div>
            </>
          ) : (
            <>
              <div>• Object classification dataset</div>
              <div>• 304×240 pixel resolution</div>
              <div>• Binary event format</div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetCard;
