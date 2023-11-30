import React, { useContext } from 'react'
import useAxiosPublic from '../useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';

const useEmployee = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const userEmail = user?.email;
    console.log(userEmail)
    const {  data: myemploye = [], refetch } = useQuery({
        queryKey: ['myEmployee', userEmail],
        queryFn: async () => {
            if (!userEmail) {
                throw new Error('User email is missing.');
            }
    
            const res = await axiosPublic.get(`/myemployee?email=${userEmail}`);
            return res.data;
        },
      });

    return [myemploye, refetch]
}

export default useEmployee
