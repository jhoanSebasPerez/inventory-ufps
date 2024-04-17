import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="w-screen h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] sm:flex sm:justify-center sm:align-center">
      <div className="flex items-center justify-center py-20">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inicio Sesión</h1>
            <p className="text-balance text-muted-foreground">
              Ingresa con tu código y contraseña
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="codigo">Código</Label>
              <Input id="codigo" type="text" placeholder="1234567" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="button" className="w-full">
              <Link href="/admin/dashboard">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block 50vw">
        <Image
          src="/bg-builder.jpg"
          width={1920}
          height={2000}
          alt="background ufps"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
      </div>
  );
}
