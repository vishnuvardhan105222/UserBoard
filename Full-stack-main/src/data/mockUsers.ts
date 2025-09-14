import { User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    company: "TechCorp Solutions",
    address: {
      street: "123 Tech Street",
      city: "San Francisco",
      zipcode: "94105",
      geo: {
        lat: "37.7749",
        lng: "-122.4194"
      }
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@designstudio.com",
    phone: "+1-555-0456",
    company: "Creative Design Studio",
    address: {
      street: "456 Design Ave",
      city: "New York",
      zipcode: "10001",
      geo: {
        lat: "40.7128",
        lng: "-74.0060"
      }
    },
    createdAt: "2024-01-14T14:22:00Z",
    updatedAt: "2024-01-14T14:22:00Z"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "m.johnson@consulting.org",
    phone: "+1-555-0789",
    company: "Business Consulting Group",
    address: {
      street: "789 Business Blvd",
      city: "Chicago",
      zipcode: "60601",
      geo: {
        lat: "41.8781",
        lng: "-87.6298"
      }
    },
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.w@marketing.com",
    phone: "+1-555-0321",
    company: "Digital Marketing Agency",
    address: {
      street: "321 Marketing Way",
      city: "Los Angeles",
      zipcode: "90210",
      geo: {
        lat: "34.0522",
        lng: "-118.2437"
      }
    },
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@fintech.io",
    phone: "+1-555-0654",
    company: "FinTech Innovations",
    address: {
      street: "654 Finance Plaza",
      city: "Boston",
      zipcode: "02108",
      geo: {
        lat: "42.3601",
        lng: "-71.0589"
      }
    },
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z"
  }
];