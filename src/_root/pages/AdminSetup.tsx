import { useUserContext } from "@/context/AuthContext";
import { useUpdateUserRole } from "@/lib/react-query/queries";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminSetup = () => {
  const { user } = useUserContext();
  const { mutate: updateRole } = useUpdateUserRole();
  const navigate = useNavigate();

  const handleSetAdmin = () => {
    if (user.id) {
      updateRole(
        { userId: user.id, role: "admin" },
        {
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    }
  };

  return (
    <div className="flex-center w-full h-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="h1-bold text-light-1">Admin Setup</h1>
        <p className="text-light-4">Click the button below to set your role as admin</p>
        <Button onClick={handleSetAdmin}>Set as Admin</Button>
      </div>
    </div>
  );
};

export default AdminSetup; 