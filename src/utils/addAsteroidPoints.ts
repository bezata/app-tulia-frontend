import { toast } from 'sonner';

/**
 * Adds asteroid points to the user if they haven't received points for the specific quest in the past 24 hours.
 * Optionally marks a quest as completed.
 * @param {string} address - The address of the user.
 * @param {number} [points=200] - The number of points to add. Default is 200.
 * @param {string} [questName] - The name of the quest to mark as completed.
 */
export const addAsteroidPoints = async (
  address: string,
  points: number = 200,
  questName?: string
): Promise<void> => {
  try {
    const response = await fetch('/api/addAsteroidPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, points, questName }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error adding asteroid points:', error);
    toast.error('Failed to add asteroid points.');
  }
};
