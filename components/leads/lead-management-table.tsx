// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { MoreHorizontal, Mail, Phone, Calendar, Edit, Trash2 } from "lucide-react"
// import { useLeads } from "@/hooks/use-leads"
// import { LeadFormDialog } from "./lead-form-dialog"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import type { Lead } from "@/types/leads"

// interface LeadManagementTableProps {
//   filter?: string
// }

// export function LeadManagementTable({ filter }: LeadManagementTableProps) {
//   const { leads, deleteLead } = useLeads()
//   const [sortColumn, setSortColumn] = useState("dateAdded")
//   const [sortDirection, setSortDirection] = useState("desc")
//   const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// leads && console.log(leads,'leads')
//   // Filtrer les leads en fonction du statut si un filtre est fourni
//   const filteredLeads =
//     filter && leads
//       ? leads?.filter(
//           (lead: Lead) => lead.status === filter ,
//         )
//       : leads || []

//   // Trier les leads
//   const sortedLeads = [...filteredLeads].sort((a: any, b: any) => {
//     if (sortColumn === "value") {
//       return sortDirection === "asc" ? (a.value || 0) - (b.value || 0) : (b.value || 0) - (a.value || 0)
//     } else if (sortColumn === "dateAdded" || sortColumn === "lastContact") {
//       return sortDirection === "asc"
//         ? new Date(a[sortColumn]).getTime() - new Date(b[sortColumn]).getTime()
//         : new Date(b[sortColumn]).getTime() - new Date(a[sortColumn]).getTime()
//     } else {
//       return sortDirection === "asc"
//         ? a[sortColumn].localeCompare(b[sortColumn])
//         : b[sortColumn].localeCompare(a[sortColumn])
//     }
//   })
// filteredLeads && console.log(filteredLeads,'filteredLeads')
//   // Fonction pour changer le tri
//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortColumn(column)
//       setSortDirection("asc")
//     }
//   }

//   // Fonction pour obtenir la couleur du badge en fonction du statut
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "hot":
//         return "bg-red-500"
//       case "warm":
//         return "bg-amber-500"
//       case "cold":
//         return "bg-blue-500"
//       case "converted":
//         return "bg-green-500"
//       default:
//         return "bg-gray-500"
//     }
//   }

//   const handleEdit = (lead: Lead) => {
//     setSelectedLead(lead)
//     setIsEditDialogOpen(true)
//   }

//   const handleDelete = (lead: Lead) => {
//     setSelectedLead(lead)
//     setIsDeleteDialogOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (selectedLead) {
//       await deleteLead(selectedLead.id)
//       setIsDeleteDialogOpen(false)
//       setSelectedLead(null)
//     }
//   }

//   return (
//     <>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
//                 Nom
//                 {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
//               </TableHead>
//               <TableHead>Email / Téléphone</TableHead>
//               <TableHead className="cursor-pointer" onClick={() => handleSort("source")}>
//                 Source
//                 {sortColumn === "source" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
//               </TableHead>
//               <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
//                 Statut
//                 {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
//               </TableHead>
//               <TableHead className="cursor-pointer text-right" onClick={() => handleSort("value")}>
//                 Valeur
//                 {sortColumn === "value" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
//               </TableHead>
//               <TableHead className="cursor-pointer" onClick={() => handleSort("lastContact")}>
//                 Dernier contact
//                 {sortColumn === "lastContact" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
//               </TableHead>
//               <TableHead className="w-[80px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sortedLeads.map((lead: Lead) => (
//               <TableRow key={lead.id}>
//                 <TableCell className="font-medium">{lead.name}</TableCell>
//                 <TableCell>
//                   <div className="flex flex-col">
//                     <span className="text-sm">{lead.email}</span>
//                     <span className="text-xs text-muted-foreground">{lead.phone}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="outline">{lead.source_display}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge className={getStatusColor(lead.status)}>{lead.status_display}</Badge>
//                 </TableCell>
//                 <TableCell className="text-right">{lead.value ? `€${lead.value}` : "-"}</TableCell>
//                 <TableCell>{lead.last_contact ? new Date(lead.last_contact).toLocaleDateString() : "-"}</TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <span className="sr-only">Ouvrir le menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuItem>
//                         <Mail className="mr-2 h-4 w-4" />
//                         <span>Envoyer un email</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <Phone className="mr-2 h-4 w-4" />
//                         <span>Appeler</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <Calendar className="mr-2 h-4 w-4" />
//                         <span>Planifier un rendez-vous</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={() => handleEdit(lead)}>
//                         <Edit className="mr-2 h-4 w-4" />
//                         <span>Modifier</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => handleDelete(lead)}>
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         <span>Supprimer</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {selectedLead && (
//         <>
//           <LeadFormDialog
//             isOpen={isEditDialogOpen}
//             onClose={() => {
//               setIsEditDialogOpen(false)
//               setSelectedLead(null)
//             }}
//             lead={selectedLead}
//           />

//           <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce lead ?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   Cette action est irréversible. Le lead {selectedLead.name} sera définitivement supprimé.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel onClick={() => setSelectedLead(null)}>Annuler</AlertDialogCancel>
//                 <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </>
//       )}
//     </>
//   )
// }

"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Mail, Phone, Calendar, Edit, Trash2, ChevronRight, ChevronLeft } from "lucide-react"
import { useLeads } from "@/hooks/use-leads"
import { LeadFormDialog } from "./lead-form-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Lead } from "@/types/leads"
import { useToast } from "@/hooks/use-toast"

interface LeadManagementTableProps {
  filter?: string
}

export function LeadManagementTable({ filter }: LeadManagementTableProps) {
  const { leads, deleteLead } = useLeads()
  const [sortColumn, setSortColumn] = useState("dateAdded")
  const [sortDirection, setSortDirection] = useState("desc")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 7 // Set the number of rows per page

  // Filter and sort the leads
  const filteredLeads = filter && leads
    ? leads.filter((lead: Lead) => lead.status === filter)
    : leads || []

  const sortedLeads = [...filteredLeads].sort((a: any, b: any) => {
    if (sortColumn === "value") {
      return sortDirection === "asc" ? (a.value || 0) - (b.value || 0) : (b.value || 0) - (a.value || 0)
    } else if (sortColumn === "dateAdded" || sortColumn === "lastContact") {
      return sortDirection === "asc"
        ? new Date(a[sortColumn]).getTime() - new Date(b[sortColumn]).getTime()
        : new Date(b[sortColumn]).getTime() - new Date(a[sortColumn]).getTime()
    } else {
      return sortDirection === "asc"
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn])
    }
  })

  // Get the current page's leads
  const paginatedLeads = sortedLeads.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-500"
      case "warm":
        return "bg-amber-500"
      case "cold":
        return "bg-blue-500"
      case "converted":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDeleteDialogOpen(true)
  }

  const {toast}=useToast()

  const confirmDelete = async () => {
    if (selectedLead) {
      await deleteLead(selectedLead.id,{
        onSuccess: () => {
        toast({
          title: "Success",
          description: "The lead has been deleted successfully!",
        })
      },
        onError: () => {
        toast({
          title: "Error",
          description: "An error occurred while deleting the lead.",
        })
      }})
      setIsDeleteDialogOpen(false)
      setSelectedLead(null)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(sortedLeads.length / rowsPerPage)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Name
                {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead>Email / Phone</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("source")}>
                Source
                {sortColumn === "source" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Status
                {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("value")}>
                Value
                {sortColumn === "value" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastContact")}>
                Last Contact
                {sortColumn === "lastContact" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.map((lead: Lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{lead.email}</span>
                    <span className="text-xs text-muted-foreground">{lead.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.source_display}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>{lead.status_display}</Badge>
                </TableCell>
                <TableCell className="text-right">{lead.value ? `€${lead.value}` : "-"}</TableCell>
                <TableCell>{lead.last_contact ? new Date(lead.last_contact).toLocaleDateString() : "-"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {/* <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Send Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        <span>Call</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Schedule Appointment</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator /> */}
                      <DropdownMenuItem onClick={() => handleEdit(lead)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(lead)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4">
        <Button className="rounded-full w-10 h-10" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
         <ChevronLeft/>
        </Button>
        <span className="mx-4">{currentPage} of {totalPages}</span>
        <Button className="rounded-full w-10 h-10" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <ChevronRight/>
        </Button>
      </div>

      {selectedLead && (
        <>
          <LeadFormDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false)
              setSelectedLead(null)
            }}
            lead={selectedLead}
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this lead?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is irreversible. The lead {selectedLead.name} will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedLead(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  )
}
