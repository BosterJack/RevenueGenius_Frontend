// "use client"

// import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { useSelected } from "@/app/provider";
// import { useEffect, useState } from "react";

// export function MilestonesTimeline() {
//   const { selected ,isGoalSuccess} = useSelected();
//   //@ts-ignore
//   const [milestones, setMilestones] = useState(selected?.milestones || []);

//   useEffect(() => {
//     //@ts-ignore
//     setMilestones(selected?.milestones || []);
//   }, [selected,isGoalSuccess]);

//   milestones && console.log(milestones, "milestones",isGoalSuccess);

//   // Sort milestones by target date
//   const sortedMilestones = [...(milestones || [])].sort(
//     (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
//   );

//   return (
//     <div className="relative">
//       <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200"></div>
//       <div className="space-y-8">
//         {Array.isArray(sortedMilestones) && sortedMilestones?.length>0 &&
//           sortedMilestones.map((milestone) => {
//             const isLate = !milestone.isCompleted && new Date(milestone.target_date) < new Date();
//             const isPending = !milestone.isCompleted && new Date(milestone.target_date) >= new Date();

//             return (
//               <div key={milestone.id} className="relative flex items-start">
//                 <div className="absolute left-9 top-5 h-full w-0.5 bg-gray-200"></div>
//                 <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-200 z-10">
//                   {milestone.isCompleted ? (
//                     <CheckCircle2 className="h-6 w-6 text-green-500" />
//                   ) : isLate ? (
//                     <AlertCircle className="h-6 w-6 text-amber-500" />
//                   ) : (
//                     <Clock className="h-6 w-6 text-blue-500" />
//                   )}
//                 </div>
//                 <div className="ml-4 bg-white p-4 rounded-lg border shadow-sm w-full">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="font-medium">{milestone.name}</h3>
//                       <p className="text-sm text-muted-foreground">Goal: {
//                       //@ts-ignore
//                       selected?.name || "Goal not specified"}</p>
//                     </div>
//                     <Badge className={milestone?.is_completed ? "bg-green-500" : isLate ? "bg-amber-500" : "bg-blue-500"}>
//                       {milestone?.is_completed ? "Completed" : isLate ? "Overdue" : "Upcoming"}
//                     </Badge>
//                   </div>
//                   <div className="mt-2 flex items-center justify-between text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Target Value: </span>
//                       <span className="font-medium">{milestone?.target_value}</span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Target Date: </span>
//                       <span className="font-medium">{new Date(milestone?.target_date).toLocaleDateString()}</span>
//                     </div>
//                     {milestone?.is_completed && (
//                       <div>
//                         <span className="text-muted-foreground">Completed on: </span>
//                         <span className="font-medium">{new Date(milestone?.completed_date!).toLocaleDateString()}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           {sortedMilestones.length === 0 && <p className="text-muted-foreground p-4 rounded-lg bg-gray-100 text-sm">No milestones for this goal.</p>}
//       </div>
//     </div>
//   );
// }
"use client"

import { CheckCircle2, Clock, AlertCircle, Edit, Trash2, MoreHorizontal, Check, View, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSelected } from "@/app/provider"
import { useEffect, useState } from "react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GoalFormMilestoneDialog } from "./goal-form-milestone"
import { DeleteMilestoneDialog } from "./delete-milestone"
import { useGoals } from "@/hooks/use-goals"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from "lucide-react" // ou n'importe quelle icône
export function MilestonesTimeline() {
  const { selected, isGoalSuccess } = useSelected()
  //@ts-ignore
  const [milestones, setMilestones] = useState(selected?.milestones || [])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
const {markMilestoneCompleted,isMarkingMilestoneCompleted}=useGoals()
  useEffect(() => {
    //@ts-ignore
    setMilestones(selected?.milestones || [])
  }, [selected, isGoalSuccess])

  // Sort milestones by target date
  const sortedMilestones = [...(milestones || [])].sort(
    (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime(),
  )

  const handleEditMilestone = (milestone:any) => {
    setSelectedMilestone(milestone)
    setIsEditDialogOpen(true)
  }

  const handleDeleteMilestone = (milestone:any) => {
    setSelectedMilestone(milestone)
    setIsDeleteDialogOpen(true)
  }
const handleMarkMilestoneCompleted=async(milestone:any)=>{
    //@ts-ignore
    await markMilestoneCompleted({goalId:selected.id,milestoneId:milestone.id})
   
  }
  return (
//     <Sheet>
// <SheetContent>
  
// </SheetContent>
    
//     <div className="relative">
//       <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200"></div>
//       <div className={`space-y-8 ${isMarkingMilestoneCompleted && "opacity-50"}`}>
//         {Array.isArray(sortedMilestones) &&
//           sortedMilestones?.length > 0 &&
//           sortedMilestones.map((milestone) => {
//             const isLate = !milestone.isCompleted && new Date(milestone.target_date) < new Date()
//             const isPending = !milestone.isCompleted && new Date(milestone.target_date) >= new Date()

//             return (
//               <div key={milestone.id} className="relative flex items-start">
//                 <div className="absolute left-9 top-5 h-full w-0.5 bg-gray-200"></div>
//                 <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-200 z-10">
//                   {milestone.isCompleted ? (
//                     <CheckCircle2 className="h-6 w-6 text-green-500" />
//                   ) : isLate ? (
//                     <AlertCircle className="h-6 w-6 text-amber-500" />
//                   ) : (
//                     <Clock className="h-6 w-6 text-blue-500" />
//                   )}
//                 </div>
//                 <div className="ml-4 bg-white p-4 rounded-lg border shadow-sm w-full">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="font-medium">{milestone.name}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Goal:{" "}
//                         {
//                           //@ts-ignore
//                           selected?.name || "Goal not specified"
//                         }
//                       </p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge
//                         className={milestone?.is_completed ? "bg-green-500" : isLate ? "bg-amber-500" : "bg-blue-500"}
//                       >
//                         {milestone?.is_completed ? "Completed" : isLate ? "Overdue" : "Upcoming"}
//                       </Badge>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                             <span className="sr-only">Actions</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => handleEditMilestone(milestone)}>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDeleteMilestone(milestone)}
//                             className="text-red-600 focus:text-red-600"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleMarkMilestoneCompleted(milestone)}>
//                             <Check className="mr-2 h-4 w-4" />
//                             Mark as Completed
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>
//                   <div className="mt-2 flex items-center justify-between text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Target Value: </span>
//                       <span className="font-medium">{milestone?.target_value}</span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Target Date: </span>
//                       <span className="font-medium">{new Date(milestone?.target_date).toLocaleDateString()}</span>
//                     </div>
//                     {milestone?.is_completed && (
//                       <div>
//                         <span className="text-muted-foreground">Completed on: </span>
//                         <span className="font-medium">{new Date(milestone?.completed_date!).toLocaleDateString()}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         {sortedMilestones.length === 0 && (
//           <p className="text-muted-foreground p-4 rounded-lg bg-gray-100 text-sm">No milestones for this goal.</p>
//         )}
//       </div>

//       {/* Edit Dialog */}
//       {selectedMilestone && (
//         <GoalFormMilestoneDialog
//           isOpen={isEditDialogOpen}
//           onClose={() => setIsEditDialogOpen(false)}
//           goal={selectedMilestone}
//           //@ts-ignore
//           goal_pk={selected?.id}
//         />
//       )}

//       {/* Delete Dialog */}
//       {selectedMilestone && (
//         <DeleteMilestoneDialog
//           isOpen={isDeleteDialogOpen}
//           onClose={() => setIsDeleteDialogOpen(false)}
//           milestone={selectedMilestone}
//           //@ts-ignore
//           goalId={selected?.id}
//         />
//       )}
//     </div>
//     </Sheet>

<Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2" >
          <Eye className="w-4 h-4 mr-2" />
           Milestones
        </button>
      </SheetTrigger>
      <SheetContent side={"custom"} className="w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Milestones</SheetTitle>
          <SheetDescription>Progression des étapes liées à l’objectif sélectionné.</SheetDescription>
        </SheetHeader>

        {/* === TON CONTENU ICI === */}
        <div className="relative mt-6">
          <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className={`space-y-8 ${isMarkingMilestoneCompleted && "opacity-50"}`}>
            {Array.isArray(sortedMilestones) &&
              sortedMilestones?.length > 0 &&
              sortedMilestones.map((milestone) => {
                const isLate = !milestone.isCompleted && new Date(milestone.target_date) < new Date()
                const isPending = !milestone.isCompleted && new Date(milestone.target_date) >= new Date()

                return (
                  <div key={milestone.id} className="relative flex items-start">
                    <div className="absolute left-9 top-5 h-full w-0.5 bg-gray-200"></div>
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-200 z-10">
                      {milestone.isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : isLate ? (
                        <AlertCircle className="h-6 w-6 text-amber-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                    <div className="ml-4 bg-white p-4 rounded-lg border shadow-sm w-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{milestone.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Goal: {
                               //@ts-ignore
                            selected?.name || "Goal not specified"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={milestone?.is_completed ? "bg-green-500" : isLate ? "bg-amber-500" : "bg-blue-500"}
                          >
                            {milestone?.is_completed ? "Completed" : isLate ? "Overdue" : "Upcoming"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditMilestone(milestone)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteMilestone(milestone)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkMilestoneCompleted(milestone)}>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Target Value: </span>
                          <span className="font-medium">{milestone?.target_value}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Target Date: </span>
                          <span className="font-medium">{new Date(milestone?.target_date).toLocaleDateString()}</span>
                        </div>
                        {milestone?.is_completed && (
                          <div>
                            <span className="text-muted-foreground">Completed on: </span>
                            <span className="font-medium">{new Date(milestone?.completed_date!).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            {sortedMilestones.length === 0 && (
              <p className="text-muted-foreground p-4 rounded-lg bg-gray-100 text-sm">No milestones for this goal.</p>
            )}
          </div>

          {/* Dialogs */}
          {selectedMilestone && (
            <>
              <GoalFormMilestoneDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                goal={selectedMilestone}
                //@ts-ignore
                goal_pk={selected?.id}
              />
              <DeleteMilestoneDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                milestone={selectedMilestone}
                 //@ts-ignore
                goalId={selected?.id}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

