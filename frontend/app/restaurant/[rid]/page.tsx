'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Page() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const rid = searchParams.get('rid') // Get the 'rid' parameter

    return (
        <div>
        <p>Path: {pathname}</p>
        <p>RID: {rid || 'No RID provided'}</p>
        </div>
    )
}
