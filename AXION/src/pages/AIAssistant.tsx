import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const mockUnits = [
  { id: "1", name: "Unit 1: Introduction to Data Structures" },
  { id: "2", name: "Unit 2: Trees and Graphs" },
  { id: "3", name: "Unit 3: Sorting and Searching" },
  { id: "4", name: "Unit 4: Advanced Data Structures" },
];

const topicsByUnit: Record<string, string[]> = {
  "1": ["Arrays", "Linked Lists", "Stacks", "Queues"],
  "2": ["Binary Trees", "BST", "AVL Trees", "Graph Algorithms"],
  "3": ["Bubble Sort", "Quick Sort", "Merge Sort", "Binary Search"],
  "4": ["Heaps", "Tries", "B-Trees", "Red-Black Trees"],
};

const examTips = [
  "Focus on time complexity analysis - frequently asked in exams",
  "Practice drawing tree/graph diagrams",
  "Remember the key differences between similar algorithms",
  "Understand both iterative and recursive approaches",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const topics = selectedUnit ? topicsByUnit[selectedUnit] || [] : [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulated AI response - will be replaced with actual Gemini API call
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `**Explanation (Exam-Oriented)**\n\n${input.includes("binary") ? 
          "A Binary Search Tree (BST) is a node-based binary tree data structure where:\n\n1. **Left subtree** contains only nodes with keys lesser than the node's key\n2. **Right subtree** contains only nodes with keys greater than the node's key\n3. Both subtrees must also be BSTs\n\n**Key Operations:**\n- Search: O(log n) average, O(n) worst case\n- Insert: O(log n) average\n- Delete: O(log n) average\n\n**Important for Exams:**\n- Know inorder traversal gives sorted sequence\n- Understand difference between BST and AVL tree\n- Practice deletion cases (leaf, one child, two children)" :
          "This topic is covered in your syllabus. Here's an exam-oriented explanation:\n\n1. **Definition**: Understand the core concept clearly\n2. **Properties**: Know the key characteristics\n3. **Operations**: Practice the main operations with examples\n4. **Applications**: Be aware of real-world use cases\n\n**Exam Tips:**\n- Focus on algorithm steps\n- Practice time complexity analysis\n- Prepare comparison tables for similar concepts"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleGenerateQuestions = () => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Generate important exam questions for ${selectedUnit ? mockUnits.find(u => u.id === selectedUnit)?.name : "all units"}`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `**Important Exam Questions**\n\n1. Explain the time complexity of various operations in a Binary Search Tree.\n\n2. Compare and contrast AVL trees and Red-Black trees.\n\n3. Write an algorithm for inorder traversal of a binary tree (both recursive and iterative).\n\n4. What is the difference between BFS and DFS? When would you use each?\n\n5. Explain the concept of balancing in AVL trees with rotation examples.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex animate-fade-in">
      {/* Left Panel - Controls */}
      <div className="w-80 border-r border-border p-4 flex flex-col gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Filter by Unit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {topics.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedTopic(selectedTopic === topic ? "" : topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Button 
          onClick={handleGenerateQuestions}
          variant="outline" 
          className="w-full"
          disabled={isLoading}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Generate Questions
        </Button>

        {/* Exam Tips */}
        <Card className="border-border/50 flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-warning" />
              Exam Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {examTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-warning">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto">
                  <Bot className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    Ask AXION anything
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Ask questions about your syllabus and get exam-oriented explanations.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "gradient-hero"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-4 max-w-[80%]",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {message.content.split("\n").map((line, i) => (
                        <p key={i} className={cn(
                          "mb-1 last:mb-0",
                          line.startsWith("**") && "font-semibold"
                        )}>
                          {line.replace(/\*\*/g, "")}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg gradient-hero flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your syllabus..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              className="gradient-primary"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
