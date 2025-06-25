
import { useState, useEffect } from 'react';
import { Brain, Zap, Activity, Camera, BarChart3, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EventVisualization from '@/components/EventVisualization';
import SNNPrediction from '@/components/SNNPrediction';
import DatasetCard from '@/components/DatasetCard';
import PerformanceMetrics from '@/components/PerformanceMetrics';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDataset, setCurrentDataset] = useState('dvs-gesture');
  const [predictionData, setPredictionData] = useState(null);

  const handleProcessSample = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const mockPrediction = {
        class: currentDataset === 'dvs-gesture' ? 'Hand Wave' : 'Accordion',
        confidence: 0.87,
        latency: 45,
        accuracy: 0.92
      };
      setPredictionData(mockPrediction);
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Neural Network Background Animation */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/10 to-emerald-500/10"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Neuromorphic Vision MVP
                  </h1>
                  <p className="text-slate-300">
                    Spiking Neural Networks for Event-Based Object Recognition
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-300 border-emerald-600/30">
                  <Zap className="h-3 w-3 mr-1" />
                  T4 GPU Enabled
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-600/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Real-time Processing
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Dataset Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Camera className="h-6 w-6 mr-2" />
              Dataset Selection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <DatasetCard
                title="DVS Gesture"
                description="user10_fluorescent_led.aedat"
                resolution="128x128"
                format="AEDAT 3.1"
                isSelected={currentDataset === 'dvs-gesture'}
                onClick={() => setCurrentDataset('dvs-gesture')}
              />
              <DatasetCard
                title="N-Caltech101"
                description="accordion/image_0001.bin"
                resolution="304x240"
                format="Binary Events"
                isSelected={currentDataset === 'n-caltech101'}
                onClick={() => setCurrentDataset('n-caltech101')}
              />
            </div>
          </div>

          {/* Processing Controls */}
          <div className="mb-8">
            <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  SNN Processing Pipeline
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Load, preprocess, and classify event-based data using Spiking Neural Networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleProcessSample}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold px-6 py-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Sample...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Process Sample
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Visualization Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Event Visualization */}
            <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Event Visualization</CardTitle>
                <CardDescription className="text-slate-300">
                  Scatter plot of preprocessed events (x, y, polarity)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventVisualization dataset={currentDataset} isProcessing={isProcessing} />
              </CardContent>
            </Card>

            {/* SNN Prediction */}
            <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">SNN Prediction</CardTitle>
                <CardDescription className="text-slate-300">
                  Classification results from the trained Spiking Neural Network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SNNPrediction 
                  prediction={predictionData} 
                  isProcessing={isProcessing}
                  dataset={currentDataset}
                />
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Performance Metrics
            </h2>
            <PerformanceMetrics prediction={predictionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
