import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const file = request.body || '';
    const contentType = request.headers.get('content-type') || 'text/plain';
    const filename = `upload-${Date.now()}.${contentType.split('/')[1]}`;
    const blob = await put(filename, file, {
        contentType,
        access: 'public',
        allowOverwrite: true,
        cacheControlMaxAge: 0,
    });

    return NextResponse.json(blob);
}

