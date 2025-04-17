// utils/api.ts
export const submitScore = async (playerName: string, score: number) => {
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, score }),
      });
  
      if (!response.ok) throw new Error('Failed to submit score');
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };
  