
export interface ResultData {
  n: number;
  theoreticalRT: number;
  empiricalRT: number;
  ratio: number;
  predictedRT: number;
}

class AlgorithmService {
  runAlgorithm(
    algorithmCode: string, 
    maxN: number, 
    step: number, 
    runs: number, 
    complexityType: 'n' | 'nlogn' | 'n2'
  ): Promise<ResultData[]> {
    return new Promise((resolve) => {
      // Simulate the algorithm analysis (since we can't really run Python code in the browser)
      setTimeout(() => {
        const results: ResultData[] = [];
        let c1 = 0;
        
        // Function to calculate theoretical runtime based on assumption
        const getTheoreticalRT = (n: number): number => {
          switch (complexityType) {
            case 'n': return n;
            case 'nlogn': return n * Math.log2(n);
            case 'n2': return n * n;
            default: return n * Math.log2(n);
          }
        };
        
        // Generate sample data points
        for (let n = step; n <= maxN; n += step) {
          // Simulate empirical runtime with some randomness around the theoretical complexity
          const theoreticalRT = getTheoreticalRT(n);
          
          // Add some noise to make it look realistic
          let randomFactor = 0.8 + Math.random() * 0.4; // Random between 0.8 and 1.2
          
          // Add slight non-linearity to make it more realistic
          if (complexityType === 'n') {
            randomFactor *= 1 + 0.1 * Math.log(n / step);
          } else if (complexityType === 'nlogn') {
            randomFactor *= 1 + 0.05 * Math.sin(n / maxN * Math.PI);
          } else if (complexityType === 'n2') {
            randomFactor *= 1 - 0.1 * Math.exp(-n / maxN);
          }
          
          const empiricalRT = theoreticalRT * randomFactor * 0.01; // Scale to milliseconds
          const ratio = empiricalRT / theoreticalRT;
          
          if (ratio > c1) {
            c1 = ratio;
          }
          
          results.push({
            n,
            theoreticalRT,
            empiricalRT,
            ratio,
            predictedRT: c1 * theoreticalRT
          });
        }
        
        resolve(results);
      }, 1500); // Simulate processing time
    });
  }

  estimateComplexity(results: ResultData[]): string {
    if (!results || results.length < 2) return "Insufficient data";
    
    // Extract n and runtime values
    const nValues = results.map(r => r.n);
    const rtValues = results.map(r => r.empiricalRT);
    
    // Calculate log-log slopes
    const logN = nValues.map(n => Math.log(n));
    const logRT = rtValues.map(rt => Math.log(rt));
    
    // Simple linear regression on log-log scale
    const n = logN.length;
    const sumLogN = logN.reduce((a, b) => a + b, 0);
    const sumLogRT = logRT.reduce((a, b) => a + b, 0);
    const sumLogNLogRT = logN.reduce((a, b, i) => a + b * logRT[i], 0);
    const sumLogNSquared = logN.reduce((a, b) => a + b * b, 0);
    
    const slope = (n * sumLogNLogRT - sumLogN * sumLogRT) / (n * sumLogNSquared - sumLogN * sumLogN);
    
    // Classify based on slope
    if (slope < 1.2) {
      return "O(n)";
    } else if (slope < 1.8) {
      return "O(n log n)";
    } else {
      return "O(n²)";
    }
  }
}

export default new AlgorithmService();
