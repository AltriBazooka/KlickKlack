import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Goal {
  id: string;
  name: string;
  completed: boolean;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalName, setNewGoalName] = useState('');

  const addGoal = () => {
    if (newGoalName.trim() !== '') {
      setGoals([...goals, { id: Date.now().toString(), name: newGoalName, completed: false }]);
      setNewGoalName('');
    }
  };

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-black dark:text-white">Goal Tracker</CardTitle>
        <CardDescription className="text-center">Track your goals and progress.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="new-goal">New Goal</Label>
          <div className="flex space-x-2">
            <Input
              id="new-goal"
              placeholder="Enter your goal"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addGoal();
                }
              }}
            />
            <Button onClick={addGoal}>Add Goal</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-black dark:text-white">Your Goals</h3>
          {goals.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No goals added yet. Start tracking!</p>
          ) : (
            <ul className="space-y-2">
              {goals.map((goal) => (
                <li key={goal.id} className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 p-3 rounded-md shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`goal-${goal.id}`}
                      checked={goal.completed}
                      onCheckedChange={() => toggleGoalCompletion(goal.id)}
                    />
                    <Label
                      htmlFor={`goal-${goal.id}`}
                      className={`text-gray-800 dark:text-gray-200 ${goal.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                    >
                      {goal.name}
                    </Label>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => deleteGoal(goal.id)}>Delete</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}