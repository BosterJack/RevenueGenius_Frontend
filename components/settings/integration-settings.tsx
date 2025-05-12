"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChromeIcon as Google, FileSpreadsheet, CreditCard, MessageSquare } from "lucide-react"
import GoogleAuthButton from "../auth/google-auth-button"
import FacebookAuthButton from "../auth/facebook-auth-button"
import PayPalAuthButton from "../auth/paypal-auth-button"
import StripeAuthButton from "../auth/stripe-auth-button"

export function IntegrationSettings() {
  // État pour les intégrations
  const [integrations, setIntegrations] = useState({
    googleSheets: {
      connected: true,
      lastSync: "2023-06-22T10:30:00",
    },
    stripe: {
      connected: true,
      lastSync: "2023-06-23T14:15:00",
    },
    openai: {
      connected: false,
      lastSync: null,
    },
    slack: {
      connected: false,
      lastSync: null,
    },
  })

  // État pour les clés API
  const [apiKeys, setApiKeys] = useState({
    openai: "",
  })

  // Gestionnaire d'événements pour les intégrations
  const handleIntegrationToggle = (key: string) => {
    setIntegrations({
      ...integrations,
      [key]: {
        ...integrations[key as keyof typeof integrations],
        connected: !integrations[key as keyof typeof integrations].connected,
      },
    })
  }

  // Gestionnaire d'événements pour les clés API
  const handleApiKeyChange = (key: string, value: string) => {
    setApiKeys({
      ...apiKeys,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Intégrations connectées</h3>
<div className="flex gap-4">
          <GoogleAuthButton />
          {/* <MicrosoftAuthButton /> */}
          <FacebookAuthButton />
          <PayPalAuthButton />
          <StripeAuthButton />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Google className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Google Sheets</h4>
                  <p className="text-sm text-muted-foreground">
                    {integrations.googleSheets.connected
                      ? `Connecté - Dernière synchronisation: ${new Date(integrations.googleSheets.lastSync).toLocaleString()}`
                      : "Non connecté"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={integrations.googleSheets.connected}
                  onCheckedChange={() => handleIntegrationToggle("googleSheets")}
                />
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Stripe</h4>
                  <p className="text-sm text-muted-foreground">
                    {integrations.stripe.connected
                      ? `Connecté - Dernière synchronisation: ${new Date(integrations.stripe.lastSync).toLocaleString()}`
                      : "Non connecté"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={integrations.stripe.connected}
                  onCheckedChange={() => handleIntegrationToggle("stripe")}
                />
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">OpenAI</h4>
                  <p className="text-sm text-muted-foreground">
                    {integrations.openai.connected
                      ? `Connecté - Dernière synchronisation: ${integrations.openai.lastSync ? new Date(integrations.openai.lastSync).toLocaleString() : "Jamais"}`
                      : "Non connecté"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={integrations.openai.connected}
                  onCheckedChange={() => handleIntegrationToggle("openai")}
                />
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </div>

            {!integrations.openai.connected && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="openai-api-key">Clé API OpenAI</Label>
                <div className="flex gap-2">
                  <Input
                    id="openai-api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKeys.openai}
                    onChange={(e) => handleApiKeyChange("openai", e.target.value)}
                  />
                  <Button>Connecter</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">Slack</h4>
                  <p className="text-sm text-muted-foreground">
                    {integrations.slack.connected
                      ? `Connecté - Dernière synchronisation: ${integrations.slack.lastSync ? new Date(integrations.slack.lastSync).toLocaleString() : "Jamais"}`
                      : "Non connecté"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={integrations.slack.connected}
                  onCheckedChange={() => handleIntegrationToggle("slack")}
                />
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>Enregistrer les modifications</Button>
      </div>
    </div>
  )
}

