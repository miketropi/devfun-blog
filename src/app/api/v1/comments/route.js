import { NextResponse } from 'next/server';

// get comments
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 10;
  const order = searchParams.get('order') || 'desc';
  const orderBy = searchParams.get('orderBy') || 'date';
  const parent = searchParams.get('parent') || 0;

  const queryParams = new URLSearchParams({
    post: postId,
    page,
    per_page: perPage,
    order,
    orderby: orderBy,
    parent: parent
  });

  const comments = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp/v2/comments?${queryParams}`);
  const totalComments = comments.headers.get('X-WP-Total');
  const totalPages = comments.headers.get('X-WP-TotalPages');
  const commentsData = await comments.json();

  return NextResponse.json({
    comments: commentsData,
    totalComments: parseInt(totalComments),
    totalPages: parseInt(totalPages)
  });
}