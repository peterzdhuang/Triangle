'use client'

import Link from 'next/link'
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { Utensils, Bell, User, Plus, ChevronDown } from "lucide-react"
import { ModeToggle } from "@/components/component/dark-mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/component/footer'
import { TaskBar } from '@/components/component/taskbar'


export default function RestaurantHomePage() {
    const [error, setError] = useState(null);
    const searchParams = useSearchParams()
    const rid = searchParams.get('rid') // Get the 'rid' parameter
    const [name, setName ] = useState("");


    useEffect(() => {
        if (!rid) return; // Skip the effect if `rid` is not available
    
        const fetchEntity = async () => {
            try {
              // Retrieve the token from localStorage
              const accessToken = localStorage.getItem('token');
              console.log(accessToken);
              if (!accessToken) {
                throw new Error('Access token is missing. Please log in.');
              }
          
              const response = await fetch(`http://localhost:8080/api/${rid}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`, // Include the token in the Authorization header
                },
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();

              if (data) {
                const {
                    rid,
                    m_id,
                    name,
                    address,
                    city,
                    province,
                    country,
                    postalCode,
                  } = data;
                  setName(name);

              } else {
                console.error("Error");
              }
            } catch (err) {
              setError(err.message);
              console.error('Error fetching entity:', err);
            }
          };
          
    
        fetchEntity();
      }, [rid]); // Re-run the effect if `rid` changes

    return (
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <TaskBar/>
  
          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">{name}'s Dashboard</h1>
              <Button>
                Menu
              </Button>
            </div>
  
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Orders</CardTitle>
                  <CardDescription>Overview of today's order activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">42</div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">View Details</Button>
                </CardFooter>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Total revenue for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$1,234.56</div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">View Report</Button>
                </CardFooter>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                  <CardDescription>Most ordered items today</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>1. Margherita Pizza</li>
                    <li>2. Caesar Salad</li>
                    <li>3. Chicken Parmesan</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">View All</Button>
                </CardFooter>
              </Card>
            </div>
  
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { id: '1234', customer: 'Alice Johnson', total: '$45.00', status: 'Completed' },
                      { id: '1235', customer: 'Bob Smith', total: '$32.50', status: 'In Progress' },
                      { id: '1236', customer: 'Charlie Brown', total: '$78.25', status: 'Pending' },
                    ].map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
  
          <Footer/>
        </div>
      </ThemeProvider>
    )
}



