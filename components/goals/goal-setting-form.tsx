"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from "lucide-react"

export function GoalSettingForm() {
  const [milestones, setMilestones] = useState([{ id: 1, name: "", targetValue: "", targetDate: "" }])

  const addMilestone = () => {
    const newId = milestones.length > 0 ? Math.max(...milestones.map((m) => m.id)) + 1 : 1
    setMilestones([...milestones, { id: newId, name: "", targetValue: "", targetDate: "" }])
  }

  const removeMilestone = (id: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id))
    }
  }

  const updateMilestone = (id: number, field: string, value: string) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goal-name">Nom de l'objectif</Label>
          <Input id="goal-name" placeholder="Ex: Atteindre 10 000€ de revenus mensuels" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal-type">Type d'objectif</Label>
          <Select>
            <SelectTrigger id="goal-type">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenu</SelectItem>
              <SelectItem value="leads">Leads</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="customers">Clients</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="target-value">Valeur cible</Label>
            <Input id="target-value" type="number" placeholder="Ex: 10000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-date">Date cible</Label>
            <Input id="target-date" type="date" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Décrivez votre objectif et comment vous comptez l'atteindre"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Jalons</Label>
          <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un jalon
          </Button>
        </div>

        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Jalon {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeMilestone(milestone.id)}
                disabled={milestones.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`milestone-name-${milestone.id}`}>Nom du jalon</Label>
              <Input
                id={`milestone-name-${milestone.id}`}
                value={milestone.name}
                onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                placeholder="Ex: Atteindre 5 000€ de revenus mensuels"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`milestone-value-${milestone.id}`}>Valeur cible</Label>
                <Input
                  id={`milestone-value-${milestone.id}`}
                  type="number"
                  value={milestone.targetValue}
                  onChange={(e) => updateMilestone(milestone.id, "targetValue", e.target.value)}
                  placeholder="Ex: 5000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`milestone-date-${milestone.id}`}>Date cible</Label>
                <Input
                  id={`milestone-date-${milestone.id}`}
                  type="date"
                  value={milestone.targetDate}
                  onChange={(e) => updateMilestone(milestone.id, "targetDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Annuler</Button>
        <Button>Enregistrer</Button>
      </div>
    </form>
  )
}

