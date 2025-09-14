import { useState } from "react";
import { User, CreateUserData } from "@/types/user";
import { mockUsers } from "@/data/mockUsers";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserList } from "@/components/users/UserList";
import { UserForm } from "@/components/users/UserForm";
import { UserDetail } from "@/components/users/UserDetail";
import { Dashboard } from "@/components/pages/Dashboard";
import { Settings } from "@/components/pages/Settings";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "list" | "form" | "detail";
type PageMode = "dashboard" | "users" | "settings";

const Index = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentPage, setCurrentPage] = useState<PageMode>("dashboard");
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const generateId = () => {
    return Math.max(...users.map(u => parseInt(u.id)), 0) + 1;
  };

  const handleAddUser = () => {
    setCurrentPage("users");
    setSelectedUser(null);
    setCurrentView("form");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageMode);
    setCurrentView("list");
    setSelectedUser(null);
  };

  const handleNavigateToUsers = () => {
    setCurrentPage("users");
    setCurrentView("list");
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView("form");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView("detail");
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const userToDeleteData = users.find(u => u.id === userToDelete);
      setUsers(prev => prev.filter(user => user.id !== userToDelete));
      
      toast({
        title: "User deleted",
        description: `${userToDeleteData?.name} has been successfully deleted.`,
        variant: "default",
      });
      
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      
      // If we're viewing the deleted user, go back to list
      if (selectedUser?.id === userToDelete) {
        setCurrentView("list");
        setSelectedUser(null);
      }
    }
  };

  const handleSaveUser = (userData: CreateUserData) => {
    if (selectedUser) {
      // Update existing user
      const updatedUser: User = {
        ...selectedUser,
        ...userData,
        updatedAt: new Date().toISOString()
      };
      
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id ? updatedUser : user
      ));
      
      toast({
        title: "User updated",
        description: `${userData.name} has been successfully updated.`,
        variant: "default",
      });
    } else {
      // Create new user
      const newUser: User = {
        id: generateId().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUsers(prev => [newUser, ...prev]);
      
      toast({
        title: "User created",
        description: `${userData.name} has been successfully added.`,
        variant: "default",
      });
    }
    
    setCurrentView("list");
    setSelectedUser(null);
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedUser(null);
  };

  const renderCurrentView = () => {
    if (currentPage === "dashboard") {
      return (
        <Dashboard 
          userCount={users.length}
          onNavigateToUsers={handleNavigateToUsers}
          onAddUser={handleAddUser}
        />
      );
    }

    if (currentPage === "settings") {
      return <Settings />;
    }

    // Users page with different views
    switch (currentView) {
      case "form":
        return (
          <UserForm
            user={selectedUser}
            onSave={handleSaveUser}
            onCancel={handleBackToList}
          />
        );
      
      case "detail":
        return selectedUser ? (
          <UserDetail
            user={selectedUser}
            onBack={handleBackToList}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ) : null;
      
      default:
        return (
          <UserList
            users={users}
            searchQuery={searchQuery}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onViewUser={handleViewUser}
          />
        );
    }
  };

  return (
    <>
      <DashboardLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddUser={handleAddUser}
      >
        {renderCurrentView()}
      </DashboardLayout>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteUser}
        variant="destructive"
      />
    </>
  );
};

export default Index;
