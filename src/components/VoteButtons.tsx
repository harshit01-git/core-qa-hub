import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowUp, ArrowDown, Check } from "lucide-react";

interface VoteButtonsProps {
  votes: number;
  userVote?: 'up' | 'down' | null;
  onVote: (type: 'up' | 'down') => void;
  isAccepted?: boolean;
  canAccept?: boolean;
  onAccept?: () => void;
  orientation?: 'vertical' | 'horizontal';
}

export const VoteButtons = ({
  votes,
  userVote = null,
  onVote,
  isAccepted = false,
  canAccept = false,
  onAccept,
  orientation = 'vertical'
}: VoteButtonsProps) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: 'up' | 'down') => {
    if (isVoting) return;
    setIsVoting(true);
    await onVote(type);
    setIsVoting(false);
  };

  const containerClass = orientation === 'vertical' 
    ? "flex flex-col items-center space-y-2" 
    : "flex items-center space-x-2";

  return (
    <div className={containerClass}>
      {/* Upvote Button */}
      <Button
        variant="vote"
        size="icon"
        onClick={() => handleVote('up')}
        disabled={isVoting}
        className={`
          ${userVote === 'up' ? 'bg-accent text-accent-foreground' : ''}
          hover:scale-105 transition-transform
        `}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>

      {/* Vote Count */}
      <span className={`
        font-bold text-lg
        ${userVote === 'up' ? 'text-accent' : ''}
        ${userVote === 'down' ? 'text-destructive' : ''}
        ${!userVote ? 'text-foreground' : ''}
      `}>
        {votes}
      </span>

      {/* Downvote Button */}
      <Button
        variant="vote"
        size="icon"
        onClick={() => handleVote('down')}
        disabled={isVoting}
        className={`
          ${userVote === 'down' ? 'bg-destructive text-destructive-foreground' : ''}
          hover:scale-105 transition-transform
        `}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>

      {/* Accept Answer Button (only for question owners) */}
      {canAccept && onAccept && (
        <Button
          variant={isAccepted ? "success" : "vote"}
          size="icon"
          onClick={onAccept}
          className={`
            mt-2 
            ${isAccepted ? 'bg-success text-success-foreground' : ''}
            hover:scale-105 transition-transform
          `}
          title={isAccepted ? "Accepted Answer" : "Accept this answer"}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};