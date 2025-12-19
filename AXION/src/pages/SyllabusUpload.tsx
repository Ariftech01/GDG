import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Unit {
  name: string;
  topics: string[];
}

// Mock extracted units - will be replaced with actual PDF parsing
const mockUnits: Unit[] = [
  {
    name: "Unit 1: Introduction to Data Structures",
    topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Time Complexity Analysis"],
  },
  {
    name: "Unit 2: Trees and Graphs",
    topics: ["Binary Trees", "BST", "AVL Trees", "Graph Representation", "BFS & DFS"],
  },
  {
    name: "Unit 3: Sorting and Searching",
    topics: ["Bubble Sort", "Quick Sort", "Merge Sort", "Binary Search", "Hashing"],
  },
  {
    name: "Unit 4: Advanced Data Structures",
    topics: ["Heaps", "Tries", "B-Trees", "Red-Black Trees", "Skip Lists"],
  },
];

export default function SyllabusUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedUnits, setExtractedUnits] = useState<Unit[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setExtractedUnits([]);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setExtractedUnits([]);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleUpload = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    // Simulated processing - will be replaced with actual API call
    setTimeout(() => {
      setExtractedUnits(mockUnits);
      setExpandedUnits(new Set([0])); // Expand first unit by default
      setIsProcessing(false);
      toast({
        title: "Syllabus processed!",
        description: `Extracted ${mockUnits.length} units from your syllabus.`,
      });
    }, 2000);
  };

  const toggleUnit = (index: number) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedUnits(newExpanded);
  };

  const handleCancel = () => {
    setFile(null);
    setExtractedUnits([]);
    setExpandedUnits(new Set());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Upload Syllabus</h2>
        <p className="text-muted-foreground">
          Upload your course syllabus PDF to enable AI-powered assistance.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-all",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50",
              file && "border-success bg-success/5"
            )}
          >
            {file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    className="ml-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Drag and drop your syllabus PDF here
                  </p>
                  <p className="text-muted-foreground mt-1">
                    or click to browse from your computer
                  </p>
                </div>
                <label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {file && extractedUnits.length === 0 && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            className="gradient-primary" 
            onClick={handleUpload}
            disabled={isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Processing..." : "Upload & Process"}
          </Button>
        </div>
      )}

      {/* Extracted Units */}
      {extractedUnits.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Extracted Units
            </CardTitle>
            <CardDescription>
              We found {extractedUnits.length} units in your syllabus. Review the extracted content below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {extractedUnits.map((unit, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleUnit(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="font-medium text-foreground">{unit.name}</span>
                  {expandedUnits.has(index) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {expandedUnits.has(index) && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                      {unit.topics.map((topic, topicIndex) => (
                        <p key={topicIndex} className="text-sm text-muted-foreground">
                          {topic}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {extractedUnits.length > 0 && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Upload Different File
          </Button>
          <Button className="gradient-primary">
            Save & Continue
          </Button>
        </div>
      )}
    </div>
  );
}
