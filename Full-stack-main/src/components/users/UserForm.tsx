import { useState, useEffect } from "react";
import { User, CreateUserData } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserFormProps {
  user?: User | null;
  onSave: (userData: CreateUserData) => void;
  onCancel: () => void;
  className?: string;
}

export const UserForm = ({ user, onSave, onCancel, className }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUserData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        address: { ...user.address }
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.address.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.address.zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    }

    if (!formData.address.geo.lat.trim()) {
      newErrors.lat = "Latitude is required";
    }

    if (!formData.address.geo.lng.trim()) {
      newErrors.lng = "Longitude is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const updateFormData = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      if (addressField === "lat" || addressField === "lng") {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            geo: {
              ...prev.address.geo,
              [addressField]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [addressField]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className={cn("shadow-medium border-border/50", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            {user ? "Edit User" : "Add New User"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="hover:bg-muted transition-fast"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className={cn(errors.name && "border-destructive focus:border-destructive")}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={cn(errors.email && "border-destructive focus:border-destructive")}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className={cn(errors.phone && "border-destructive focus:border-destructive")}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData("company", e.target.value)}
                  className={cn(errors.company && "border-destructive focus:border-destructive")}
                  placeholder="Enter company name"
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Address Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => updateFormData("address.street", e.target.value)}
                  className={cn(errors.street && "border-destructive focus:border-destructive")}
                  placeholder="Enter street address"
                />
                {errors.street && (
                  <p className="text-sm text-destructive">{errors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => updateFormData("address.city", e.target.value)}
                    className={cn(errors.city && "border-destructive focus:border-destructive")}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipcode">Zipcode *</Label>
                  <Input
                    id="zipcode"
                    value={formData.address.zipcode}
                    onChange={(e) => updateFormData("address.zipcode", e.target.value)}
                    className={cn(errors.zipcode && "border-destructive focus:border-destructive")}
                    placeholder="Enter zipcode"
                  />
                  {errors.zipcode && (
                    <p className="text-sm text-destructive">{errors.zipcode}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude *</Label>
                  <Input
                    id="lat"
                    value={formData.address.geo.lat}
                    onChange={(e) => updateFormData("address.lat", e.target.value)}
                    className={cn(errors.lat && "border-destructive focus:border-destructive")}
                    placeholder="Enter latitude"
                  />
                  {errors.lat && (
                    <p className="text-sm text-destructive">{errors.lat}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude *</Label>
                  <Input
                    id="lng"
                    value={formData.address.geo.lng}
                    onChange={(e) => updateFormData("address.lng", e.target.value)}
                    className={cn(errors.lng && "border-destructive focus:border-destructive")}
                    placeholder="Enter longitude"
                  />
                  {errors.lng && (
                    <p className="text-sm text-destructive">{errors.lng}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="hover:bg-muted transition-fast"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="dashboard-gradient hover:opacity-90 transition-fast shadow-soft"
            >
              <Save className="w-4 h-4 mr-2" />
              {user ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};