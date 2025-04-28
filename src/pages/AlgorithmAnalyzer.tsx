
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CodeEditor from '@/components/CodeEditor';
import PerformanceChart from '@/components/PerformanceChart';
import ResultsTable from '@/components/ResultsTable';
import SettingsPanel from '@/components/SettingsPanel';
import { useToast } from '@/components/ui/use-toast';
import { ChartLineIcon } from '@/components/icons';
import algorithmService from '@/services/AlgorithmService';
import { algorithmTemplates } from '@/constants/algorithmTemplates';

interface ResultData {
  n: number;
  theoreticalRT: number;
  empiricalRT: number;
  ratio: number;
  predictedRT: number;
}

const AlgorithmAnalyzer = () => {
  const { toast } = useToast();
  const [code, setCode] = useState<string>(algorithmTemplates[0].code);
  const [settings, setSettings] = useState({
    maxN: 10000,
    step: 1000,
    runs: 5,
    complexityAssumption: 'nlogn' as 'n' | 'nlogn' | 'n2'
  });
  const [results, setResults] = useState<ResultData[]>([]);
  const [complexity, setComplexity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCodeSubmit = async (submittedCode: string) => {
    setIsLoading(true);
    setCode(submittedCode);
    
    try {
      const analysisResults = await algorithmService.runAlgorithm(
        submittedCode, 
        settings.maxN, 
        settings.step, 
        settings.runs,
        settings.complexityAssumption
      );
      
      setResults(analysisResults);
      const estimatedComplexity = algorithmService.estimateComplexity(analysisResults);
      setComplexity(estimatedComplexity);
      
      toast({
        title: 'Analysis Complete',
        description: `Estimated time complexity: ${estimatedComplexity}`,
      });
    } catch (error) {
      toast({
        title: 'Analysis Error',
        description: 'An error occurred while analyzing the algorithm',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <header className="border-b border-border py-4">
        <div className="container flex items-center gap-2">
          <ChartLineIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Algorithm Performance Analyzer</h1>
        </div>
      </header>
      
      <main className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeEditor defaultCode={code} onSubmit={handleCodeSubmit} />
              </CardContent>
            </Card>
            
            <PerformanceChart 
              data={results}
              complexity={complexity || 'Not yet analyzed'}
              isLoading={isLoading}
            />
            
            <ResultsTable data={results} />
          </div>
          
          <div>
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              onReset={() => setSettings({
                maxN: 10000,
                step: 1000,
                runs: 5,
                complexityAssumption: 'nlogn'
              })}
              templates={algorithmTemplates}
              onSelectTemplate={(code) => setCode(code)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlgorithmAnalyzer;
