import { useCreateMyHostel, useGetMyHostel, useUpdateMyHostel } from "../api/createHostelApi";
import UserHostelForm from "@/forms/user-hostel-form/UserHostelForm";

const UserHostelPage = () => {
    const { createHostel, isLoading: isCreateLoading } = useCreateMyHostel();

    const { updateHostel, isLoading: isUpdateLoading } = useUpdateMyHostel()

    const { hostel } = useGetMyHostel()

    const isEditing = !!hostel;

    return (
        <>
            <UserHostelForm hostel={hostel} onSave={isEditing ? updateHostel : createHostel} isLoading={isCreateLoading || isUpdateLoading} />
        </>
    );
};

export default UserHostelPage;
