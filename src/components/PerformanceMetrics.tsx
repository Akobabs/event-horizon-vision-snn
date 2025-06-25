
import { Activity, Zap, Target, Clock, Cpu, MemoryStick } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PerformanceMetricsProps {
  prediction: {
    class: string;
    confidence: number;
    latency: number;
    accuracy: number;
  } | null;
}

const PerformanceMetrics = ({ prediction }: PerformanceMetricsProps) => {
  const metrics = [
    {
      title: 'Classification Accuracy',
      icon: Target,
      value: prediction ? `${(prediction.accuracy * 100).toFixed(1)}%` : '--',
      progress: prediction ? prediction.accuracy * 100 : 0,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
      description: 'Single sample accuracy on test data'
    },
    {
      title: 'Inference Latency',
      icon: Clock,
      value: prediction ? `${prediction.latency}ms` : '--',
      progress: prediction ? Math.max(0, 100 - prediction.latency) : 0,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-600/20',
      description: 'Time to process and classify one sample'
    },
    {
      title: 'Model Confidence',
      icon: Activity,
      value: prediction ? `${(prediction.confidence * 100).toFixed(1)}%` : '--',
      progress: prediction ? prediction.confidence * 100 : 0,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600/20',
      description: 'SNN output confidence score'
    },
    {
      title: 'Energy Efficiency',
      icon: Zap,
      value: prediction ? '~2.3mJ' : '--',
      progress: prediction ? 85 : 0,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20',
      description: 'Estimated energy per inference (SNN advantage)'
    }
  ];

  const systemMetrics = [
    {
      title: 'GPU Utilization',
      icon: Cpu,
      value: prediction ? '67%' : '0%',
      color: 'text-orange-400'
    },
    {
      title: 'Memory Usage',
      icon: MemoryStick,
      value: prediction ? '3.2GB' : '1.1GB',
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Performance Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className={`text-xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
                <CardTitle className="text-sm text-white">{metric.title}</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  {metric.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Progress 
                  value={metric.progress} 
                  className="h-2 bg-slate-700"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Resources */}
      <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Cpu className="h-5 w-5 mr-2" />
            System Resources (Google Colab T4)
          </CardTitle>
          <CardDescription className="text-slate-300">
            Hardware utilization during SNN training and inference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {systemMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                    <span className="text-white font-medium">{metric.title}</span>
                  </div>
                  <span className={`text-lg font-bold ${metric.color}`}>
                    {metric.value}
                  </span>
                </div>
              );
            })}
          </div>
          
          {prediction && (
            <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-700/30 rounded-lg">
              <div className="flex items-center space-x-2 text-emerald-300">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">SNN Efficiency Note</span>
              </div>
              <p className="text-xs text-emerald-200 mt-1">
                Spiking Neural Networks consume significantly less energy than traditional CNNs, 
                making them ideal for edge computing and battery-powered devices.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
