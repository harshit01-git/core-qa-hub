import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, User, Plus } from "lucide-react";
import { Input } from "./ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl font-bold font-heading text-foreground">
            StackIt
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-10 bg-muted/50 border-border focus:bg-background"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="accent" size="sm" asChild>
            <Link to="/ask">
              <Plus className="h-4 w-4" />
              Ask Question
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">
              <User className="h-4 w-4" />
              Login
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link to="/register">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};