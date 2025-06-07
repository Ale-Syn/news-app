import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 letras." }),
  username: z.string().min(2, { message: "El nombre de usuario debe tener al menos 2 letras." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 letras." }),
  username: z.string().min(2, { message: "El nombre de usuario debe tener al menos 2 letras." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimo 5 letras." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "Este campo es requerido" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});
