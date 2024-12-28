import AdminAuthForm from "@/feature/admin/auth/components/admin-auth-form";

const AdminAuthPage = () => {
    return (
        <section
            className={
                "w-dvw h-dvh md:w-screen md:h-screen flex items-center justify-center bg-[#f0f0f0]"
            }
        >
            <AdminAuthForm />
        </section>
    );
};

export default AdminAuthPage;
