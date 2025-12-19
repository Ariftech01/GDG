import { Sun, Moon, Monitor, LogOut, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Theme Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-muted-foreground" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how AXION looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={theme}
            onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-4 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-background border border-border flex items-center justify-center">
                    <Sun className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Light</p>
                    <p className="text-sm text-muted-foreground">
                      A clean, bright interface
                    </p>
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-4 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <Moon className="h-5 w-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-medium">Dark</p>
                    <p className="text-sm text-muted-foreground">
                      Easy on the eyes at night
                    </p>
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-4 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-background to-slate-900 border border-border flex items-center justify-center">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">System</p>
                    <p className="text-sm text-muted-foreground">
                      Follow your device settings
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            Account
          </CardTitle>
          <CardDescription>
            Your account information and settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">U</span>
            </div>
            <div>
              <p className="font-medium text-foreground">User</p>
              <p className="text-sm text-muted-foreground">Student</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">user@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Account verified</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Sign Out
          </CardTitle>
          <CardDescription>
            Sign out of your AXION account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
