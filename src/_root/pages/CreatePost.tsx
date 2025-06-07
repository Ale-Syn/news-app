import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <div className="flex flex-col gap-1">
            <h2 className="h3-bold md:h2-bold text-[#1A1A1A]">
              Crear Noticia
              <div className="h-1 w-20 bg-[#BB1919] rounded-full"></div>
            </h2>
          </div>
        </div>

        <div className="w-full max-w-5xl bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <PostForm action="Crear" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
