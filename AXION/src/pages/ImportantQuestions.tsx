import { useState } from "react";
import { RefreshCw, ChevronDown, ChevronRight, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  difficulty: "Easy" | "Medium" | "Hard";
  marks: number;
}

interface UnitQuestions {
  unitId: string;
  unitName: string;
  questions: Question[];
}

const mockQuestions: UnitQuestions[] = [
  {
    unitId: "1",
    unitName: "Unit 1: Introduction to Data Structures",
    questions: [
      { id: "1-1", text: "Explain the concept of Abstract Data Types (ADT) with examples.", difficulty: "Easy", marks: 5 },
      { id: "1-2", text: "Compare and contrast arrays and linked lists in terms of memory allocation and operations.", difficulty: "Medium", marks: 10 },
      { id: "1-3", text: "Implement a stack using two queues. Analyze the time complexity of push and pop operations.", difficulty: "Hard", marks: 15 },
      { id: "1-4", text: "What is the difference between static and dynamic memory allocation? Explain with examples.", difficulty: "Easy", marks: 5 },
    ],
  },
  {
    unitId: "2",
    unitName: "Unit 2: Trees and Graphs",
    questions: [
      { id: "2-1", text: "Explain the properties of a Binary Search Tree. Write algorithms for insertion and deletion.", difficulty: "Medium", marks: 10 },
      { id: "2-2", text: "What is an AVL tree? Explain all four types of rotations with examples.", difficulty: "Hard", marks: 15 },
      { id: "2-3", text: "Compare BFS and DFS traversal techniques. When would you prefer one over the other?", difficulty: "Medium", marks: 10 },
      { id: "2-4", text: "Explain Dijkstra's shortest path algorithm with a suitable example.", difficulty: "Hard", marks: 15 },
    ],
  },
  {
    unitId: "3",
    unitName: "Unit 3: Sorting and Searching",
    questions: [
      { id: "3-1", text: "Compare the time complexities of Bubble Sort, Selection Sort, and Insertion Sort.", difficulty: "Easy", marks: 5 },
      { id: "3-2", text: "Explain the Quick Sort algorithm. What is the worst case and how can it be avoided?", difficulty: "Medium", marks: 10 },
      { id: "3-3", text: "Prove that comparison-based sorting algorithms have a lower bound of O(n log n).", difficulty: "Hard", marks: 15 },
      { id: "3-4", text: "Explain hashing with chaining and open addressing. Compare their performance.", difficulty: "Medium", marks: 10 },
    ],
  },
  {
    unitId: "4",
    unitName: "Unit 4: Advanced Data Structures",
    questions: [
      { id: "4-1", text: "What is a heap? Explain the heapify operation and its application in heap sort.", difficulty: "Medium", marks: 10 },
      { id: "4-2", text: "Explain the structure and operations of a B-tree. Why is it used in databases?", difficulty: "Hard", marks: 15 },
      { id: "4-3", text: "What is a Trie? Implement insert and search operations for a Trie.", difficulty: "Medium", marks: 10 },
      { id: "4-4", text: "Explain Red-Black trees and their balancing properties. How do they differ from AVL trees?", difficulty: "Hard", marks: 15 },
    ],
  },
];

const difficultyColors = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Hard: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function ImportantQuestions() {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(["1"]));
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  const handleRegenerate = (unitId: string) => {
    setIsRegenerating(unitId);
    setTimeout(() => {
      setIsRegenerating(null);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Important Questions
          </h2>
          <p className="text-muted-foreground">
            AI-generated exam-oriented questions organized by unit.
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate All
        </Button>
      </div>

      {/* Questions by Unit */}
      <div className="space-y-4">
        {mockQuestions.map((unit) => (
          <Card key={unit.unitId} className="border-border/50 overflow-hidden">
            <button
              onClick={() => toggleUnit(unit.unitId)}
              className="w-full"
            >
              <CardHeader className="flex flex-row items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {expandedUnits.has(unit.unitId) ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="text-left">
                    <CardTitle className="text-base">{unit.unitName}</CardTitle>
                    <CardDescription>
                      {unit.questions.length} questions generated
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {unit.questions.reduce((acc, q) => acc + q.marks, 0)} marks
                </Badge>
              </CardHeader>
            </button>

            {expandedUnits.has(unit.unitId) && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {unit.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="p-4 rounded-lg bg-muted/50 border border-border/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Q{index + 1}.
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(difficultyColors[question.difficulty])}
                            >
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {question.marks} marks
                            </Badge>
                          </div>
                          <p className="text-foreground">{question.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRegenerate(unit.unitId)}
                    disabled={isRegenerating === unit.unitId}
                  >
                    {isRegenerating === unit.unitId ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockQuestions.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No questions generated yet
            </h3>
            <p className="text-muted-foreground text-center max-w-sm">
              Upload a syllabus first to generate important exam questions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
