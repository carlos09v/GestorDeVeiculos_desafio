import DialogDemo from "../components/Radix/Dialog"
import RelatorioHeader from "../components/Radix/Separator"
import { ResetIcon } from '@radix-ui/react-icons'
import { Link } from "react-router-dom"
import { Table } from "../components/Table"


export const Dashboard = () => {


  return (
        <main className="relative flex flex-col gap-8 m-auto max-w-4xl min-h-[70%] h-[50%]">
            <div className="flex gap-12">
                <Link to="/" className="absolute right-0 top-0 rounded-2xl bg-green-400 p-2"><ResetIcon className="inline-block" /></Link>
                <RelatorioHeader />

                <DialogDemo />
            </div>
            

            <Table />
          
        </main>
  )
}
