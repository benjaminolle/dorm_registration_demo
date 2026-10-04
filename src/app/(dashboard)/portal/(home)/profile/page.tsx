import { getUserById } from "@/features/auth/actions/users";
import EditUsernameForm from "@/features/auth/components/UpdateUsernameForm";
import PortalPageHeader from "@/components/layout/PortalPageHeader";
import { auth } from "@/lib/auth";
import EditUserEmailForm from "@/features/auth/components/UpdateUserEmailForm";
import UpdatePasswordForm from "@/features/auth/components/UpdateUserPasswordForm";

export default async function ProfilePage() {
    const session = await auth();
    const userId = Number(session?.user?.id);
    const userInfo = await getUserById(userId);

    return (
        <div className="w-full">
            <PortalPageHeader title={"Profile Settings"} />
            <section className="w-full pt-10 px-0 gap-y-8">
                {/*Content Container*/}
                <div className="gap-y-10 bo-container px-(--section-px) ">

                    {/*Content*/}
                    <h2 className="text-(length:--heading-md)">Personal Information</h2>

                    <div className="xl:flex-row items-start gap-x-20 gap-y-8">
                        <div className="gap-y-8 w-full xl:pe-20 xl:border-r xl:border-gray-400 max-w-[500px]">
                            {/*Username*/}
                            <EditUsernameForm username={userInfo.username} />
                            {/*Email*/}
                            <EditUserEmailForm email={userInfo.email} />
                        </div>

                        <div className="gap-y-10 w-full max-w-[500px]">
                            {/*Password*/}
                            <UpdatePasswordForm />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}