import axios from "axios";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { BiCopy, BiLoader } from "react-icons/bi"

export default function Home() {
  const [script, setScript] = React.useState<string>("")
  const [videoDescription, setVideoDescription] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)

  const onGenerateScript = async () => {
    if (!videoDescription) {
      toast.error("Describe your video")
      return
    }

    setLoading(true)

    await axios.post("/api/generate-script", { "video_description": videoDescription.trim() }).then(response => {
      if (!response) return
      console.log(response.data)
      setScript(response.data)
    }).catch(error => {
      console.log(error)
    })

    setLoading(false)
  }

  const handleCopyScript = () => {
    navigator.clipboard.writeText(script)
    toast.success("Copied to clipboard! 🚀")
  }

  return (
    <>
      <Toaster />
      <main className="p-5 max-w-6xl m-auto">
        <h1 className="font-medium text-2xl">AI Video Script Generator</h1>
        <textarea value={videoDescription} onChange={event => setVideoDescription(event.target.value)} placeholder="What is your video about...?" className="w-full outline-none border p-2 rounded-md h-[150px]"></textarea>
        <div className="flex items-center gap-5 py-5">
          <button disabled={loading} onClick={onGenerateScript}>Generate script</button>
          {loading && <BiLoader size={30} />}
        </div>
        {script && <div>
          <textarea onChange={event => setScript(event.target.value)} value={script} className="w-full outline-none border p-2 rounded-md h-[550px]"></textarea>
          <BiCopy className="cursor-pointer active:scale-95" size={30} onClick={handleCopyScript} />
        </div>}
      </main>
    </>
  );
}
