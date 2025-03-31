"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ForecastControls() {
  const [growthRate, setGrowthRate] = useState(5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="start-date">Date de début</Label>
          <Input type="date" id="start-date" defaultValue="2023-07-01" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Date de fin</Label>
          <Input type="date" id="end-date" defaultValue="2024-06-30" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="forecast-model">Modèle de prévision</Label>
          <Select defaultValue="linear">
            <SelectTrigger id="forecast-model">
              <SelectValue placeholder="Sélectionner un modèle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linéaire</SelectItem>
              <SelectItem value="exponential">Exponentiel</SelectItem>
              <SelectItem value="seasonal">Saisonnier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="growth-rate">Taux de croissance mensuel: {growthRate}%</Label>
        </div>
        <Slider
          id="growth-rate"
          min={0}
          max={20}
          step={0.5}
          defaultValue={[5]}
          onValueChange={(value) => setGrowthRate(value[0])}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Réinitialiser</Button>
        <Button>Appliquer</Button>
      </div>
    </div>
  )
}

