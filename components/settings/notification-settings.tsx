// "use client"

// import { useState } from "react"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"

// export function NotificationSettings() {
//   // État pour les préférences de notification
//   const [notificationPreferences, setNotificationPreferences] = useState({
//     email: {
//       dailyDigest: true,
//       weeklyReport: true,
//       leadAlerts: true,
//       goalAlerts: true,
//       marketingTips: false,
//     },
//     app: {
//       leadAlerts: true,
//       goalAlerts: true,
//       contentSuggestions: true,
//       systemUpdates: true,
//     },
//     frequency: "daily",
//   });
  
//   // Gestionnaire d'événements pour les préférences email
//   const handleEmailPreferenceChange = (key: string) => {
//     setNotificationPreferences({
//       ...notificationPreferences,
//       email: {
//         ...notificationPreferences.email,
//         [key]: !notificationPreferences.email[key as keyof typeof notificationPreferences.email],
//       },
//     });
//   };
  
//   // Gestionnaire d'événements pour les préférences app
//   const handleAppPreferenceChange = (key: string) => {
//     setNotificationPreferences({
//       ...notificationPreferences,
//       app: {
//         ...notificationPreferences.app,
//         [key]: !notificationPreferences.app[key as keyof typeof notificationPreferences.app],
//       },
//     });
//   };
  
//   // Gestionnaire d'événements pour la fréquence
//   const handleFrequencyChange = (value: string) => {
//     setNotificationPreferences({
//       ...notificationPreferences,
//       frequency: value,
//     });
//   };
  
//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium">Notifications par email</h3>
        
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label htmlFor="email-daily-digest">Résumé quotidien</Label>
//               <p className="text-sm text-muted-foreground">
//                 Recevez un résumé quotidien de vos performances
//               </p>
//             </div>
//             <Switch
//               id="email-daily-digest"
//               checked={notificationPreferences.email.dailyDigest}
//               onCheckedChange={() => handleEmailPreferenceChange("dailyDigest")}\

import React from 'react'

export default function NotificationSettings() {
  return (
    <div>
      
    </div>
  )
}
