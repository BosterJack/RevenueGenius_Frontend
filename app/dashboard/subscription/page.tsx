// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { useSubscriptions } from "@/hooks/use-subscription";
// import { Button } from "@/components/ui/button";
// import { Ban, Trash2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";



// export default function SubscriptionsView() {
//   const {toast}=useToast()
//   function formatDate(dateString: string) {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   }
//   const { subscriptions: subscriptionsData, isLoadingSubscriptions,cancelSubscription,deleteSubscription,isCancellingSubscription,isDeletingSubscription } =
//     useSubscriptions();
//   // Calculate metrics
//   const activeSubscriptions =
//     Array.isArray(subscriptionsData) &&
//     subscriptionsData.filter((sub) => sub.is_active).length;
//   //@ts-ignore
//   const totalRevenue =
//     subscriptionsData &&
//     //@ts-ignore
//     subscriptionsData?.reduce((sum, sub) => {
//       const price = Number.parseFloat(sub.plan_details.price);
//       return sum + price;
//     }, 0);
// const cancelSubscriptionSubmit = (subscriptionId: string) => {
//   cancelSubscription(subscriptionId,{
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "Subscription cancelled successfully!",
//       })
//       // Handle success, e.g., show a success message
//     },
//     onError: () => {
//       // Handle error, e.g., show an error message
//     },
//   })
// }

// const deleteSubscriptionSubmit = (subscriptionId: string) => {
//   deleteSubscription(subscriptionId,{
//     onSuccess: () => {
//       // Handle success, e.g., show a success message
//     },
//     onError: () => {
//       // Handle error, e.g., show an error message
//     },
//   })
// }
//   return (
//     <div className={`space-y-6 ${isCancellingSubscription || isDeletingSubscription ? "pointer-events-none opacity-50" : ""}`}>
//       <h2 className="text-2xl font-bold">Subscriptions</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">
//               Active Subscriptions
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{activeSubscriptions}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">
//               Monthly Recurring Revenue
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               ${(totalRevenue && totalRevenue?.toFixed(2)) || 0}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">
//               Annual Projected Revenue
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               ${(totalRevenue ? totalRevenue * 12 : 0).toFixed(2)}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Active Subscriptions</CardTitle>
//           <CardDescription>View all active subscription plans</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {/* <TableHead>User ID</TableHead> */}
//                 <TableHead>Plan</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Billing Cycle</TableHead>
//                 <TableHead>Started</TableHead>
//                 <TableHead>Expires</TableHead>
//                 <TableHead>Status</TableHead>
//                  <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {Array.isArray(subscriptionsData) &&
//                 subscriptionsData.map((subscription) => (
//                   <TableRow key={subscription.id}>
//                     {/* <TableCell>{subscription.user}</TableCell> */}
//                     <TableCell>{subscription.plan_details.name}</TableCell>
//                     <TableCell>${subscription.plan_details.price}</TableCell>
//                     <TableCell>
//                       {subscription.plan_details.billing_cycle_display}
//                     </TableCell>
//                     <TableCell>{formatDate(subscription.started_at)}</TableCell>
//                     <TableCell>{formatDate(subscription.expires_at)}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={subscription.is_active ? "default" : "outline"}
//                       >
//                         {subscription.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => cancelSubscriptionSubmit(subscription.id)}
//                       > <Ban className="h-4 w-4" />
//                         Cancel 
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => deleteSubscriptionSubmit(subscription.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSubscriptions } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Ban, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SubscriptionsView() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cycleFilter, setCycleFilter] = useState("");

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const {
    subscriptions: subscriptionsData,
    isLoadingSubscriptions,
    cancelSubscription,
    deleteSubscription,
    isCancellingSubscription,
    isDeletingSubscription,
  } = useSubscriptions();

  const activeSubscriptions =
    Array.isArray(subscriptionsData) &&
    subscriptionsData.filter((sub) => sub.is_active).length;

  const totalRevenue =
    subscriptionsData &&
    //@ts-ignore
    subscriptionsData.reduce((sum, sub) => {
      const price = Number.parseFloat(sub.plan_details.price);
      return sum + price;
    }, 0);

  const cancelSubscriptionSubmit = (subscriptionId: string) => {
    cancelSubscription(subscriptionId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Subscription cancelled successfully!",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to cancel subscription.",
        });
      },
    });
  };

  const deleteSubscriptionSubmit = (subscriptionId: string) => {
    deleteSubscription(subscriptionId, {
      onSuccess: () => {
        toast({
          title: "Deleted",
          description: "Subscription deleted successfully!",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete subscription.",
        });
      },
    });
  };

  const filteredSubscriptions = subscriptionsData
  //@ts-ignore
    ?.filter((sub) =>
      sub.plan_details.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    //@ts-ignore
    .filter((sub) => (statusFilter ? sub.status.toLowercase() === statusFilter.toLocaleLowerCase() : true))
    //@ts-ignore
    .filter((sub) =>
      cycleFilter
        ? sub.plan_details.billing_cycle_display === cycleFilter
        : true
    );

  return (
    <div
      className={`space-y-6 ${
        isCancellingSubscription || isDeletingSubscription
          ? "pointer-events-none opacity-50"
          : ""
      }`}
    >
      <h2 className="text-2xl font-bold">Subscriptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Recurring Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalRevenue && totalRevenue?.toFixed(2)) || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Annual Projected Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalRevenue ? totalRevenue * 12 : 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>
            View all active subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <Input
              placeholder="Search by plan name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xs"
            />
            {/* <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border  bg-white rounded-md px-2 py-1"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
            </select> */}
            {/* <select
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value)}
              className="border rounded-md bg-white px-2 py-1"
            >
              <option value="">All Billing Cycles</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select> */}
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setCycleFilter("");
              }}
            >
              Reset Filters
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(filteredSubscriptions) &&
                filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>{subscription.plan_details.name}</TableCell>
                    <TableCell>${subscription.plan_details.price}</TableCell>
                    <TableCell>
                      {subscription.plan_details.billing_cycle_display}
                    </TableCell>
                    <TableCell>
                      {formatDate(subscription.started_at)}
                    </TableCell>
                    <TableCell>
                      {formatDate(subscription.expires_at)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subscription.is_active ? "default" : "outline"
                        }
                      >
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          cancelSubscriptionSubmit(subscription.id)
                        }
                      >
                        <Ban className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          deleteSubscriptionSubmit(subscription.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
