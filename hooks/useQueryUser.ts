import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'

export const useQueryUser = () => {
  const router = useRouter()
  const getUser = async() => {
    const {data} = await axios.get<Omit<User, 'hashedPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    )
    return data
  }
  return useQuery<Omit<User, 'hashedPassword'>, Error>(
    ['user'],
    getUser, {
      onError: (err:any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          console.log('useQuery getUser error response', err.response)
          router.push('/')
        }
      }
    }
  )
}
