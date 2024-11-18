'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast, useToast } from "@/hooks/use-toast"
import { UUID } from 'crypto'

interface FoodItem {
  id: UUID;
  name: string;
  description: string;
  price: number;
}
// /api/menu/{mid}/add
async function addFoodToMenu(menuId: UUID, foodData: FoodItem) {
    const response = await fetch(`/api/menu/${menuId}/foods`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodData),
    });

    if (!response.ok) {
    throw new Error(`Error adding food: ${response.statusText}`);
    }

    return response.json(); 
}
// getFoodsInMenu.ts
export async function getFoodsInMenu(menuId: UUID) {
    const response = await fetch(`/api/menus/${menuId}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching foods: ${response.statusText}`);
    }
  
    return response.json();
}

// updateFoodInMenu.ts
export async function updateFoodInMenu(menuId: string, foodId: string, updatedFoodData: any) {
    const response = await fetch(`/api/menus/${menuId}/foods/${foodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFoodData),
    });
  
    if (!response.ok) {
      throw new Error(`Error updating food: ${response.statusText}`);
    }
  
    return response.json();
}


// deleteFoodFromMenu.ts
export async function deleteFoodFromMenu(menuId: string, foodId: string) {
    const response = await fetch(`/api/menus/${menuId}/foods/${foodId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`Error deleting food: ${response.statusText}`);
    }
  
    return response;
}
  
  
  





useEffect(()=>{
    // addFoodToMenu.ts
    
  
}, [])


export default function MenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<FoodItem | null>(null);
  const { toast } = useToast();

  const handleAddOrEditItem = (item: FoodItem) => {
    if (item.id) {
      setFoodItems(foodItems.map(i => i.id === item.id ? item : i));
      toast({
        title: "Item updated",
        description: `${item.name} has been updated successfully.`,
      });
    } else {
      const newItem = { ...item, id: Date.now() };
      setFoodItems([...foodItems, newItem]);
      toast({
        title: "Item added",
        description: `${newItem.name} has been added to the menu.`,
      });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The menu item has been removed.",
      variant: "destructive",
    });
  };

  const handleSave = () => {
    // Here you would typically save to a backend or local storage
    console.log("Saving menu:", foodItems);
    toast({
      title: "Menu saved",
      description: "Your menu has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Menu</h1>
        <div className="space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setCurrentItem(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{currentItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogDescription>
                  {currentItem ? 'Make changes to your menu item here.' : 'Add a new item to your menu here.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newItem = {
                  id: currentItem?.id || 0,
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  price: parseFloat(formData.get('price') as string),
                };
                handleAddOrEditItem(newItem);
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={currentItem?.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={currentItem?.description}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      defaultValue={currentItem?.price}
                      className="col-span-3"
                      step="0.01"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{currentItem ? 'Update' : 'Add'} Item</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Menu
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {foodItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                setCurrentItem(item);
                setIsDialogOpen(true);
              }}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteItem(item.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}