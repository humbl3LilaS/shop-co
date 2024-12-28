"use client";
import { usePathname, useRouter } from "next/navigation";
import ActionButton from "@/components/share/action-button";

const RedirectBtn = () => {
    const pathname = usePathname();
    const isAdminDashboard = pathname.startsWith("/admin");
    const router = useRouter();
    return (
        <ActionButton
            className={"mx-auto mt-4"}
            onClick={() => {
                router.push(isAdminDashboard ? "/admin/dashboard/overview" : "/");
            }}
            pendingLabel={"Redirecting"}
        >
            Back to home
        </ActionButton>
    );
};

export default RedirectBtn;
