'use client'

import { Item } from "@/app/(main)/_components/Item"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { FileIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

interface DocumentListprops {
    parentDoucmentId?: Id<'documents'>
    level?: number
    data?: Doc<'documents'>[]
}

export const DocumentList = ({ parentDoucmentId, level = 0}: DocumentListprops) => {

    const params = useParams()
    const router = useRouter()
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    }

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDoucmentId
    })

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)

        if (documents == undefined) {
            return (
                <>
                    <Item.Skeleton level={level} />
                    {level === 0 && (
                        <>
                            <Item.Skeleton level={level} />
                            <Item.Skeleton level={level} />
                        </>
                    )}
                </>
            )
        }
    }
    return (
        <>
            <p style={{ paddingLeft: level ? `${(level * 12) + 25}px` : '12px'}} className={cn('hidden text-sm font-medium text-muted-foreground/80', expanded && 'last:block', level === 0 && 'hidden')}>
                No pages inside
            </p>
            {documents?.map((document) => (
                <div key={document._id}>
                    <Item id={document._id} onClick={() => onRedirect(document._id)} label={document.title} icon={FileIcon} level={level} documentIcon={document.icon} active={params.documentId === document._id} onExpand={() => onExpand(document._id)} expanded={expanded[document._id]} />
                    {expanded[document._id] && (
                        <DocumentList parentDoucmentId={document._id} level={level + 1} />
                    )}
                </div>
            ))}
        </>
    )
}