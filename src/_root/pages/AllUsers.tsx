import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard, NoDataMessage } from "@/components/shared";
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return (
      <div className="common-container">
        <div className="user-container">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Todos los Usuarios
            <div className="h-1 w-20 bg-[#BB1919] rounded-full"></div>
          </h2>
          <NoDataMessage
            title="Error al cargar usuarios"
            message="Ha ocurrido un error al intentar cargar los usuarios"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">
          Todos los Usuarios
          <div className="h-1 w-20 bg-[#BB1919] rounded-full"></div>
        </h2>
        {isLoading && !creators ? (
          <Loader />
        ) : creators?.documents.length === 0 ? (
          <NoDataMessage
            title="No hay usuarios"
            message="No hay usuarios registrados en este momento"
          />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
