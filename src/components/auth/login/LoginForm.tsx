"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { validateEmail } from "@/lib/validators/userValidator";
import { LoginFormData } from "@/layers/domain/models/auth/Login";
import { login } from "@/lib/api/auth";

interface LoginErrors {
    email?: string;
    password?: string;
    general?: string;
}

export function LoginForm() {
    const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const emailFromQuery = searchParams.get("email");
        if (emailFromQuery) {
            setFormData((prev) => ({ ...prev, email: emailFromQuery }));
        }
    }, [searchParams]);

    const validateForm = (): LoginErrors => {
        const newErrors: LoginErrors = {};
        if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido";
        else if (!validateEmail(formData.email)) newErrors.email = "Correo inválido";
        if (!formData.password) newErrors.password = "La contraseña es requerida";
        else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
        return newErrors;
    };

    const handleChange = (field: keyof LoginFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const data = await login(formData)
            localStorage.setItem("user", JSON.stringify(data));
            // router.push("/academic");
            window.location.href = "/academic";

        } catch (error) {
            setErrors({ general: (error as Error).message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Iniciar Sesión</CardTitle>
                <CardDescription className="text-gray-600">Accede a tu cuenta para continuar aprendiendo</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {errors.general && (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700">{errors.general}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="tu@email.com"
                            disabled={isLoading}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                placeholder="Tu contraseña"
                                disabled={isLoading}
                                className={`${errors.password ? "border-red-500" : ""} pr-10`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember" type="checkbox" className="h-4 w-4 text-orange-600 border-gray-300 rounded" />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Recordar sesión</label>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Iniciando sesión...</> : "Iniciar Sesión"}
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                        ¿No tienes una cuenta? <Link href="/auth/register" className="text-orange-600 hover:underline font-medium">Regístrate</Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
