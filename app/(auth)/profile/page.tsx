import {auth} from "@/auth";
import {notFound, redirect} from "next/navigation";
import {getProfileData} from "@/feature/client/profile/actions/getProfileData";
import Container from "@/components/share/container";
import UserProfile from "@/feature/client/profile/components/user-profile";
import PersonalInfo from "@/feature/client/profile/components/personal-info";
import BillingInfo from "@/feature/client/profile/components/billing-info";
import Link from "next/link";

const ProfilePage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/auth/sign-in")
    }
    const profile = await getProfileData(session.user.id);
    if (!profile) {
        notFound();
    }
    return (
        <Container className={"py-8"}>
            <UserProfile data={profile}/>
            <PersonalInfo data={profile}/>
            <BillingInfo data={profile}/>
            <Link
                href={"/profile/edit"}
                className={"block mt-4 py-3 bg-black text-white font-semibold text-center rounded-3xl"}
            >
                Edit Profile
            </Link>
        </Container>
    );
};

export default ProfilePage;