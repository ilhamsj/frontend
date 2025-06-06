import React from "react";
import Link from "next/link";
import { Post } from "@/interfaces/post";

interface Props {
  post: Post;
}

const BlogCard = ({ post }: Props) => {
  return (
    <div className="flex gap-4 items-start">
      <div
        style={{ width: "100px", height: "100px" }}
        className="flex items-center justify-center flex-shrink-0"
      ></div>

      <div className="flex flex-col gap-2">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-2xl font-bold">{post.title}</h3>
        </Link>
        <p className="text-sm text-gray-500">{post.excerpt}</p>
      </div>
    </div>
  );
};

export default BlogCard;
