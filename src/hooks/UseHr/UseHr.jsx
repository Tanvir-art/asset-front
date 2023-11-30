import React, { useContext } from 'react'
import useAxiosPublic from '../useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';

const UseHr = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const userEmail = user?.email;
    console.log(userEmail)
    const {  data: hr = [] } = useQuery({
        queryKey: ['hr', userEmail],
        queryFn: async () => {
            if (!userEmail) {
                throw new Error('User email is missing.');
            }
    
            const res = await axiosPublic.get(`/admin?email=${userEmail}`);
            return res.data;
        },
      });

    return [hr]
}

export default UseHr
