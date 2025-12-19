import { Link } from "react-router-dom";
import { 
  Upload, 
  Bot, 
  HelpCircle, 
  BookOpen, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Subjects", value: "4", icon: BookOpen, color: "text-primary" },
  { label: "Units Covered", value: "12", icon: TrendingUp, color: "text-accent" },
  { label: "Questions Generated", value: "48", icon: HelpCircle, color: "text-success" },
];

const recentActivity = [
  { action: "Uploaded syllabus", subject: "Data Structures", time: "2 hours ago" },
  { action: "Generated questions", subject: "Unit 3 - Trees", time: "4 hours ago" },
  { action: "Asked AXION", subject: "Binary Search Trees", time: "Yesterday" },
  { action: "Uploaded syllabus", subject: "Database Systems", time: "2 days ago" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Welcome back! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your learning journey.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/ai-assistant">
              <Bot className="mr-2 h-4 w-4" />
              Ask AXION
            </Link>
          </Button>
          <Button asChild className="gradient-primary">
            <Link to="/syllabus-upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Syllabus
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
          <Link to="/syllabus-upload">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Upload Syllabus</CardTitle>
              <CardDescription>
                Upload your course syllabus PDF to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Get started <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-border/50 hover:border-accent/50 transition-colors cursor-pointer group">
          <Link to="/ai-assistant">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>
                Ask exam-oriented questions about your syllabus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                Ask AXION <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-border/50 hover:border-success/50 transition-colors cursor-pointer group">
          <Link to="/important-questions">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mb-2 group-hover:bg-success/20 transition-colors">
                <HelpCircle className="h-5 w-5 text-success" />
              </div>
              <CardTitle className="text-lg">Important Questions</CardTitle>
              <CardDescription>
                Generate exam-oriented questions by unit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-success flex items-center gap-1 group-hover:gap-2 transition-all">
                Generate <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.subject}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
