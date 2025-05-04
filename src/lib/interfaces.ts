export interface File {
    id: string
    name: string
    type: "file"
    url: string
    parent: string
    size: string
}

export type Folder = {
    id: string
    name: string
    type: "folder"
    parent: string | null
}