import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Users,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const doubtsByUnit = [
  { unit: "Unit 1", doubts: 45, label: "Data Structures" },
  { unit: "Unit 2", doubts: 78, label: "Trees & Graphs" },
  { unit: "Unit 3", doubts: 32, label: "Sorting" },
  { unit: "Unit 4", doubts: 56, label: "Advanced DS" },
];

const topDifficultTopics = [
  { topic: "AVL Tree Rotations", unit: "Unit 2", difficulty: 92 },
  { topic: "Red-Black Trees", unit: "Unit 4", difficulty: 88 },
  { topic: "Dijkstra's Algorithm", unit: "Unit 2", difficulty: 85 },
  { topic: "B-Tree Operations", unit: "Unit 4", difficulty: 82 },
  { topic: "Quick Sort Partition", unit: "Unit 3", difficulty: 75 },
];

const recentDoubts = [
  { student: "Student A", question: "How do AVL rotations work?", time: "2 hours ago" },
  { student: "Student B", question: "Difference between heap and BST?", time: "4 hours ago" },
  { student: "Student C", question: "When to use DFS vs BFS?", time: "Yesterday" },
];

export default function FacultyInsights() {
  const chartColors = ["hsl(234, 89%, 54%)", "hsl(0, 84%, 60%)", "hsl(142, 76%, 36%)", "hsl(38, 92%, 50%)"];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Faculty Insights
          </h2>
          <p className="text-muted-foreground">
            Analytics on student doubts and topic difficulty.
          </p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Units</SelectItem>
            <SelectItem value="1">Unit 1</SelectItem>
            <SelectItem value="2">Unit 2</SelectItem>
            <SelectItem value="3">Unit 3</SelectItem>
            <SelectItem value="4">Unit 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Doubts
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">211</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Students
            </CardTitle>
            <Users className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">
              Using AI Assistant
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Most Difficult Unit
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-display font-bold">Unit 2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trees & Graphs
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Questions Generated
            </CardTitle>
            <BookOpen className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all units
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Doubts by Unit Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              Doubts by Unit
            </CardTitle>
            <CardDescription>
              Number of questions asked per unit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={doubtsByUnit}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="unit" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="doubts" radius={[4, 4, 0, 0]}>
                  {doubtsByUnit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Difficult Topics */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Most Difficult Topics
            </CardTitle>
            <CardDescription>
              Topics where students struggle the most
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDifficultTopics.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{topic.topic}</span>
                      <Badge variant="outline" className="text-xs">
                        {topic.unit}
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {topic.difficulty}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${topic.difficulty}%`,
                        backgroundColor: topic.difficulty > 85 
                          ? "hsl(var(--destructive))" 
                          : topic.difficulty > 75 
                            ? "hsl(var(--warning))" 
                            : "hsl(var(--primary))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Doubts */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            Recent Student Doubts
          </CardTitle>
          <CardDescription>
            Latest questions from students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDoubts.map((doubt, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{doubt.question}</p>
                  <p className="text-sm text-muted-foreground">{doubt.student}</p>
                </div>
                <span className="text-sm text-muted-foreground">{doubt.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
