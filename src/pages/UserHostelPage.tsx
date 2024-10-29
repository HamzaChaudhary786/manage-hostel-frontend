import { useCreateMyHostel } from "../api/createHostelApi";
import UserHostelForm from "@/forms/user-hostel-form/UserHostelForm";

const UserHostelPage = () => {
    const { createHostel, isLoading } = useCreateMyHostel();

    return (
        <>
            <UserHostelForm onSave={createHostel} isLoading={isLoading} />
        </>
    );
};

export default UserHostelPage;
