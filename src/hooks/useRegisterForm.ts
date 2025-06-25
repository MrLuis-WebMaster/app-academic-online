import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateUserForm } from "@/lib/validators/userValidator";

export interface FormData {
    fullName: string;
    email: string;
    password: string;
    acceptTerms: boolean;
}

export interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    acceptTerms?: string;
    general?: string;
}

export function useRegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
        acceptTerms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateUserForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Registration failed");
            setIsSuccess(true);

            setTimeout(() => router.push(`/auth/login/?registered=true&email=${formData.email}`), 2000);
        } catch (err) {
            setErrors({ general: (err as Error).message });
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleInputChange, handleSubmit, errors, isLoading, isSuccess };
}
