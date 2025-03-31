"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentPerformanceTable } from "./content-performance-table"

export function ContentFilterTabs() {
  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="blog">Blog</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="webinar">Webinar</TabsTrigger>
        <TabsTrigger value="video">Vidéo</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ContentPerformanceTable  />
      </TabsContent>
      <TabsContent value="blog">
        <ContentPerformanceTable filter="blog" />
      </TabsContent>
      <TabsContent value="email">
        <ContentPerformanceTable filter="email" />
      </TabsContent>
      <TabsContent value="webinar">
        <ContentPerformanceTable filter="webinar" />
      </TabsContent>
      <TabsContent value="video">
        <ContentPerformanceTable filter="video" />
      </TabsContent>
      <TabsContent value="social">
        <ContentPerformanceTable filter="social" />
      </TabsContent>
    </Tabs>
  )
}

