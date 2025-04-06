"use client"

import { useState, useEffect } from "react"
import { useSelected } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, MoreHorizontal, Plus, Check } from "lucide-react"
import { GoalFormMilestoneDialog } from "./goal-form-milestone"
import { DeleteMilestoneDialog } from "./delete-milestone"
import { useGoals } from "@/hooks/use-goals"


export function MilestonesTable() {
const {markMilestoneCompleted,isMarkingMilestoneCompleted,goalMilestone}=useGoals()
  const { selected, isGoalSuccess } = useSelected()
//@ts-ignore
const {data:milestones}=goalMilestone(selected?.id)
  //@ts-ignore
//   const [milestones, setMilestones] = useState(selected?.milestones || [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
//   useEffect(() => {
//     //@ts-ignore
//     setMilestones(selected?.milestones || [])
//   }, [selected, isGoalSuccess])

  // Sort milestones by target date
  const sortedMilestones = [...(milestones || [])].sort(
    (a, b) => new Date(a.target_date).getTime() - new Date(b.target_date).getTime(),
  )

  const handleAddMilestone = () => {
    setSelectedMilestone(null)
    setIsAddDialogOpen(true)
  }

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Milestones</h2>
        {/* <Button onClick={handleAddMilestone} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button> */}
      </div>

      <div className={`border rounded-md ${isMarkingMilestoneCompleted && "opacity-50"}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Target Value</TableHead>
              <TableHead>Target Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMilestones.length > 0 ? (
              sortedMilestones.map((milestone) => {
                const isLate = !milestone.is_completed && new Date(milestone.target_date) < new Date()
                const isPending = !milestone.is_completed && new Date(milestone.target_date) >= new Date()

                return (
                  <TableRow key={milestone.id}>
                    <TableCell className="font-medium">{milestone.name}</TableCell>
                    <TableCell>{milestone.target_value}</TableCell>
                    <TableCell>{new Date(milestone.target_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={milestone.is_completed ? "bg-green-500" : isLate ? "bg-amber-500" : "bg-blue-500"}
                      >
                        {milestone.is_completed ? "Completed" : isLate ? "Overdue" : "Upcoming"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
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
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No milestones found for this goal
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Dialog */}
      <GoalFormMilestoneDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        //@ts-ignore
        goal_pk={selected?.id}
      />

      {/* Edit Dialog */}
      {selectedMilestone && (
        <GoalFormMilestoneDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          goal={selectedMilestone}
           //@ts-ignore
          goal_pk={selected?.id}
        />
      )}

      {/* Delete Dialog */}
      {selectedMilestone && (
        <DeleteMilestoneDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          milestone={selectedMilestone}
           //@ts-ignore
          goalId={selected?.id}
        />
      )}
    </div>
  )
}

