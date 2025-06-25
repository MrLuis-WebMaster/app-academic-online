import { FormData, FormErrors } from "@/hooks/useRegisterForm";

export function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
export function validateUserForm(data: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.fullName.trim()) {
        errors.fullName = "El nombre completo es requerido";
    } else if (data.fullName.trim().length < 2) {
        errors.fullName = "Debe tener al menos 2 caracteres";
    }

    if (!data.email.trim()) {
        errors.email = "Correo es requerido";
    } else if (!validateEmail(data.email)) {
        errors.email = "Correo inválido";
    }

    if (!data.password || data.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!data.acceptTerms) {
        errors.acceptTerms = "Debes aceptar los términos";
    }

    return errors;
}
