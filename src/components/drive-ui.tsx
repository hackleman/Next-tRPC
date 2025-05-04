"use client"

import { useState } from "react"
import {
  FileText,
  Folder,
  ImageIcon,
  Film,
  Music,
  Archive,
  File,
  ChevronRight,
  Upload,
  Search,
  MoreVertical,
  Users,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/lib/utils"

// Mock data types
type FileType = "document" | "image" | "video" | "audio" | "archive" | "folder" | "other"

interface DriveItem {
  id: string
  name: string
  type: FileType
  size?: string
  modified: string
  shared?: boolean
  path: string[]
  url?: string
}

// Mock data
const mockData: DriveItem[] = [
  {
    id: "folder-1",
    name: "Work Documents",
    type: "folder",
    modified: "May 2, 2025",
    path: ["root"],
    shared: true,
  },
  {
    id: "folder-2",
    name: "Personal",
    type: "folder",
    modified: "Apr 28, 2025",
    path: ["root"],
  },
  {
    id: "folder-3",
    name: "Photos",
    type: "folder",
    modified: "Apr 15, 2025",
    path: ["root"],
  },
  {
    id: "doc-1",
    name: "Project Proposal.docx",
    type: "document",
    size: "245 KB",
    modified: "May 3, 2025",
    path: ["root"],
    url: "#project-proposal",
  },
  {
    id: "img-1",
    name: "Screenshot.png",
    type: "image",
    size: "1.2 MB",
    modified: "May 1, 2025",
    path: ["root"],
    url: "#screenshot",
  },
  {
    id: "doc-2",
    name: "Budget 2025.xlsx",
    type: "document",
    size: "380 KB",
    modified: "Apr 29, 2025",
    path: ["root", "Work Documents"],
    url: "#budget",
  },
  {
    id: "doc-3",
    name: "Meeting Notes.docx",
    type: "document",
    size: "125 KB",
    modified: "Apr 27, 2025",
    path: ["root", "Work Documents"],
    url: "#meeting-notes",
  },
  {
    id: "doc-4",
    name: "Client Presentation.pptx",
    type: "document",
    size: "4.5 MB",
    modified: "Apr 26, 2025",
    path: ["root", "Work Documents"],
    url: "#presentation",
  },
  {
    id: "img-2",
    name: "Vacation.jpg",
    type: "image",
    size: "3.8 MB",
    modified: "Mar 15, 2025",
    path: ["root", "Personal", "Photos"],
    url: "#vacation",
  },
  {
    id: "img-3",
    name: "Family.jpg",
    type: "image",
    size: "2.7 MB",
    modified: "Feb 10, 2025",
    path: ["root", "Personal", "Photos"],
    url: "#family",
  },
  {
    id: "vid-1",
    name: "Birthday Party.mp4",
    type: "video",
    size: "245 MB",
    modified: "Jan 20, 2025",
    path: ["root", "Personal"],
    url: "#birthday",
  },
  {
    id: "aud-1",
    name: "Favorite Song.mp3",
    type: "audio",
    size: "8.2 MB",
    modified: "Apr 5, 2025",
    path: ["root", "Personal"],
    url: "#song",
  },
  {
    id: "arc-1",
    name: "Backup.zip",
    type: "archive",
    size: "540 MB",
    modified: "Apr 10, 2025",
    path: ["root"],
    url: "#backup",
  },
]

// Helper function to get file icon
function getFileIcon(type: FileType, className = "h-6 w-6") {
  switch (type) {
    case "document":
      return <FileText className={className} />
    case "folder":
      return <Folder className={className} />
    case "image":
      return <ImageIcon className={className} />
    case "video":
      return <Film className={className} />
    case "audio":
      return <Music className={className} />
    case "archive":
      return <Archive className={className} />
    default:
      return <File className={className} />
  }
}

export function DriveUI() {
  const [currentPath, setCurrentPath] = useState<string[]>(["root"])
  const [searchQuery, setSearchQuery] = useState("")

  // Filter items based on current path and search query
  const filteredItems = mockData.filter((item) => {
    // Check if the item is in the current path
    const pathMatch =
      JSON.stringify(item.path) === JSON.stringify(currentPath) ||
      (item.path.length === currentPath.length + 1 &&
        item.path.slice(0, -1).every((p, i) => p === currentPath[i]) &&
        item.path[item.path.length - 1] === item.id)

    // If there's a search query, check if the item name includes it
    const searchMatch = searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true

    return pathMatch && searchMatch
  })

  // Navigate to a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentPath([...currentPath, folderId])
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  // Get breadcrumb names
  const getBreadcrumbName = (pathItem: string) => {
    if (pathItem === "root") return "My Drive"

    const folder = mockData.find((item) => item.id === pathItem)
    return folder ? folder.name : pathItem
  }

  // Handle file upload (mock)
  const handleUpload = () => {
    alert("Upload functionality would open a file picker in a real application")
  }

  return (
    <div className="flex h-screen flex-col bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold mr-8">Google Drive</h1>
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search in Drive"
              className="pl-8 bg-gray-900 border-gray-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleUpload} variant="outline" className="border-gray-700 bg-gray-900 hover:bg-gray-800">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-gray-800 text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Toolbar */}
        <div className="border-b border-gray-800 flex items-center justify-between p-2">
          <div className="flex items-center">
            {/* Breadcrumb navigation */}
            <div className="flex items-center">
              {currentPath.map((path, index) => (
                <div key={path} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />}
                  <Button
                    variant="ghost"
                    className="h-8 px-2 text-white hover:bg-gray-800"
                    onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                  >
                    {getBreadcrumbName(path)}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Files and folders - List view only */}
        <div className="divide-y divide-gray-800">
          <div className="grid grid-cols-12 py-2 px-4 font-medium text-sm text-gray-400">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-3">Last modified</div>
            <div className="col-span-1">Size</div>
          </div>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 py-2 px-4 hover:bg-gray-900 transition-colors cursor-pointer items-center"
              onClick={() => {
                if (item.type === "folder") {
                  navigateToFolder(item.id, item.name)
                } else if (item.url) {
                  window.open(item.url, "_blank")
                }
              }}
            >
              <div className="col-span-6 flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-md mr-3",
                    item.type === "folder" ? "bg-blue-900 text-blue-400" : "bg-gray-800",
                  )}
                >
                  {getFileIcon(item.type)}
                </div>
                <span className="truncate">{item.name}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span>Me</span>
                {item.shared && <Users className="ml-1 h-4 w-4 text-gray-400" />}
              </div>
              <div className="col-span-3">{item.modified}</div>
              <div className="col-span-1 flex items-center justify-between">
                <span>{item.size || "--"}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-800">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-white">
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">Share</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">Download</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">Rename</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">Move to</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-gray-800 focus:bg-gray-800">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
