import { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Globe,
  Calendar,
  User as UserIcon
} from "lucide-react";

interface UserDetailProps {
  user: User;
  onBack: () => void;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserDetail = ({ user, onBack, onEdit, onDelete }: UserDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-muted transition-fast"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
          <div className="h-6 w-px bg-border"></div>
          <h1 className="text-2xl font-bold text-foreground">User Details</h1>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onEdit(user)}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-fast"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit User
          </Button>
          <Button
            variant="outline"
            onClick={() => onDelete(user.id)}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-fast"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete User
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-2 surface-gradient shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 dashboard-gradient rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg md:col-span-2">
                  <Building className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{user.company}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Address Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Street Address</p>
                    <p className="font-medium">{user.address.street}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Latitude</p>
                      <p className="font-medium font-mono text-sm">{user.address.geo.lat}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Longitude</p>
                      <p className="font-medium font-mono text-sm">{user.address.geo.lng}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta Information */}
        <div className="space-y-6">
          <Card className="surface-gradient shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-success/10 text-success border-success/20">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">User ID</span>
                <span className="font-mono text-sm">{user.id}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="surface-gradient shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {new Date(user.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};