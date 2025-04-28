
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface PerformanceData {
  n: number;
  empiricalRT: number;
  predictedRT: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  complexity: string;
  isLoading?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  complexity, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Runtime Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center animate-pulse-gentle">
            <p className="text-lg font-medium">Running analysis...</p>
            <p className="text-sm text-muted-foreground">This may take a moment</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Runtime Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm text-muted-foreground">Run the algorithm to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Runtime Analysis</span>
          <span className="text-sm font-normal px-2 py-1 bg-secondary rounded-md">
            Estimated Complexity: {complexity}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="n" 
              label={{ value: 'Input Size (n)', position: 'insideBottomRight', offset: -10 }} 
              tick={{ fill: '#aaa' }} 
            />
            <YAxis 
              label={{ value: 'Runtime (ms)', angle: -90, position: 'insideLeft' }} 
              tick={{ fill: '#aaa' }} 
            />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#444' }} />
            <Legend />
            <Line type="monotone" dataKey="empiricalRT" name="Empirical Runtime" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="predictedRT" name="Predicted Runtime" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
