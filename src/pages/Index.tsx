
import React, { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import PerformanceChart, { PerformanceData } from '@/components/PerformanceChart';
import ResultsTable, { ResultRow } from '@/components/ResultsTable';
import SettingsPanel, { AnalysisSettings } from '@/components/SettingsPanel';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import algorithmService from '@/services/AlgorithmService';
import { algorithmTemplates, defaultAlgorithm } from '@/constants/algorithmTemplates';
import { useToast } from '@/components/ui/use-toast';
import { ChartLineIcon } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [code, setCode] = useState<string>(defaultAlgorithm);
  const [settings, setSettings] = useState<AnalysisSettings>({
    maxN: 10000,
    step: 1000,
    runs: 5,
    complexityAssumption: 'nlogn'
  });
  const [results, setResults] = useState<ResultRow[]>([]);
  const [complexity, setComplexity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCodeSubmit = async (submittedCode: string) => {
    setIsLoading(true);
    setCode(submittedCode);
    
    try {
      // Run the algorithm analysis
      const analysisResults = await algorithmService.runAlgorithm(
        submittedCode, 
        settings.maxN, 
        settings.step, 
        settings.runs,
        settings.complexityAssumption
      );
      
      setResults(analysisResults);
      
      // Estimate the complexity
      const estimatedComplexity = algorithmService.estimateComplexity(analysisResults);
      setComplexity(estimatedComplexity);
      
      toast({
        title: 'Analysis Complete',
        description: `Estimated time complexity: ${estimatedComplexity}`,
      });
    } catch (error) {
      console.error('Error running algorithm:', error);
      toast({
        title: 'Analysis Error',
        description: 'An error occurred while analyzing the algorithm',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsReset = () => {
    setSettings({
      maxN: 10000,
      step: 1000,
      runs: 5,
      complexityAssumption: 'nlogn'
    });
  };

  const handleTemplateSelect = (templateCode: string) => {
    setCode(templateCode);
    toast({
      description: 'Algorithm template loaded. Click "Run Analysis" to analyze.',
    });
  };

  // Transform results for the chart component
  const chartData: PerformanceData[] = results.map(row => ({
    n: row.n,
    empiricalRT: row.empiricalRT,
    predictedRT: row.predictedRT
  }));

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <header className="border-b border-border py-4">
        <div className="container flex items-center gap-2">
          <ChartLineIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Algorithm Performance Analyzer</h1>
        </div>
      </header>
      
      <main className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <CodeEditor defaultCode={code} onSubmit={handleCodeSubmit} />
              </CardContent>
            </Card>
            
            <PerformanceChart 
              data={chartData} 
              complexity={complexity || 'Not yet analyzed'} 
              isLoading={isLoading}
            />
            
            <Tabs defaultValue="table">
              <TabsList className="grid w-full max-w-md grid-cols-1">
                <TabsTrigger value="table">Results Table</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <ResultsTable data={results} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <SettingsPanel 
              settings={settings} 
              onSettingsChange={setSettings} 
              onReset={handleSettingsReset}
              templates={algorithmTemplates}
              onSelectTemplate={handleTemplateSelect} 
            />
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Algorithm Analysis Help</h3>
                  <p className="text-sm text-muted-foreground">
                    This tool helps you analyze the time complexity of algorithms. Enter your algorithm 
                    in the editor, select appropriate settings, and run the analysis.
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Function Signature</h4>
                    <pre className="text-xs">
                      <code>def custom_algorithm(arr, n, i):</code>
                    </pre>
                    <p className="text-xs text-muted-foreground">
                      - arr: Input array<br />
                      - n: Size of array<br />
                      - i: Target index/value
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Algorithm Performance Analyzer - A tool for analyzing algorithm time complexity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
