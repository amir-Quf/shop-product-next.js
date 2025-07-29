import { NextRequest, NextResponse } from "next/server"

export const middleware = (request: NextRequest) => {

    const token = request.cookies.get('token')?.value
    if(token){
        return NextResponse.next()
    }
    const newURL = new URL(request.url)
    newURL.pathname = '/login'
    
    return NextResponse.redirect(newURL.toString())
}

export const config = {
    matcher: ["/dashboard/:path*"]
}