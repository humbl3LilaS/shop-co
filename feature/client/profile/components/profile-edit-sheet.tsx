"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { IUserInfo } from "@/types/api.types";
import ProfileEditForm from "@/feature/client/profile/components/profile-edit-form";
import { useEditProfileSheet } from "@/feature/client/profile/hooks/use-edit-profile-sheet";

const ProfileEditSheet = ({ data }: { data: IUserInfo }) => {
    const open = useEditProfileSheet((state) => state.isOpen);
    const setOpen = useEditProfileSheet((state) => state.setOpen);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild={true}>
                <Button className={"ml-auto rounded-3xl"}>
                    <span className={"max-sm:hidden"}>Edit</span>
                    <Edit />
                </Button>
            </SheetTrigger>
            <SheetContent className={"overflow-y-scroll"}>
                <SheetHeader className={"text-left"}>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Edit your profile to set default billing information
                    </SheetDescription>
                </SheetHeader>
                <ProfileEditForm defaultValues={data} />
            </SheetContent>
        </Sheet>
    );
};

export default ProfileEditSheet;
