import { auth, signOut } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { getProfileData } from "@/feature/client/profile/actions/getProfileData";
import Container from "@/components/client/container";
import UserProfile from "@/feature/client/profile/components/user-profile";
import PersonalInfo from "@/feature/client/profile/components/personal-info";
import BillingInfo from "@/feature/client/profile/components/billing-info";
import Link from "next/link";
import CustomBreadcrumb from "@/components/client/custom-breadcrumb";
import ActionButton from "@/components/share/action-button";

const ProfilePage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/auth/sign-in");
    }
    const profile = await getProfileData(session.user.id);
    if (!profile) {
        notFound();
    }
    return (
        <Container className={"py-8"}>
            <CustomBreadcrumb />
            <UserProfile data={profile} />
            <PersonalInfo data={profile} />
            <BillingInfo data={profile} />
            <div className={"lg:flex items-center gap-x-4"}>
                <Link
                    href={"/transactions"}
                    className={
                        "block my-4 py-2 w-full border border-black/40 font-semibold text-center rounded-3xl lg:max-w-[260px]"
                    }
                >
                    See Transactions
                </Link>
                <ActionButton
                    className={"w-full bg-red-500 rounded-3xl lg:max-w-[260px]"}
                    onClick={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}
                    pendingLabel={"Logging Out"}
                >
                    Logout
                </ActionButton>
            </div>
        </Container>
    );
};

export default ProfilePage;
