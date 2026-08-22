import { useEffect, useState } from "react";
import { getExpiringSoonMembers } from "../../api/dashboardapi"

const useExpiringMembers = () => {

    const [expiredMembers, setExpiredMembers] = useState([]);


    const fetchExpiringMembers = async () => {

        try {

            const res = await getExpiringSoonMembers();

            setExpiredMembers(res.data);

        } catch (err) {

            console.log(err);

        }

    };


    useEffect(() => {

        fetchExpiringMembers();

    }, []);


    return {

        expiredMembers,

        fetchExpiringMembers,

    };

};

export default useExpiringMembers;