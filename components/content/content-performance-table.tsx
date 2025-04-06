// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   MoreHorizontal,
//   Edit,
//   ChevronLeft,
//   ChevronRight,
//   Trash2,
//   Pencil,
//   Plus,
// } from "lucide-react";
// import { useContent } from "@/hooks/use-content";
// import { ContentFormDialog } from "./content-form-dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Content } from "@/types/content";
// import { AddPerformanceDialog } from "./add-performance";
// interface ContentPerformanceTableProps {
//   filter?: string;
// }

// export function ContentPerformanceTable({
//   filter,
// }: ContentPerformanceTableProps) {
//   const [sortColumn, setSortColumn] = useState("publishDate");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const { content: contents, deleteContent } = useContent();
//   //@ts-ignore
//   const filteredContents = filter
//   //@ts-ignore
//     ? Array.isArray(contents) &
//       contents?.filter((content:any) => content.type === filter)
//     : contents || [];

//   const sortedContents = [...filteredContents].sort((a, b) => {
//     if (["visits", "leads", "conversions", "roi"].includes(sortColumn)) {
//       return sortDirection === "asc"
//         ? a[sortColumn] - b[sortColumn]
//         : b[sortColumn] - a[sortColumn];
//     } else if (sortColumn === "publishDate") {
//       return sortDirection === "asc"
//         ? new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
//         : new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
//     } else {
//       return sortDirection === "asc"
//         ? a[sortColumn].localeCompare(b[sortColumn])
//         : b[sortColumn].localeCompare(a[sortColumn]);
//     }
//   });

//   const totalPages = Math.ceil(sortedContents.length / itemsPerPage);
//   const paginatedContents = sortedContents.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [selectedContent, setSelectedContent] = useState<Content | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const handleEdit = (content: Content) => {
//     setSelectedContent(content);
//     setIsEditDialogOpen(true);
//   };
//   const handleDelete = (content: Content) => {
//     setSelectedContent(content);
//     setIsDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (selectedContent) {
//       await deleteContent(selectedContent.id);
//       setIsDeleteDialogOpen(false);
//       setSelectedContent(null);
//     }
//   };
//   const [isAddPerformanceDialogOpen, setIsAddPerformanceDialogOpen] =
//     useState(false);
//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead
//               className="cursor-pointer"
//               onClick={() => handleSort("title")}
//             >
//               Title
//             </TableHead>
//             <TableHead
//               className="cursor-pointer"
//               onClick={() => handleSort("type")}
//             >
//               Type
//             </TableHead>
//             <TableHead
//               className="cursor-pointer"
//               onClick={() => handleSort("publishDate")}
//             >
//               Publish Date
//             </TableHead>
//             <TableHead
//               className="cursor-pointer text-right"
//               onClick={() => handleSort("visits")}
//             >
//               Visits
//             </TableHead>
//             <TableHead
//               className="cursor-pointer text-right"
//               onClick={() => handleSort("leads")}
//             >
//               Leads
//             </TableHead>
//             <TableHead
//               className="cursor-pointer text-right"
//               onClick={() => handleSort("conversions")}
//             >
//               Conversions
//             </TableHead>
//             <TableHead
//               className="cursor-pointer text-right"
//               onClick={() => handleSort("roi")}
//             >
//               ROI
//             </TableHead>
//                         <TableHead className="w-[80px]">Performances</TableHead>
//             <TableHead className="w-[80px]">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {paginatedContents.map((content) => (
//             <TableRow key={content.id}>
//               <TableCell className="font-medium">{content?.title}</TableCell>
//               <TableCell>
//                 <Badge variant="outline">{content?.type}</Badge>
//               </TableCell>
//               <TableCell>
//                 {new Date(content.publish_date).toLocaleDateString()}
//               </TableCell>
//               <TableCell className="text-right">
//                 {content?.performance?.visits}
//               </TableCell>
//               <TableCell className="text-right">
//                 {content?.performance?.leads}
//               </TableCell>
//               <TableCell className="text-right">
//                 {content?.performance?.conversions}
//               </TableCell>
//               <TableCell className="text-right">{content.roi}%</TableCell>
//               <TableCell className="cursor-pointer"> <div
//                       onClick={() => setIsAddPerformanceDialogOpen(true)}
//                     >
//                      {content?.performance ? (
//         <div  className="flex gap-2 items-center">
//           <Pencil className="mr-2 h-4 w-4" />
//           Edit 
//         </div>
//       ) : (
//         <div className="flex gap-2 items-center">
//           <Plus className="mr-2 h-4 w-4" />
//           Add 
//         </div>
//       )}
//                       {!content?.performance?(
//                       <AddPerformanceDialog
//                         contentId={content.id || ""}
//                         open={isAddPerformanceDialogOpen}
//                         onOpenChange={setIsAddPerformanceDialogOpen}
//                       />):(<AddPerformanceDialog
//                         contentId={content?.id || ""}
//                         open={isAddPerformanceDialogOpen}
//                         onOpenChange={setIsAddPerformanceDialogOpen}
//                         initialData={
//                           content?.performance || {
//                             visits: 0,
//                             leads: 0,
//                             conversions: 0,
//                           }
//                         }
//                         isEdit={true}
//                       />)}
//                     </div></TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 p-0">
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem onClick={() => handleEdit(content)}>
//                       <Edit className="mr-2 h-4 w-4" />
//                       <span>Edit</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => handleDelete(content)}>
//                       <Trash2 className="mr-2 h-4 w-4" />
//                       <span>Delete</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       onClick={() => setIsAddPerformanceDialogOpen(true)}
//                     >
//                      {content?.performance ? (
//         <div  className="flex gap-2 items-center">
//           <Pencil className="mr-2 h-4 w-4" />
//           Edit Performance
//         </div>
//       ) : (
//         <div className="flex gap-2 items-center">
//           <Plus className="mr-2 h-4 w-4" />
//           Add Performance
//         </div>
//       )}
//                       {!content?.performance?(
//                       <AddPerformanceDialog
//                         contentId={content.id || ""}
//                         open={isAddPerformanceDialogOpen}
//                         onOpenChange={setIsAddPerformanceDialogOpen}
//                       />):(<AddPerformanceDialog
//                         contentId={content?.id || ""}
//                         open={isAddPerformanceDialogOpen}
//                         onOpenChange={setIsAddPerformanceDialogOpen}
//                         initialData={
//                           content?.performance || {
//                             visits: 0,
//                             leads: 0,
//                             conversions: 0,
//                           }
//                         }
//                         isEdit={true}
//                       />)}
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className="flex justify-end gap-4 items-center p-4">
//         <Button
//           className="rounded-full w-10 h-10"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           <ChevronLeft />
//         </Button>
//         <span>
//           {currentPage} of {totalPages}
//         </span>
//         <Button
//           className="rounded-full w-10 h-10"
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           <ChevronRight />
//         </Button>
//       </div>
//       {selectedContent && (
//         <>
//           <ContentFormDialog
//             isOpen={isEditDialogOpen}
//             onClose={() => {
//               setIsEditDialogOpen(false);
//               setSelectedContent(null);
//             }}
//             content={selectedContent}
//           />

//           <AlertDialog
//             open={isDeleteDialogOpen}
//             onOpenChange={setIsDeleteDialogOpen}
//           >
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>
//                   Are you sure you want to delete this content?
//                 </AlertDialogTitle>
//                 <AlertDialogDescription>
//                   This action is irreversible. The content{" "}
//                   {selectedContent?.title} will be permanently deleted.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel onClick={() => setSelectedContent(null)}>
//                   Cancel
//                 </AlertDialogCancel>
//                 <AlertDialogAction onClick={confirmDelete}>
//                   Delete
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </>
//       )}
//     </div>
//   );
// }
"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, ChevronLeft, ChevronRight, Trash2, Pencil, Plus, BarChart } from "lucide-react"
import { useContent } from "@/hooks/use-content"
import { ContentFormDialog } from "./content-form-dialog"
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
import type { Content } from "@/types/content"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AddPerformanceDialog } from "./add-performance"

interface ContentPerformanceTableProps {
  filter?: string
}

export function ContentPerformanceTable({ filter }: ContentPerformanceTableProps) {
  const [sortColumn, setSortColumn] = useState("publishDate")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const { content: contents, deleteContent } = useContent()

  const filteredContents =
    filter && Array.isArray(contents) ? contents.filter((content: any) => content.type === filter) : contents || []

  const sortedContents = [...filteredContents].sort((a, b) => {
    if (["visits", "leads", "conversions", "roi"].includes(sortColumn)) {
      return sortDirection === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn]
    } else if (sortColumn === "publishDate") {
      return sortDirection === "asc"
        ? new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime()
        : new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
    } else {
      return sortDirection === "asc"
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn])
    }
  })

  const totalPages = Math.ceil(sortedContents.length / itemsPerPage)
  const paginatedContents = sortedContents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Content management state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Performance management state
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false)
  const [selectedPerformance, setSelectedPerformance] = useState<any>(null)
  const [isPerformanceSheetOpen, setIsPerformanceSheetOpen] = useState(false)

  const handleEdit = (content: Content) => {
    setSelectedContent(content)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (content: Content) => {
    setSelectedContent(content)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedContent) {
      await deleteContent(selectedContent.id)
      setIsDeleteDialogOpen(false)
      setSelectedContent(null)
    }
  }

  const handlePerformanceAction = (content: Content) => {
    setSelectedContent(content)
    //@ts-ignore
    setSelectedPerformance(content.performance || null)
    setIsPerformanceDialogOpen(true)
  }

  const handleViewPerformance = (content: Content) => {
    setSelectedContent(content)
    setIsPerformanceSheetOpen(true)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
              Title
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
              Type
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("publishDate")}>
              Publish Date
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("visits")}>
              Visits
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("leads")}>
              Leads
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("conversions")}>
              Conversions
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("roi")}>
              ROI
            </TableHead>
            <TableHead className="w-[80px]">Performances</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedContents.map((content) => (
            <TableRow key={content.id}>
              <TableCell className="font-medium">{content?.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{content?.type}</Badge>
              </TableCell>
              <TableCell>{new Date(content.publish_date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">{content?.performance?.visits || 0}</TableCell>
              <TableCell className="text-right">{content?.performance?.leads || 0}</TableCell>
              <TableCell className="text-right">{content?.performance?.conversions || 0}</TableCell>
              <TableCell className="text-right">{content.roi || 0}%</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handlePerformanceAction(content)}
                  >
                    {content?.performance ? (
                      <>
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </>
                    )}
                  </Button>

                  {content?.performance && (
                    <Sheet
                      open={selectedContent?.id === content.id && isPerformanceSheetOpen}
                      onOpenChange={(open) => {
                        if (!open) setIsPerformanceSheetOpen(false)
                      }}
                    >
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleViewPerformance(content)}>
                          <BarChart className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Performance Details</SheetTitle>
                          <SheetDescription>Performance metrics for {content.title}</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border p-3">
                              <div className="text-sm text-muted-foreground">Visits</div>
                              <div className="text-2xl font-bold">{content.performance?.visits || 0}</div>
                            </div>
                            <div className="rounded-lg border p-3">
                              <div className="text-sm text-muted-foreground">Leads</div>
                              <div className="text-2xl font-bold">{content.performance?.leads || 0}</div>
                            </div>
                            <div className="rounded-lg border p-3">
                              <div className="text-sm text-muted-foreground">Conversions</div>
                              <div className="text-2xl font-bold">{content.performance?.conversions || 0}</div>
                            </div>
                            <div className="rounded-lg border p-3">
                              <div className="text-sm text-muted-foreground">Conversion Rate</div>
                              <div className="text-2xl font-bold">
                                {content.performance?.visits
                                  ? ((content.performance?.conversions / content.performance?.visits) * 100).toFixed(2)
                                  : 0}
                                %
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsPerformanceSheetOpen(false)}>
                              Close
                            </Button>
                            <Button
                              onClick={() => {
                                setIsPerformanceSheetOpen(false)
                                handlePerformanceAction(content)
                              }}
                            >
                              Edit Performance
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(content)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Content</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(content)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Content</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handlePerformanceAction(content)}>
                      {content?.performance ? (
                        <>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit Performance</span>
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Add Performance</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    {content?.performance && (
                      <DropdownMenuItem onClick={() => handleViewPerformance(content)}>
                        <BarChart className="mr-2 h-4 w-4" />
                        <span>View Performance</span>
                      </DropdownMenuItem>
                    )}
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
        >
          <ChevronLeft />
        </Button>
        <span>
          {currentPage} of {totalPages || 1}
        </span>
        <Button
          className="rounded-full w-10 h-10"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Content Edit/Delete Dialogs */}
      {selectedContent && (
        <>
          <ContentFormDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false)
              setSelectedContent(null)
            }}
            content={selectedContent}
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this content?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is irreversible. The content {selectedContent?.title} will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedContent(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {/* Performance Dialog */}
      {selectedContent && (
        <AddPerformanceDialog
          contentId={selectedContent.id}
          open={isPerformanceDialogOpen}
          onOpenChange={(open) => {
            setIsPerformanceDialogOpen(open)
            if (!open) setSelectedContent(null)
          }}
          initialData={selectedPerformance}
          isEdit={!!selectedPerformance}
        />
      )}
    </div>
  )
}

