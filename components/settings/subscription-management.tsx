"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { SubscriptionPlan, BillingPeriod } from "@/types/auth"

// Données simulées pour l'exemple
const subscriptionData = {
  currentPlan: "basic" as SubscriptionPlan,
  billingPeriod: "monthly" as BillingPeriod,
  isActive: true,
  startedAt: "2024-01-15",
  expiresAt: "2025-01-15",
  nextBillingDate: "2025-04-15",
  amount: 29,
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "Parfait pour démarrer",
    price: {
      monthly: 29,
      annually: 290,
    },
    features: [
      "Prévisions de revenus de base",
      "Suivi des leads limité",
      "Analyse de contenu basique",
      "5 objectifs maximum",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les entreprises en croissance",
    price: {
      monthly: 79,
      annually: 790,
    },
    features: [
      "Prévisions avancées avec scénarios",
      "Suivi des leads illimité",
      "Analyse de contenu détaillée",
      "Objectifs illimités",
      "Calculateurs financiers avancés",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    description: "Accès à vie à toutes les fonctionnalités",
    price: {
      oneTime: 1990,
    },
    features: [
      "Toutes les fonctionnalités Pro",
      "Accès à vie aux mises à jour",
      "Support VIP",
      "Consultation stratégique trimestrielle",
    ],
  },
]

const billingHistory = [
  {
    id: "inv-001",
    date: "15 Mars 2025",
    amount: "29,00 €",
    status: "Payé",
    plan: "Basic (Mensuel)",
  },
  {
    id: "inv-002",
    date: "15 Février 2025",
    amount: "29,00 €",
    status: "Payé",
    plan: "Basic (Mensuel)",
  },
  {
    id: "inv-003",
    date: "15 Janvier 2025",
    amount: "29,00 €",
    status: "Payé",
    plan: "Basic (Mensuel)",
  },
]

export function SubscriptionManagement() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(subscriptionData.currentPlan)
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(subscriptionData.billingPeriod)

  const handleUpgrade = async () => {
    // Simuler une mise à jour d'abonnement
    console.log(`Mise à niveau vers ${selectedPlan} avec facturation ${billingPeriod}`)
    // Dans une implémentation réelle, nous appellerions l'API ici
    // await updateSubscription(selectedPlan, billingPeriod)
    router.refresh()
  }

  const handleCancelSubscription = async () => {
    // Simuler une annulation d'abonnement
    console.log("Annulation de l'abonnement")
    // Dans une implémentation réelle, nous appellerions l'API ici
    // await cancelSubscription()
    router.refresh()
  }

  return (
    <Tabs defaultValue="plans" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="billing">Facturation</TabsTrigger>
        <TabsTrigger value="payment">Paiement</TabsTrigger>
      </TabsList>

      <TabsContent value="plans" className="space-y-4">
        <div className="flex items-center justify-end space-x-2 mb-4">
          <Label htmlFor="billing-toggle" className={billingPeriod === "monthly" ? "text-muted-foreground" : ""}>
            Mensuel
          </Label>
          <Switch
            id="billing-toggle"
            checked={billingPeriod === "annually"}
            onCheckedChange={(checked) => setBillingPeriod(checked ? "annually" : "monthly")}
          />
          <Label htmlFor="billing-toggle" className={billingPeriod === "annually" ? "text-muted-foreground" : ""}>
            Annuel <span className="text-green-600 text-sm">(Économisez 20%)</span>
          </Label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = subscriptionData.currentPlan === plan.id
            const price = plan.price.oneTime ?? plan.price[billingPeriod]

            return (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "border-primary" : ""} ${
                  selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">Populaire</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{price}€</span>
                    <span className="text-muted-foreground ml-1">
                      {plan.price.oneTime ? "" : billingPeriod === "monthly" ? "/mois" : "/an"}
                    </span>
                  </div>
                  <RadioGroup
                    value={selectedPlan}
                    onValueChange={(value) => setSelectedPlan(value as SubscriptionPlan)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.id as SubscriptionPlan} id={`plan-${plan.id}`} />
                      <Label htmlFor={`plan-${plan.id}`}>Sélectionner</Label>
                    </div>
                  </RadioGroup>
                  <ul className="space-y-2 mt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isCurrentPlan ? "outline" : "default"}
                    disabled={isCurrentPlan}
                    onClick={handleUpgrade}
                  >
                    {isCurrentPlan ? "Plan actuel" : "Choisir ce plan"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {subscriptionData.isActive && (
          <Alert variant="destructive" className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Annuler votre abonnement</AlertTitle>
            <AlertDescription className="flex flex-col space-y-2">
              <p>
                Vous pouvez annuler votre abonnement à tout moment. Votre accès restera actif jusqu'à la fin de la
                période de facturation en cours ({subscriptionData.nextBillingDate}).
              </p>
              <Button variant="outline" className="w-fit" onClick={handleCancelSubscription}>
                Annuler l'abonnement
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>

      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Historique de facturation</CardTitle>
            <CardDescription>Consultez vos factures précédentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div>Facture</div>
                  <div>Date</div>
                  <div>Montant</div>
                  <div>Plan</div>
                  <div>Statut</div>
                </div>
                <div className="divide-y">
                  {billingHistory.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-5 p-4 text-sm">
                      <div>{invoice.id}</div>
                      <div>{invoice.date}</div>
                      <div>{invoice.amount}</div>
                      <div>{invoice.plan}</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Méthodes de paiement</CardTitle>
            <CardDescription>Gérez vos méthodes de paiement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="font-medium">VISA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa se terminant par 4242</p>
                      <p className="text-sm text-muted-foreground">Expire le 12/2025</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full">Ajouter une méthode de paiement</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

