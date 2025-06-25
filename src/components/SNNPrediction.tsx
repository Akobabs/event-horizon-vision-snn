
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SNNPredictionProps {
  prediction: {
    class: string;
    confidence: number;
    latency: number;
    accuracy: number;
  } | null;
  isProcessing: boolean;
  dataset: string;
}

const SNNPrediction = ({ prediction, isProcessing, dataset }: SNNPredictionProps) => {
  if (isProcessing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32 bg-slate-900 rounded-lg">
          <div className="text-center">
            <div className="animate-pulse">
              <Brain className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
            </div>
            <p className="text-slate-300">Processing with SNN...</p>
            <div className="mt-2 text-xs text-slate-400">
              Training lightweight SNN (5 epochs)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center h-32 bg-slate-900 rounded-lg border-2 border-dashed border-slate-600">
          <div className="text-center">
            <Brain className="h-8 w-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No prediction yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Click "Process Sample" to start SNN inference
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getClassColor = (className: string) => {
    if (className.toLowerCase().includes('wave') || className.toLowerCase().includes('hand')) {
      return 'text-blue-400';
    }
    return 'text-emerald-400';
  };

  return (
    <div className="space-y-4">
      {/* Main Prediction */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Brain className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white">Classification Result</h3>
          </div>
          
          <div className="mb-4">
            <div className={`text-3xl font-bold mb-2 ${getClassColor(prediction.class)}`}>
              {prediction.class}
            </div>
            <div className="text-slate-300 text-sm">
              Dataset: {dataset === 'dvs-gesture' ? 'DVS Gesture' : 'N-Caltech101'}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-slate-300 mb-1">
                <span>Confidence</span>
                <span>{(prediction.confidence * 100).toFixed(1)}%</span>
              </div>
              <Progress 
                value={prediction.confidence * 100} 
                className="h-2 bg-slate-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-slate-800/50 border-slate-600">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">
              {(prediction.accuracy * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-400">Accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">
              {prediction.latency}ms
            </div>
            <div className="text-xs text-slate-400">Latency</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">
              {(prediction.confidence * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-slate-400">Confidence</div>
          </CardContent>
        </Card>
      </div>

      {/* SNN Architecture Info */}
      <Card className="bg-slate-800/30 border-slate-600">
        <CardContent className="p-4">
          <div className="text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Architecture:</span>
              <span className="text-slate-300">2 Conv + LIF + FC</span>
            </div>
            <div className="flex justify-between">
              <span>Channels:</span>
              <span className="text-slate-300">8, 16 → 10 classes</span>
            </div>
            <div className="flex justify-between">
              <span>Optimizer:</span>
              <span className="text-slate-300">Adam (lr=1e-3)</span>
            </div>
            <div className="flex justify-between">
              <span>Framework:</span>
              <span className="text-slate-300">Norse + PyTorch</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SNNPrediction;
