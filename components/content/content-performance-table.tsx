"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/hooks/use-content";

interface ContentPerformanceTableProps {
  filter?: string;
}

export function ContentPerformanceTable({ filter }: ContentPerformanceTableProps) {
  const [sortColumn, setSortColumn] = useState("publishDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { content: contents } = useContent();
//@ts-ignore
  const filteredContents = filter ?Array.isArray(contents) & contents?.filter((content) => content.type === filter) : contents ||[];

  const sortedContents = [...filteredContents].sort((a, b) => {
    if (["visits", "leads", "conversions", "roi"].includes(sortColumn)) {
      return sortDirection === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
    } else if (sortColumn === "publishDate") {
      return sortDirection === "asc"
        ? new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
        : new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    } else {
      return sortDirection === "asc"
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn]);
    }
  });

  const totalPages = Math.ceil(sortedContents.length / itemsPerPage);
  const paginatedContents = sortedContents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>Title</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>Type</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("publishDate")}>Publish Date</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("visits")}>Visits</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("leads")}>Leads</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("conversions")}>Conversions</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("roi")}>ROI</TableHead>
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
              <TableCell className="text-right">{content?.performance?.visits}</TableCell>
              <TableCell className="text-right">{content?.performance?.leads}</TableCell>
              <TableCell className="text-right">{content?.performance?.conversions}</TableCell>
              <TableCell className="text-right">{content.roi}%</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-4 items-center p-4">
        <Button className="rounded-full w-10 h-10" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          <ChevronLeft/>
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button className="rounded-full w-10 h-10" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
         <ChevronRight/>
        </Button>
      </div>
    </div>
  );
}
