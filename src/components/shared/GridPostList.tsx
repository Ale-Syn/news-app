import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  if (!posts) return null;

  return (
    <ul className="grid-container">
      {posts.map((post, index) => (
        <li key={post.$id || `post-${index}`} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 p-4">
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string, index: string) => (
                  <span
                    key={`${tag}${index}`}
                    className="text-xs text-white bg-[#BB1919]/90 px-2 py-1 rounded-full backdrop-blur-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-lg font-semibold line-clamp-2 mb-2">
                  {post.caption}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <span>{post.location}</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1A1A]/95 to-transparent">
            <div className="flex items-center justify-between">
              {showUser && (
                <div className="flex items-center gap-2">
                  <img
                    src={
                      post.creator?.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="w-8 h-8 rounded-full border-2 border-[#BB1919]"
                  />
                  <p className="line-clamp-1 text-white font-medium">{post.creator?.name}</p>
                </div>
              )}
              {showStats && (
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <PostStats post={post} userId={user.id} />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
