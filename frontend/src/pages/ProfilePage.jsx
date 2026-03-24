import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <NavigationBar />
      <div className="flex justify-center">
        <p>{user.username}</p>
      </div>
    </>
  )
}
