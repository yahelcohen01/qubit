/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PodcastImport } from './routes/podcast'
import { Route as KnowledgeBaseImport } from './routes/knowledge-base'
import { Route as IndexImport } from './routes/index'
import { Route as EventsIndexImport } from './routes/events/index'
import { Route as EventsEventIdImport } from './routes/events/$eventId'

// Create/Update Routes

const PodcastRoute = PodcastImport.update({
  id: '/podcast',
  path: '/podcast',
  getParentRoute: () => rootRoute,
} as any)

const KnowledgeBaseRoute = KnowledgeBaseImport.update({
  id: '/knowledge-base',
  path: '/knowledge-base',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EventsIndexRoute = EventsIndexImport.update({
  id: '/events/',
  path: '/events/',
  getParentRoute: () => rootRoute,
} as any)

const EventsEventIdRoute = EventsEventIdImport.update({
  id: '/events/$eventId',
  path: '/events/$eventId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/knowledge-base': {
      id: '/knowledge-base'
      path: '/knowledge-base'
      fullPath: '/knowledge-base'
      preLoaderRoute: typeof KnowledgeBaseImport
      parentRoute: typeof rootRoute
    }
    '/podcast': {
      id: '/podcast'
      path: '/podcast'
      fullPath: '/podcast'
      preLoaderRoute: typeof PodcastImport
      parentRoute: typeof rootRoute
    }
    '/events/$eventId': {
      id: '/events/$eventId'
      path: '/events/$eventId'
      fullPath: '/events/$eventId'
      preLoaderRoute: typeof EventsEventIdImport
      parentRoute: typeof rootRoute
    }
    '/events/': {
      id: '/events/'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/knowledge-base': typeof KnowledgeBaseRoute
  '/podcast': typeof PodcastRoute
  '/events/$eventId': typeof EventsEventIdRoute
  '/events': typeof EventsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/knowledge-base': typeof KnowledgeBaseRoute
  '/podcast': typeof PodcastRoute
  '/events/$eventId': typeof EventsEventIdRoute
  '/events': typeof EventsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/knowledge-base': typeof KnowledgeBaseRoute
  '/podcast': typeof PodcastRoute
  '/events/$eventId': typeof EventsEventIdRoute
  '/events/': typeof EventsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/knowledge-base'
    | '/podcast'
    | '/events/$eventId'
    | '/events'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/knowledge-base' | '/podcast' | '/events/$eventId' | '/events'
  id:
    | '__root__'
    | '/'
    | '/knowledge-base'
    | '/podcast'
    | '/events/$eventId'
    | '/events/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  KnowledgeBaseRoute: typeof KnowledgeBaseRoute
  PodcastRoute: typeof PodcastRoute
  EventsEventIdRoute: typeof EventsEventIdRoute
  EventsIndexRoute: typeof EventsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  KnowledgeBaseRoute: KnowledgeBaseRoute,
  PodcastRoute: PodcastRoute,
  EventsEventIdRoute: EventsEventIdRoute,
  EventsIndexRoute: EventsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/knowledge-base",
        "/podcast",
        "/events/$eventId",
        "/events/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/knowledge-base": {
      "filePath": "knowledge-base.tsx"
    },
    "/podcast": {
      "filePath": "podcast.tsx"
    },
    "/events/$eventId": {
      "filePath": "events/$eventId.tsx"
    },
    "/events/": {
      "filePath": "events/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
