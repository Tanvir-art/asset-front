import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UseMyEmployee = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const userEmail = user?.email;
    console.log(userEmail)
    const {  data: myEmployee = [], refetch } = useQuery({
        queryKey: ['myEmployee', userEmail],
        queryFn: async () => {
            if (!userEmail) {
                throw new Error('User email is missing.');
            }
    
            const res = await axiosPublic.get(`/myEmployee?hrEmail=${userEmail}`);
            return res.data;
        },
      });

    return [myEmployee, refetch]
}

export default UseMyEmployee
