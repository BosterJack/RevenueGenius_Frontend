"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GoalNotificationsSettings() {
  const [settings, setSettings] = useState({
    milestoneReminders: true,
    progressUpdates: true,
    atRiskAlerts: true,
    completionCelebrations: true,
    reminderFrequency: "weekly",
  })

  const handleToggleChange = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    })
  }

  const handleSelectChange = (value: string) => {
    setSettings({
      ...settings,
      reminderFrequency: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="milestone-reminders">Rappels de jalons</Label>
            <p className="text-sm text-muted-foreground">
              Recevez des rappels lorsque les échéances de jalons approchent
            </p>
          </div>
          <Switch
            id="milestone-reminders"
            checked={settings.milestoneReminders}
            onCheckedChange={() => handleToggleChange("milestoneReminders")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="progress-updates">Mises à jour de progression</Label>
            <p className="text-sm text-muted-foreground">
              Recevez des mises à jour régulières sur la progression de vos objectifs
            </p>
          </div>
          <Switch
            id="progress-updates"
            checked={settings.progressUpdates}
            onCheckedChange={() => handleToggleChange("progressUpdates")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="at-risk-alerts">Alertes de risque</Label>
            <p className="text-sm text-muted-foreground">
              Recevez des alertes lorsque vos objectifs sont en retard ou à risque
            </p>
          </div>
          <Switch
            id="at-risk-alerts"
            checked={settings.atRiskAlerts}
            onCheckedChange={() => handleToggleChange("atRiskAlerts")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="completion-celebrations">Célébrations d'achèvement</Label>
            <p className="text-sm text-muted-foreground">
              Recevez des notifications de félicitations lorsque vous atteignez vos objectifs
            </p>
          </div>
          <Switch
            id="completion-celebrations"
            checked={settings.completionCelebrations}
            onCheckedChange={() => handleToggleChange("completionCelebrations")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reminder-frequency">Fréquence des rappels</Label>
        <Select value={settings.reminderFrequency} onValueChange={handleSelectChange}>
          <SelectTrigger id="reminder-frequency">
            <SelectValue placeholder="Sélectionner une fréquence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Quotidienne</SelectItem>
            <SelectItem value="weekly">Hebdomadaire</SelectItem>
            <SelectItem value="biweekly">Bimensuelle</SelectItem>
            <SelectItem value="monthly">Mensuelle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button>Enregistrer les préférences</Button>
      </div>
    </div>
  )
}

