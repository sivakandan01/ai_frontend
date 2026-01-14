import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const useCurrentUser = () => {
    const user = useSelector((state: RootState) => state.user);
    return {
        user,
        userId: user.id || "",
        isAuth: user.isAuth,
        name: user.name,
        email: user.email,
        provider: user.provider,
        model: user.model,
    };
};
