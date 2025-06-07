import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { Loader, NoDataMessage } from "@/components/shared";
import { GridPostList, PostStats } from "@/components/shared";

import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  const handleRelatedPostClick = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Small delay to ensure smooth scroll starts before navigation
    setTimeout(() => {
      navigate(`/posts/${postId}`);
    }, 500);
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium text-[#1A1A1A]">Volver</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-[#1A1A1A]">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-[#666666]">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-[#E5E5E5]" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular text-[#1A1A1A]">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-[#BB1919] small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      {/* Related News Section */}
      <div className="w-full max-w-5xl mt-12">
        <div className="bg-[#F8F8F8] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-[#BB1919] rounded-full"></div>
            <h3 className="body-bold md:h3-bold text-[#1A1A1A]">
              Más Noticias Relacionadas
            </h3>
          </div>
          {isUserPostLoading || !relatedPosts ? (
            <Loader />
          ) : relatedPosts.length === 0 ? (
            <NoDataMessage
              title="No hay noticias relacionadas"
              message="No hay más noticias del mismo autor en este momento"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.$id} className="relative h-80">
                  <Link 
                    to={`/posts/${relatedPost.$id}`} 
                    className="grid-post_link"
                    onClick={(e) => handleRelatedPostClick(e, relatedPost.$id)}
                  >
                    <img
                      src={relatedPost.imageUrl}
                      alt="post"
                      className="h-full w-full object-cover rounded-xl"
                    />
                    <div className="absolute top-0 left-0 right-0 p-4">
                      <div className="flex flex-wrap gap-2">
                        {relatedPost.tags.map((tag: string, index: string) => (
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
                          {relatedPost.caption}
                        </h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <span>{relatedPost.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1A1A]/95 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            relatedPost.creator.imageUrl ||
                            "/assets/icons/profile-placeholder.svg"
                          }
                          alt="creator"
                          className="w-8 h-8 rounded-full border-2 border-[#BB1919]"
                        />
                        <p className="line-clamp-1 text-white font-medium">
                          {relatedPost.creator.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <PostStats post={relatedPost} userId={user.id} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
