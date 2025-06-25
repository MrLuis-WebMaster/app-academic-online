"use client";

import { useRegisterForm } from "@/hooks/useRegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        errors,
        isLoading,
        isSuccess,
    } = useRegisterForm();

    if (isSuccess) {
        return (
            <Card className="w-full max-w-md text-center p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Registro Exitoso!</h2>
                <p className="text-gray-600 mb-6">Serás redirigido en unos segundos...</p>
                <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm text-gray-500">Redirigiendo...</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Crear Cuenta</CardTitle>
                <CardDescription className="text-gray-600">
                    Únete a miles de estudiantes y comienza tu transformación profesional
                </CardDescription>
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
                        <Label htmlFor="fullName">Nombre completo *</Label>
                        <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="Ingresa tu nombre"
                            disabled={isLoading}
                            className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="tucorreo@email.com"
                            disabled={isLoading}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña *</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="••••••••"
                            disabled={isLoading}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>


                    <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="acceptTerms"
                                checked={formData.acceptTerms}
                                onCheckedChange={(value) => handleInputChange("acceptTerms", value as boolean)}
                                disabled={isLoading}
                                className={errors.acceptTerms ? "border-red-500 mt-1" : "mt-1"}
                            />
                            <Label htmlFor="acceptTerms" className="text-gray-700 leading-relaxed">
                                Acepto los{" "}
                                <Link href="/terms" className="text-orange-600 hover:underline">términos</Link> y la{" "}
                                <Link href="/privacy" className="text-orange-600 hover:underline">política de privacidad</Link>
                            </Label>
                        </div>
                        {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Registrando...
                            </>
                        ) : (
                            "Crear cuenta"
                        )}
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/auth/login" className="text-orange-600 hover:underline font-medium">Inicia sesión</Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
