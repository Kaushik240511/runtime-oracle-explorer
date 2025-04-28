
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export interface AnalysisSettings {
  maxN: number;
  step: number;
  runs: number;
  complexityAssumption: 'n' | 'nlogn' | 'n2';
}

interface SettingsPanelProps {
  settings: AnalysisSettings;
  onSettingsChange: (settings: AnalysisSettings) => void;
  onReset: () => void;
  templates: Array<{ name: string, code: string }>;
  onSelectTemplate: (code: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  settings, 
  onSettingsChange, 
  onReset,
  templates,
  onSelectTemplate
}) => {
  const handleInputChange = (key: keyof AnalysisSettings, value: string) => {
    if (key === 'complexityAssumption') {
      onSettingsChange({ ...settings, [key]: value as 'n' | 'nlogn' | 'n2' });
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue > 0) {
        onSettingsChange({ ...settings, [key]: numValue });
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analysis Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="maxN">Max Input Size (n)</Label>
            <Input
              id="maxN"
              type="number"
              min="100"
              value={settings.maxN}
              onChange={(e) => handleInputChange('maxN', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="step">Step Size</Label>
            <Input
              id="step"
              type="number"
              min="100"
              value={settings.step}
              onChange={(e) => handleInputChange('step', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="runs">Number of Runs</Label>
            <Input
              id="runs"
              type="number"
              min="1"
              max="20"
              value={settings.runs}
              onChange={(e) => handleInputChange('runs', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="complexity">Theoretical Complexity</Label>
            <Select
              value={settings.complexityAssumption}
              onValueChange={(value) => handleInputChange('complexityAssumption', value)}
            >
              <SelectTrigger id="complexity">
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="n">O(n)</SelectItem>
                <SelectItem value="nlogn">O(n log n)</SelectItem>
                <SelectItem value="n2">O(n²)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2 mt-2">
          <Label>Algorithm Templates</Label>
          <Select onValueChange={onSelectTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.name} value={template.code}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={onReset} variant="outline" className="mt-2">
          Reset Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
