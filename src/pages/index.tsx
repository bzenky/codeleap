import { usePostStore } from "@/store/posts"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  const username = usePostStore(state => state.username)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push('/blog')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#DDDDDD]">
      <form
        className="max-w-[500px] w-[94%] p-6 bg-white border border-gray-[#CCCCCC] rounded-2xl"
        onSubmit={(event) => handleLogin(event)}
      >
        <h1 className="text-[22px] font-bold mb-6">
          Welcome to CodeLeap network!
        </h1>

        <div className="flex flex-col">
          <label htmlFor="username" className="text-base" >
            Please enter your username
          </label>

          <input type="text"
            className='w-full h-8 text-sm px-3 border border-[#777777] rounded-lg mt-2 mb-4'
            id='username'
            placeholder='John Doe'
            value={username}
            onChange={(e) => usePostStore.setState({ username: e.target.value })}
          />

          <button
            className="w-[111px] h-[32px] bg-[#7695EC] text-white font-bold rounded-lg uppercase ml-auto hover:bg-[#5d7eda] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            disabled={username.trim().length === 0}
          >
            Enter
          </button>
        </div>
      </form>
    </main>
  )
}
