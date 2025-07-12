import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { VoteButtons } from "@/components/VoteButtons";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Clock, Edit, Flag, Share, Bookmark } from "lucide-react";

// Mock data
const mockQuestion = {
  id: "1",
  title: "How to implement authentication in React with TypeScript?",
  description: `<p>I'm building a React application with TypeScript and need to implement user authentication. I've been looking into different approaches but I'm not sure which one is the best practice.</p>

<p><strong>What I need:</strong></p>
<ul>
<li>Login and logout functionality</li>
<li>Protected routes</li>
<li>JWT token management</li>
<li>Persistent sessions</li>
</ul>

<p><strong>What I've tried:</strong></p>
<p>I started with a simple useState approach but realized it won't work for protected routes. I also looked at Context API but I'm concerned about performance.</p>

<p>Any suggestions or code examples would be greatly appreciated!</p>`,
  tags: ["react", "typescript", "authentication", "security"],
  author: "sarah_dev",
  votes: 42,
  views: 1234,
  timeAgo: "2 hours ago",
  userVote: null as 'up' | 'down' | null,
};

const mockAnswers = [
  {
    id: "1",
    content: `<p>I recommend using a combination of React Context and JWT tokens. Here's a clean approach:</p>

<p><strong>1. Create an Auth Context:</strong></p>
<pre><code>const AuthContext = createContext&lt;AuthContextType | null&gt;(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState&lt;User | null&gt;(null);
  const [loading, setLoading] = useState(true);

  // Auth methods here...
  
  return (
    &lt;AuthContext.Provider value={{ user, login, logout, loading }}&gt;
      {children}
    &lt;/AuthContext.Provider&gt;
  );
};</code></pre>

<p><strong>2. Protected Route Component:</strong></p>
<pre><code>const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  if (!user) return &lt;Navigate to="/login" replace /&gt;;
  
  return &lt;&gt;{children}&lt;/&gt;;
};</code></pre>

<p>This approach gives you type safety with TypeScript and keeps your auth logic centralized.</p>`,
    author: "react_expert",
    votes: 28,
    timeAgo: "1 hour ago",
    isAccepted: true,
    userVote: null as 'up' | 'down' | null,
  },
  {
    id: "2", 
    content: `<p>Another great option is to use a library like <code>react-query</code> or <code>swr</code> along with your auth system. This gives you automatic token refresh and better state management.</p>

<p>Here's a simple hook pattern:</p>
<pre><code>const useAuth = () => {
  const { data: user, mutate } = useSWR('/api/user', fetcher);
  
  const login = async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    mutate(response.data.user);
  };
  
  return { user, login, logout };
};</code></pre>

<p>The advantage is automatic revalidation and better error handling.</p>`,
    author: "full_stack_dev",
    votes: 15,
    timeAgo: "30 minutes ago",
    isAccepted: false,
    userVote: null as 'up' | 'down' | null,
  }
];

export const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(mockQuestion);
  const [answers, setAnswers] = useState(mockAnswers);
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleQuestionVote = (type: 'up' | 'down') => {
    const newVote = question.userVote === type ? null : type;
    const voteChange = newVote === 'up' ? 1 : newVote === 'down' ? -1 : 0;
    const oldVoteChange = question.userVote === 'up' ? -1 : question.userVote === 'down' ? 1 : 0;
    
    setQuestion(prev => ({
      ...prev,
      votes: prev.votes + voteChange + oldVoteChange,
      userVote: newVote
    }));
  };

  const handleAnswerVote = (answerId: string, type: 'up' | 'down') => {
    setAnswers(prev => prev.map(answer => {
      if (answer.id === answerId) {
        const newVote = answer.userVote === type ? null : type;
        const voteChange = newVote === 'up' ? 1 : newVote === 'down' ? -1 : 0;
        const oldVoteChange = answer.userVote === 'up' ? -1 : answer.userVote === 'down' ? 1 : 0;
        
        return {
          ...answer,
          votes: answer.votes + voteChange + oldVoteChange,
          userVote: newVote
        };
      }
      return answer;
    }));
  };

  const handleAcceptAnswer = (answerId: string) => {
    setAnswers(prev => prev.map(answer => ({
      ...answer,
      isAccepted: answer.id === answerId ? !answer.isAccepted : false
    })));
    
    toast({
      title: "Answer accepted",
      description: "You've marked this answer as the accepted solution.",
    });
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAnswer.trim()) {
      toast({
        title: "Answer required",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const answer = {
        id: String(answers.length + 1),
        content: newAnswer,
        author: "current_user",
        votes: 0,
        timeAgo: "just now",
        isAccepted: false,
        userVote: null as 'up' | 'down' | null,
      };

      setAnswers(prev => [...prev, answer]);
      setNewAnswer("");
      
      toast({
        title: "Answer posted!",
        description: "Your answer has been posted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error posting answer",
        description: "There was an error posting your answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Voting */}
                  <VoteButtons
                    votes={question.votes}
                    userVote={question.userVote}
                    onVote={handleQuestionVote}
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold font-heading text-foreground mb-4">
                      {question.title}
                    </h1>
                    
                    <div 
                      className="prose prose-sm max-w-none text-foreground mb-6"
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Question Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{question.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>asked {question.timeAgo}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {question.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{question.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {answers.length} Answer{answers.length !== 1 ? 's' : ''}
              </h2>
              
              <div className="space-y-6">
                {answers.map((answer) => (
                  <Card key={answer.id} className={`shadow-card ${answer.isAccepted ? 'ring-2 ring-success' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Voting */}
                        <VoteButtons
                          votes={answer.votes}
                          userVote={answer.userVote}
                          onVote={(type) => handleAnswerVote(answer.id, type)}
                          isAccepted={answer.isAccepted}
                          canAccept={true} // In real app, check if current user is question author
                          onAccept={() => handleAcceptAnswer(answer.id)}
                        />

                        {/* Content */}
                        <div className="flex-1">
                          {answer.isAccepted && (
                            <div className="mb-3">
                              <Badge variant="outline" className="text-success border-success">
                                ✓ Accepted Answer
                              </Badge>
                            </div>
                          )}
                          
                          <div 
                            className="prose prose-sm max-w-none text-foreground mb-4"
                            dangerouslySetInnerHTML={{ __html: answer.content }}
                          />

                          {/* Answer Meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>answered {answer.timeAgo}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {answer.author.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-foreground">{answer.author}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Answer Form */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
                
                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="answer">
                      Please provide a detailed answer
                    </Label>
                    <RichTextEditor
                      value={newAnswer}
                      onChange={setNewAnswer}
                      placeholder="Write your answer here. Include code examples, explanations, and relevant details..."
                    />
                  </div>
                  
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Tips for a great answer:</strong> Be specific, include code examples, 
                      explain your reasoning, and make sure your solution addresses the question.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    variant="accent"
                    disabled={isSubmitting}
                    className="min-w-[140px]"
                  >
                    {isSubmitting ? "Posting..." : "Post Your Answer"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Question Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asked</span>
                  <span>{question.timeAgo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Viewed</span>
                  <span>{question.views.toLocaleString()} times</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active</span>
                  <span>1 hour ago</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Related Questions</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-primary hover:underline">
                  React authentication best practices
                </a>
                <a href="#" className="block text-primary hover:underline">
                  JWT token management in React
                </a>
                <a href="#" className="block text-primary hover:underline">
                  Protected routes with TypeScript
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};