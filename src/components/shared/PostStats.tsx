import { Models } from "appwrite";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Share2, Facebook, Instagram, Link as LinkIcon } from "lucide-react";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save?.find(
    (record: Models.Document) => record?.post?.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/posts/${post.$id}`;
    navigator.clipboard.writeText(postUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShareFacebook = () => {
    const postUrl = `${window.location.origin}/posts/${post.$id}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
  };

  const handleShareInstagram = () => {
    const postUrl = `${window.location.origin}/posts/${post.$id}`;
    window.open(`https://www.instagram.com/`, '_blank');
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex gap-2">
        <div className="relative" ref={shareMenuRef}>
          <Share2
            className="w-5 h-5 cursor-pointer text-[#1A1A1A] hover:text-[#BB1919]"
            onClick={() => setIsShareOpen(!isShareOpen)}
          />
          {isShareOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E5] py-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center w-full px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5]">
                <LinkIcon className="w-4 h-4 mr-2" />
                {isCopied ? "Enlace copiado" : "Copiar enlace"}
              </button>
              <button
                onClick={handleShareFacebook}
                className="flex items-center w-full px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5]">
                <Facebook className="w-4 h-4 mr-2 text-[#1877F2]" />
                Compartir en Facebook
              </button>
              <button
                onClick={handleShareInstagram}
                className="flex items-center w-full px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5]">
                <Instagram className="w-4 h-4 mr-2 text-[#E4405F]" />
                Compartir en Instagram
              </button>
            </div>
          )}
        </div>
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};

export default PostStats;
