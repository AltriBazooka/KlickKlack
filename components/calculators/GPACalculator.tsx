"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCredits, setNewCourseCredits] = useState<number>(3);
  const [newCourseGrade, setNewCourseGrade] = useState("A");

  const gradeToPoints: { [key: string]: number } = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
  };

  const addCourse = () => {
    if (newCourseName && newCourseCredits > 0) {
      setCourses([
        ...courses,
        { id: Date.now(), name: newCourseName, credits: newCourseCredits, grade: newCourseGrade },
      ]);
      setNewCourseName("");
      setNewCourseCredits(3);
      setNewCourseGrade("A");
    }
  };

  const gpa = useMemo(() => {
    if (courses.length === 0) return "0.00";

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      totalPoints += gradeToPoints[course.grade] * course.credits;
      totalCredits += course.credits;
    });

    return (totalPoints / totalCredits).toFixed(2);
  }, [courses]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>GPA Calculator</CardTitle>
        <CardDescription>Calculate your Grade Point Average.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="e.g., Calculus I"
              />
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                value={newCourseCredits}
                onChange={(e) => setNewCourseCredits(parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Select value={newCourseGrade} onValueChange={setNewCourseGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gradeToPoints).map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addCourse}>Add Course</Button>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Added Courses</h3>
            {courses.length === 0 ? (
              <p className="text-gray-500">No courses added yet.</p>
            ) : (
              <div className="grid gap-2">
                {courses.map((course) => (
                  <div key={course.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <span>{course.name} ({course.credits} credits)</span>
                    <Badge variant="secondary">{course.grade}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-right">
            <h2 className="text-2xl font-bold">Calculated GPA: {gpa}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}