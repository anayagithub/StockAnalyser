import { useState } from "react";
import { Bell, Moon, Sun, Palette, Shield, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    signalChanges: true,
    newsDigest: false,
    weeklyReport: true,
  });

  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your AgenticStock AI experience</p>
      </div>

      {/* Appearance */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Appearance</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Theme</Label>
          <RadioGroup value={theme} onValueChange={(v) => setTheme(v as any)} className="grid grid-cols-3 gap-4">
            <Label
              htmlFor="dark"
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-secondary/50",
                theme === "dark" ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <Moon className="h-6 w-6" />
              <span className="text-sm">Dark</span>
              {theme === "dark" && <Check className="h-4 w-4 text-primary" />}
            </Label>
            <Label
              htmlFor="light"
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-secondary/50",
                theme === "light" ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <Sun className="h-6 w-6" />
              <span className="text-sm">Light</span>
              {theme === "light" && <Check className="h-4 w-4 text-primary" />}
            </Label>
            <Label
              htmlFor="system"
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-secondary/50",
                theme === "system" ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <RadioGroupItem value="system" id="system" className="sr-only" />
              <div className="relative h-6 w-6">
                <Sun className="h-4 w-4 absolute top-0 left-0" />
                <Moon className="h-4 w-4 absolute bottom-0 right-0" />
              </div>
              <span className="text-sm">System</span>
              {theme === "system" && <Check className="h-4 w-4 text-primary" />}
            </Label>
          </RadioGroup>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Price Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified when stocks hit your target prices
              </p>
            </div>
            <Switch
              checked={notifications.priceAlerts}
              onCheckedChange={(v) => setNotifications({ ...notifications, priceAlerts: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Signal Changes</p>
              <p className="text-sm text-muted-foreground">
                Alerts when AI recommendations change
              </p>
            </div>
            <Switch
              checked={notifications.signalChanges}
              onCheckedChange={(v) => setNotifications({ ...notifications, signalChanges: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">News Digest</p>
              <p className="text-sm text-muted-foreground">
                Daily summary of relevant market news
              </p>
            </div>
            <Switch
              checked={notifications.newsDigest}
              onCheckedChange={(v) => setNotifications({ ...notifications, newsDigest: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Report</p>
              <p className="text-sm text-muted-foreground">
                Weekly portfolio analysis and recommendations
              </p>
            </div>
            <Switch
              checked={notifications.weeklyReport}
              onCheckedChange={(v) => setNotifications({ ...notifications, weeklyReport: v })}
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Security & Privacy</h2>
        </div>
        <Separator />
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-between">
            <span>Change Password</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-between">
            <span>Two-Factor Authentication</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-between">
            <span>Connected Devices</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-between text-negative hover:text-negative">
            <span>Delete Account</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
