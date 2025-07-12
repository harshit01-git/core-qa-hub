import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Star } from "lucide-react";

// Mock data for demo
const mockQuestions = [
  {
    id: "1",
    title: "How to implement authentication in React with TypeScript?",
    excerpt: "I'm building a React application with TypeScript and need to implement user authentication. What are the best practices for handling login, logout, and protected routes?",
    tags: ["react", "typescript", "authentication", "security"],
    author: "sarah_dev",
    votes: 42,
    answers: 7,
    views: 1234,
    timeAgo: "2 hours ago",
    isAnswered: true,
  },
  {
    id: "2", 
    title: "Best way to handle state management in large React applications?",
    excerpt: "I'm working on a large-scale React application and struggling with state management. Should I use Redux, Zustand, or Context API?",
    tags: ["react", "state-management", "redux", "zustand"],
    author: "john_smith",
    votes: 28,
    answers: 12,
    views: 856,
    timeAgo: "4 hours ago",
    isAnswered: false,
  },
  {
    id: "3",
    title: "How to optimize React performance for large lists?",
    excerpt: "My React app renders thousands of items in a list and it's becoming very slow. What are the best techniques for optimizing performance?",
    tags: ["react", "performance", "optimization", "virtualization"],
    author: "alex_code",
    votes: 67,
    answers: 15,
    views: 2341,
    timeAgo: "1 day ago",
    isAnswered: true,
  },
  {
    id: "4",
    title: "TypeScript generic constraints with React components",
    excerpt: "I'm trying to create a generic React component with TypeScript but having trouble with type constraints. How can I properly constrain generic types?",
    tags: ["typescript", "react", "generics", "types"],
    author: "typescript_ninja",
    votes: 15,
    answers: 3,
    views: 432,
    timeAgo: "3 days ago",
    isAnswered: false,
  }
];

export const Questions = () => {
  const [sortBy, setSortBy] = useState("newest");

  const sortedQuestions = [...mockQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "answers":
        return b.answers - a.answers;
      case "newest":
      default:
        return 0; // For demo, keeping original order
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
              All Questions
            </h1>
            <p className="text-muted-foreground">
              {mockQuestions.length} questions found
            </p>
          </div>
          
          <Button variant="accent" asChild>
            <a href="/ask">Ask Question</a>
          </Button>
        </div>

        {/* Sorting Tabs */}
        <Tabs value={sortBy} onValueChange={setSortBy} className="mb-6">
          <TabsList className="grid w-full max-w-[400px] grid-cols-3">
            <TabsTrigger value="newest" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Newest
            </TabsTrigger>
            <TabsTrigger value="votes" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Most Votes
            </TabsTrigger>
            <TabsTrigger value="answers" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Most Answers
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Questions List */}
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline">
            Load More Questions
          </Button>
        </div>
      </div>
    </div>
  );
};