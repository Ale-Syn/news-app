import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/sign-in");
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-[#1A1A1A]">
          Crear cuenta nueva
        </h2>
        <p className="text-[#4A4A4A] small-medium md:base-regular mt-2">
          Para usar esta aplicación, por favor ingrese sus datos.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-[#1A1A1A]">Nombre</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-[#C70000]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-[#1A1A1A]">Nombre de usuario</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-[#C70000]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-[#1A1A1A]">Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-[#C70000]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-[#1A1A1A]">Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-[#C70000]" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary bg-[#BB1919] hover:bg-[#A51717]">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Cargando...
              </div>
            ) : (
              "Registrarse"
            )}
          </Button>

          <p className="text-small-regular text-[#4A4A4A] text-center mt-2">
            Ya tienes una cuenta?
            <Link
              to="/sign-in"
              className="text-[#BB1919] hover:text-[#A51717] text-small-semibold ml-1">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
