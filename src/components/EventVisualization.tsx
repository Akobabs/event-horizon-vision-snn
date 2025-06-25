
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface EventVisualizationProps {
  dataset: string;
  isProcessing: boolean;
}

const EventVisualization = ({ dataset, isProcessing }: EventVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [events, setEvents] = useState<Array<{x: number, y: number, polarity: number}>>([]);

  // Generate mock event data based on dataset
  const generateMockEvents = (datasetType: string) => {
    const eventCount = 500;
    const events = [];
    
    for (let i = 0; i < eventCount; i++) {
      if (datasetType === 'dvs-gesture') {
        // Simulate hand gesture pattern
        const angle = (i / eventCount) * Math.PI * 4;
        const radius = 30 + Math.random() * 20;
        events.push({
          x: 64 + radius * Math.cos(angle) + (Math.random() - 0.5) * 10,
          y: 64 + radius * Math.sin(angle) + (Math.random() - 0.5) * 10,
          polarity: Math.random() > 0.6 ? 1 : 0
        });
      } else {
        // Simulate accordion pattern (vertical lines)
        const x = Math.random() * 304;
        const y = Math.random() * 240;
        const isVerticalLine = Math.random() > 0.7;
        
        events.push({
          x: isVerticalLine ? Math.floor(x / 20) * 20 + (Math.random() - 0.5) * 5 : x,
          y: isVerticalLine ? y : Math.floor(y / 15) * 15 + (Math.random() - 0.5) * 3,
          polarity: Math.random() > 0.5 ? 1 : 0
        });
      }
    }
    
    return events;
  };

  useEffect(() => {
    if (isProcessing) {
      // Simulate loading new events
      setTimeout(() => {
        setEvents(generateMockEvents(dataset));
      }, 1500);
    }
  }, [dataset, isProcessing]);

  useEffect(() => {
    if (!svgRef.current || events.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const maxX = dataset === 'dvs-gesture' ? 128 : 304;
    const maxY = dataset === 'dvs-gesture' ? 128 : 240;

    const xScale = d3.scaleLinear()
      .domain([0, maxX])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([height - margin.bottom, margin.top]);

    // Add background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#0f172a")
      .attr("rx", 8);

    // Add events
    svg.selectAll("circle")
      .data(events)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 1.5)
      .attr("fill", d => d.polarity ? "#10b981" : "#3b82f6")
      .attr("opacity", 0)
      .transition()
      .duration(2000)
      .delay((d, i) => i * 2)
      .attr("opacity", 0.8);

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 120}, 30)`);

    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 3)
      .attr("fill", "#10b981");

    legend.append("text")
      .attr("x", 10)
      .attr("y", 5)
      .attr("fill", "#e2e8f0")
      .attr("font-size", "12px")
      .text("Positive");

    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 20)
      .attr("r", 3)
      .attr("fill", "#3b82f6");

    legend.append("text")
      .attr("x", 10)
      .attr("y", 25)
      .attr("fill", "#e2e8f0")
      .attr("font-size", "12px")
      .text("Negative");

  }, [events, dataset]);

  return (
    <div className="w-full">
      {isProcessing && events.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-slate-900 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading event data...</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <svg
            ref={svgRef}
            width="100%"
            height="300"
            viewBox="0 0 400 300"
            className="border border-slate-600 rounded-lg"
          />
          {events.length > 0 && (
            <div className="absolute top-2 left-2 bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-300">
              {events.length} events | {dataset === 'dvs-gesture' ? '128×128' : '304×240'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventVisualization;
