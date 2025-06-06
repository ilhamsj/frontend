import { searchPosts } from "@/api/post";
import { Post } from "@/interfaces/post";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const posts = await searchPosts({ slug });

  if (!posts.hits.length) return notFound();

  return (
    <div className="container mx-auto py-6">
      <PostDetail post={posts.hits[0]} />
    </div>
  );
};

const PostDetail = ({ post }: { post: Post }) => {
  return <div>{post.title}</div>;
};

export default page;
