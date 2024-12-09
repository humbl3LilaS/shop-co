"use client"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Edit} from "lucide-react";

const ProfileEditSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild={true}>
                <Button className={"ml-auto rounded-3xl"}>
                    <span className={"max-sm:hidden"}>Edit</span>
                    <Edit/>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Edit your profile to set default billing information
                    </SheetDescription>
                </SheetHeader>
                Edit form
            </SheetContent>
        </Sheet>
    );
};

export default ProfileEditSheet;