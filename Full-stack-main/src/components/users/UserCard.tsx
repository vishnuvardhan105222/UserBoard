import { User } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, MapPin, Phone, Mail, Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onView?: (user: User) => void;
  className?: string;
}

export const UserCard = ({
  user,
  onEdit,
  onDelete,
  onView,
  className
}: UserCardProps) => {
  return (
    <Card className={cn("surface-gradient shadow-soft hover:shadow-medium transition-smooth border-border/50", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <button
              onClick={() => onView?.(user)}
              className="text-left group"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-fast">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(user)}
              className="hover:bg-primary/10 hover:text-primary transition-fast"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(user.id)}
              className="hover:bg-destructive/10 hover:text-destructive transition-fast"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{user.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4" />
            <span>{user.company}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{user.address.city}, {user.address.zipcode}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Created {new Date(user.createdAt).toLocaleDateString()}
            </Badge>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};