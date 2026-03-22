import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"

const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type SignInFormData = z.infer<typeof signinSchema>

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {register, handleSubmit, formState: { errors }} = useForm<SignInFormData>({
    resolver: zodResolver(signinSchema),
  })

  const {signIn} = useAuthStore()

  const navigate = useNavigate()

  const onSubmit = async(data: SignInFormData) => {
    const { username, password } = data
    await signIn(username, password)
    navigate("/")
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Header Logo */}
              <div className="flex flex-col items-center text-center gap-2">
               

                <h1 className="text-2xl font-bold">Sign In</h1>
                
              </div>

              
              {/* Username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">Username</Label>
                <Input id="username" type="text" placeholder="Username" {...register("username")} />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">Password</Label>
                <Input id="password" type="password" placeholder="Password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Button */}
              <Button
                type="submit"
                className="w-full"
              >
                Sign In
              </Button>

              <div className="text-center text-sm">
                Do not have an account?{" "}
                <a
                  href="/signup"
                  className="underline underline-offset-4"
                >
                  Create Account
                </a>
              </div>


            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
