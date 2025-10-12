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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface LanguageSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (language: string) => void;
  currentLanguage: string;
}

export function LanguageSettingsDialog({ isOpen, onClose, onSave, currentLanguage }: LanguageSettingsDialogProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState(currentLanguage);

  const handleSave = () => {
    onSave(selectedLanguage);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Language Settings</AlertDialogTitle>
          <AlertDialogDescription>
            Select your preferred website language.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">
              Website Language
            </Label>
            <Select onValueChange={setSelectedLanguage} defaultValue={currentLanguage}>
              <SelectTrigger id="language" className="col-span-3">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">US English</SelectItem>
                {/* Add more languages here */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}