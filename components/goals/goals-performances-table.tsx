"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Check,
  PlusCircle,
} from "lucide-react";
import { useGoals } from "@/hooks/use-goals";
import { useSelected } from "@/app/provider";
import { Goal } from "@/types/goals";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GoalFormDialog } from "./goal-form-dialog";
import { MilestonesTimeline } from "./milestones-timeline";
import { GoalFormMilestoneDialog } from "./goal-form-milestone";

export function GoalsTable() {
  const [sortColumn, setSortColumn] = useState("target_date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { goals, deleteGoal, markGoalCompleted, isMarkingGoalCompleted } =
    useGoals();
  const { selected, setSelected } = useSelected();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "at-risk":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "on-track":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (isCompleted: boolean) => {
    return isCompleted ? "Completed" : "In Progress";
  };

  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "bg-green-500" : "bg-blue-500";
  };

  const sortedGoals = Array.isArray(goals)
    ? [...goals].sort((a, b) => {
        if (
          [
            "progress",
            "progress_percentage",
            "current_value",
            "target_value",
          ].includes(sortColumn)
        ) {
          return sortDirection === "asc"
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
        } else if (sortColumn === "target_date") {
          return sortDirection === "asc"
            ? new Date(a.target_date).getTime() -
                new Date(b.target_date).getTime()
            : new Date(b.target_date).getTime() -
                new Date(a.target_date).getTime();
        } else if (sortColumn === "is_completed") {
          return sortDirection === "asc"
            ? (a.is_completed ? 1 : 0) - (b.is_completed ? 1 : 0)
            : (b.is_completed ? 1 : 0) - (a.is_completed ? 1 : 0);
        } else {
          return sortDirection === "asc"
            ? String(a[sortColumn]).localeCompare(String(b[sortColumn]))
            : String(b[sortColumn]).localeCompare(String(a[sortColumn]));
        }
      })
    : [];

  const totalPages = Math.ceil(sortedGoals.length / itemsPerPage);
  const paginatedGoals = sortedGoals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Goal | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleEdit = (content: Goal) => {
    setSelectedContent(content);
    setIsEditDialogOpen(true);
  };
  const handleDelete = (content: Goal) => {
    setSelectedContent(content);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedContent) {
      await deleteGoal(selectedContent.id);
      setIsDeleteDialogOpen(false);
      setSelectedContent(null);
    }
  };

  const handleMarkMilestoneCompleted = async (goal: any) => {
    //@ts-ignore
    await markGoalCompleted(goal.id);
  };

  const [isGoalFormMilestoneOpen, setIsGoalFormMilestoneOpen] = useState(false);
  return (
    <div
      className={`rounded-md border ${isMarkingGoalCompleted && "opacity-50"}`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Goal Name
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("type_display")}
            >
              Type
            </TableHead>
            {/* <TableHead className="cursor-pointer" onClick={() => handleSort("is_completed")}>
              Status
            </TableHead> */}
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("progress_percentage")}
            >
              Progress
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("current_value")}
            >
              Current Value
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("target_value")}
            >
              Target Value
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("target_date")}
            >
              Deadline
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("target_date")}
            >
              Milestone
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(paginatedGoals) &&
            paginatedGoals.map((goal) => (
              <TableRow
                key={goal.id}
                //@ts-ignore
                className={`cursor-pointer ${
                //@ts-ignore
                  selected?.id === goal.id ? "bg-red-50" : ""
                }`}
                onClick={() => setSelected(goal)}
              >
                <TableCell className="font-medium">{goal.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{goal.type_display}</Badge>
                </TableCell>
                {/* <TableCell>
                <div className="flex items-center gap-2">
                  {goal.is_completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : goal.status === "at-risk" ? (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-500" />
                  )}
                  <Badge className={getStatusColor(goal.is_completed)}>{getStatusText(goal.is_completed)}</Badge>
                </div>
              </TableCell> */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          goal.is_completed
                            ? "bg-green-500"
                            : goal.status === "at-risk"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${goal.progress_percentage}%` }}
                      ></div>
                    </div>
                    <span>{goal.progress_percentage.toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {goal.current_value}
                </TableCell>
                <TableCell className="text-right">
                  {goal.target_value}
                </TableCell>
                <TableCell>
                  {new Date(goal.target_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {" "}
                  <MilestonesTimeline />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(goal)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(goal)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleMarkMilestoneCompleted(goal)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                         <Button
                variant={"outline"}
                disabled={!selected}
                onClick={() => setIsGoalFormMilestoneOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Milestone
              </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-4 items-center p-4">
        <Button
          className="rounded-full w-10 h-10"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          className="rounded-full w-10 h-10"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {selectedContent && (
        <>
          <GoalFormDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedContent(null);
            }}
            goal={selectedContent}
          />

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this goal?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action is irreversible. The goal {selectedContent?.name}{" "}
                  will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedContent(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

            <GoalFormMilestoneDialog
              goal_pk={
                //@ts-ignore
                selected?.id
              }
              isOpen={isGoalFormMilestoneOpen}
              onClose={() => setIsGoalFormMilestoneOpen(false)}
            />
    </div>
  );
}
