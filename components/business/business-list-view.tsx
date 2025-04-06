"use client"

import type { Business } from "@/types/business"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2 } from "lucide-react"
import { useBusiness } from "@/hooks/useBusiness"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface BusinessListViewProps {
  business: Business
  onUpdate: () => void
}

export function BusinessListView({ business, onUpdate }: BusinessListViewProps) {
  const { deleteBusiness, isDeletingBusiness } = useBusiness()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const handleDelete = () => {
    deleteBusiness(business.id)
    setIsDeleteDialogOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Name</TableCell>
            <TableCell>{business.name}</TableCell>
            <TableCell className="text-right" rowSpan={6}>
              <div className="flex flex-col space-y-2 items-end">
                <Button variant="outline" size="sm" onClick={() => setIsDetailDialogOpen(true)}>
                  <Eye className="h-4 w-4 mr-2" /> Details
                </Button>
                <Button variant="outline" size="sm" onClick={onUpdate}>
                  <Edit className="h-4 w-4 mr-2" /> Update
                </Button>
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the business "{business.name}" and
                        remove all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isDeletingBusiness}
                      >
                        {isDeletingBusiness ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ID</TableCell>
            <TableCell>{business.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Industry</TableCell>
            <TableCell>{business.industry}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Size</TableCell>
            <TableCell>
              <Badge variant="outline">{business.size}</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Created</TableCell>
            <TableCell>{formatDate(business.created_at)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Updated</TableCell>
            <TableCell>{formatDate(business.updated_at)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Business Details</DialogTitle>
            <DialogDescription>Detailed information about {business.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                <p className="text-sm">{business.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Owner ID</h3>
                <p className="text-sm">{business.owner}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="text-base font-medium">{business.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                <p className="text-sm">{business.industry}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                <p className="text-sm">{business.size}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                <p className="text-sm">{formatDate(business.created_at)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Updated At</h3>
                <p className="text-sm">{formatDate(business.updated_at)}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

