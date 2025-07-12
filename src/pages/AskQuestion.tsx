import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { RichTextEditor } from "@/components/RichTextEditor";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Send } from "lucide-react";

export const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a clear, descriptive title for your question.",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description required", 
        description: "Please describe your question in detail.",
        variant: "destructive",
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Tags required",
        description: "Please add at least one relevant tag to help others find your question.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Question posted!",
        description: "Your question has been successfully posted to the community.",
      });
      
      // Redirect to questions list
      navigate("/");
    } catch (error) {
      toast({
        title: "Error posting question",
        description: "There was an error posting your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // Save to localStorage for now
    localStorage.setItem('questionDraft', JSON.stringify({
      title,
      description,
      tags,
      savedAt: new Date().toISOString()
    }));
    
    toast({
      title: "Draft saved",
      description: "Your question has been saved as a draft.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-heading">
              Ask a Question
            </CardTitle>
            <CardDescription>
              Get help from the community by asking a clear, well-structured question.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Question Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., How to implement authentication in React?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                  maxLength={200}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Be specific and descriptive</span>
                  <span>{title.length}/200</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Question Description *
                </Label>
                <RichTextEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe your question in detail. Include what you've tried, what you expected to happen, and what actually happened."
                />
                <p className="text-xs text-muted-foreground">
                  Include code snippets, error messages, and relevant context to help others understand your question.
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm font-medium">
                  Tags * 
                </Label>
                <TagInput
                  tags={tags}
                  onTagsChange={setTags}
                  placeholder="Add relevant tags (e.g., react, typescript)"
                  maxTags={5}
                />
              </div>

              {/* Guidelines */}
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-medium text-sm mb-2">Writing Guidelines:</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Write a clear, specific title that summarizes your problem</li>
                  <li>• Explain what you've tried and what didn't work</li>
                  <li>• Include relevant code snippets and error messages</li>
                  <li>• Add tags to help others find and answer your question</li>
                  <li>• Be respectful and follow community guidelines</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="order-2 sm:order-1"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                
                <div className="flex gap-3 order-1 sm:order-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="accent"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      "Posting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Post Question
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};