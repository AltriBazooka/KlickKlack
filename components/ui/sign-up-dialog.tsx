"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { X } from "lucide-react"

interface SignUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpDialog({ isOpen, onClose }: SignUpDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Signup</AlertDialogTitle>
          <AlertDialogDescription>
            Don't lose your progress! Sign up on Typing.com for free and:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
        <div className="grid gap-4 py-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Sign up with Google
          </Button>
          <Button className="w-full bg-black hover:bg-gray-800 text-white">
            Sign up with Microsoft
          </Button>
          <div className="flex items-center justify-center text-sm text-gray-500">
            OR
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username *</Label>
            <Input id="username" placeholder="" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password *</Label>
            <Input id="password" type="password" placeholder="" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I am 13 years of age or older and agree to the{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline" onClick={onClose}>Privacy Policy</Link> and{" "}
              <Link href="/terms-of-service" className="text-blue-600 hover:underline" onClick={onClose}>Terms of Service</Link>, or am being
              directed to sign up by an adult who has agreed to the{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline" onClick={onClose}>Privacy Policy</Link> and{" "}
              <Link href="/terms-of-service" className="text-blue-600 hover:underline" onClick={onClose}>Terms of Service</Link>.
            </label>
          </div>
        </div>
        <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
          </div>
          <AlertDialogAction asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Sign Up</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}