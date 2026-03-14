import { useEffect, type ReactNode } from "react"
import { useMe } from "../../features/auth/hooks/useMe"
import { useAuthStore } from "../../store/auth.store"

type Props = {
  children: ReactNode;
};


const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((s) => s.setUser)
  const setAuthChecked = useAuthStore((s) => s.setAuthChecked)
  const { data, isLoading } = useMe()

  useEffect(() => {
    if (data) {
      setUser({
        id: data.id,
        role: data.role,
      })
    }
  }, [data])

  if (!isLoading) {
    setAuthChecked()
  }

  return <>{children}</>
}

export default AuthProvider;