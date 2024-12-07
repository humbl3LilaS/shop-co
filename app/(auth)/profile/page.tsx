import {auth} from "@/auth";
import {notFound, redirect} from "next/navigation";
import {getProfileData} from "@/feature/client/profile/actions/getProfileData";
import Container from "@/components/share/container";
import UserProfile from "@/feature/client/profile/components/user-profile";

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
        </Container>
    );
};

export default ProfilePage;