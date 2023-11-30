import { useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';

const UseAsset = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const userEmail = user?.email;
  const { refetch, data: asset = [] , isPending} = useQuery({
    queryKey: ['asset', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/addAsset?email=${userEmail}`)
 
      return res.data;
    },
  });



  return [refetch, asset, isPending];
};

export default UseAsset;
