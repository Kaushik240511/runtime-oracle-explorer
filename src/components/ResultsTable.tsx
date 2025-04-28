
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface ResultRow {
  n: number;
  theoreticalRT: number;
  empiricalRT: number;
  ratio: number;
  predictedRT: number;
}

interface ResultsTableProps {
  data: ResultRow[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Input Size (n)</TableHead>
                <TableHead>Theoretical Runtime</TableHead>
                <TableHead>Empirical Runtime (ms)</TableHead>
                <TableHead>Ratio</TableHead>
                <TableHead>Predicted Runtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.n}</TableCell>
                  <TableCell>{row.theoreticalRT.toFixed(2)}</TableCell>
                  <TableCell>{row.empiricalRT.toFixed(2)}</TableCell>
                  <TableCell>{row.ratio.toFixed(4)}</TableCell>
                  <TableCell>{row.predictedRT.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;
