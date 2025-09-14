import { User } from "@/types/user";
import { UserCard } from "./UserCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from "lucide-react";

interface UserListProps {
  users: User[];
  searchQuery: string;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onViewUser: (user: User) => void;
}

export const UserList = ({
  users,
  searchQuery,
  onEditUser,
  onDeleteUser,
  onViewUser,
}: UserListProps) => {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (users.length === 0) {
    return (
      <Card className="shadow-soft border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No users found
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Get started by adding your first user to the system.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredUsers.length === 0 && searchQuery) {
    return (
      <Card className="shadow-soft border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No results found
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Try adjusting your search terms or clear the search to see all users.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Users ({filteredUsers.length})
            {searchQuery && (
              <span className="text-sm font-normal text-muted-foreground">
                - searching for "{searchQuery}"
              </span>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
            onView={onViewUser}
          />
        ))}
      </div>
    </div>
  );
};