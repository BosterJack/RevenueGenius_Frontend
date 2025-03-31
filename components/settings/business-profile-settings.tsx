"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Business } from "@/types/auth"

export function BusinessProfileSettings() {
  // État pour les données d'entreprise
  const [business, setBusiness] = useState<Partial<Business>>({
    name: "Acme Inc",
    industry: "consulting",
    size: "small",
  })

  // Données supplémentaires
  const [additionalData, setAdditionalData] = useState({
    website: "https://acme-inc.com",
    description: "Entreprise de conseil en stratégie digitale et marketing pour les PME.",
    logo: "/logo.png",
  })

  // Gestionnaire d'événements pour les données d'entreprise
  const handleBusinessChange = (key: string, value: string) => {
    setBusiness({
      ...business,
      [key]: value,
    })
  }

  // Gestionnaire d'événements pour les données supplémentaires
  const handleAdditionalDataChange = (key: string, value: string) => {
    setAdditionalData({
      ...additionalData,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
          <img
            src={additionalData.logo || "/placeholder.svg"}
            alt="Logo de l'entreprise"
            className="max-w-full max-h-full p-2"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{business.name}</h3>
          <p className="text-sm text-muted-foreground">{additionalData.website}</p>
          <Button variant="outline" size="sm">
            Changer le logo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de l'entreprise</Label>
          <Input id="name" value={business.name || ""} onChange={(e) => handleBusinessChange("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Site web</Label>
          <Input
            id="website"
            value={additionalData.website}
            onChange={(e) => handleAdditionalDataChange("website", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Secteur d'activité</Label>
          <Select value={business.industry} onValueChange={(value) => handleBusinessChange("industry", value)}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Sélectionner un secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consulting">Conseil</SelectItem>
              <SelectItem value="education">Formation</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="technology">Technologie</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Taille de l'entreprise</Label>
          <Select value={business.size} onValueChange={(value) => handleBusinessChange("size", value)}>
            <SelectTrigger id="size">
              <SelectValue placeholder="Sélectionner une taille" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo-entrepreneur</SelectItem>
              <SelectItem value="small">Petite (2-10 employés)</SelectItem>
              <SelectItem value="medium">Moyenne (11-50 employés)</SelectItem>
              <SelectItem value="large">Grande (51+ employés)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description de l'entreprise</Label>
          <Textarea
            id="description"
            rows={4}
            value={additionalData.description}
            onChange={(e) => handleAdditionalDataChange("description", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Enregistrer les modifications</Button>
      </div>
    </div>
  )
}

