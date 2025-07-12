import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MessageSquare, ArrowUp, Eye, Clock } from "lucide-react";

interface QuestionCardProps {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  author: string;
  votes: number;
  answers: number;
  views: number;
  timeAgo: string;
  isAnswered?: boolean;
}

export const QuestionCard = ({
  id,
  title,
  excerpt,
  tags,
  author,
  votes,
  answers,
  views,
  timeAgo,
  isAnswered = false,
}: QuestionCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card transition-all duration-200 border-border">
      <div className="flex gap-4">
        {/* Vote/Stats */}
        <div className="flex flex-col items-center space-y-3 text-sm text-muted-foreground min-w-[80px]">
          <div className="flex items-center gap-1">
            <ArrowUp className="h-4 w-4" />
            <span className="font-medium">{votes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare 
              className={`h-4 w-4 ${isAnswered ? 'text-success' : ''}`} 
            />
            <span className={`font-medium ${isAnswered ? 'text-success' : ''}`}>
              {answers}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{views}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Link 
            to={`/questions/${id}`}
            className="block group"
          >
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {excerpt}
            </p>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className="text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author and Time */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>asked by <span className="text-foreground font-medium">{author}</span></span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};