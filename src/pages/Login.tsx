// src/pages/Login.tsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- MODIFY THIS useState INITIALIZATION ---
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    password: string;
    role: "vendor" | "customer"; // Explicitly define the literal type here
  }>({
    fullName: "",
    email: "",
    password: "",
    role: "customer",
  });
  // --- END MODIFICATION ---

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (key: string, value: string) => {
    // This cast is safe because the Select component ensures 'value' is either 'vendor' or 'customer' for 'role' key
    setFormData((prev) => ({ ...prev, [key]: value as any }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        toast({ title: "Login Successful", description: "Welcome back!" });
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await register(
        formData.fullName,
        formData.email,
        formData.password,
        formData.role // This will now correctly be inferred as 'vendor' | 'customer'
      );
      if (success) {
        toast({
          title: "Registration Successful",
          description: "You can now sign in.",
        });
        setTab("signin");
      } else {
        setError("Registration failed");
      }
    } catch {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={tab}
              value={tab}
              onValueChange={(value: any) => setTab(value)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>

                  <div className="my-4 flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 text-sm text-muted-foreground">
                      or
                    </span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>
                  <div className="my-4 flex items-center">
                    <span className="mx-2 text-sm text-muted-foreground">
                      Continue with:
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[48%] flex items-center justify-center gap-2"
                      onClick={() => console.log("Login with Google")}
                    >
                      <img
                        src="/icons/google.jpg"
                        alt="Google"
                        className="h-5 w-5"
                      />
                      Google
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1 min-w-[48%] flex items-center justify-center gap-2"
                      onClick={() => console.log("Login with Apple")}
                    >
                      <img
                        src="/icons/apple.jpg"
                        alt="Apple"
                        className="h-5 w-5"
                      />
                      Apple
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => console.log("Login with GitHub")}
                    >
                      <img
                        src="/icons/github.jpg"
                        alt="GitHub"
                        className="h-5 w-5"
                      />
                      GitHub
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        handleInputChange("role", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                  <div className="my-4 flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 text-sm text-muted-foreground">
                      or
                    </span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>

                  <div className="my-4 flex items-center">
                    <span className="text-bold mx-2 text-sm text-muted-foreground">
                      Log In with:
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[48%] flex items-center justify-center gap-2"
                      onClick={() => console.log("Login with Google")}
                    >
                      <img
                        src="/icons/google.jpg"
                        alt="Google"
                        className="h-5 w-5"
                      />
                      Google
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1 min-w-[48%] flex items-center justify-center gap-2"
                      onClick={() => console.log("Login with Apple")}
                    >
                      <img
                        src="/icons/apple.jpg"
                        alt="Apple"
                        className="h-5 w-5"
                      />
                      Apple
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => console.log("Login with GitHub")}
                    >
                      <img
                        src="/icons/github.jpg"
                        alt="GitHub"
                        className="h-5 w-5"
                      />
                      GitHub
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            {/*<div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">Demo Credentials:</p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p><strong>Vendor:</strong> vendor@example.com / vendor123</p>
                <p><strong>Customer:</strong> customer@example.com / customer123</p>
              </div>
            </div>
            */}
            <div className="mt-6 text-left">
              <Link
                to="/"
                className="text-sm text-black text-primary hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
