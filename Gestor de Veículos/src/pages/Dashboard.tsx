import CadastrarVeiculoModalButton from "../components/Radix/Dialog"
import RelatorioHeader from "../components/Radix/Separator"
import { ResetIcon } from '@radix-ui/react-icons'
import { Link } from "react-router-dom"
import { Table } from "../components/Table"


export const Dashboard = () => {


  return (
      <div className="flex justify-center items-center h-screen">
        <main className="relative flex flex-col gap-12 max-w-4xl">
            <div className="flex w-full">
                <Link to="/" className="absolute right-0 top-0 rounded-md bg-green-400 p-2"><ResetIcon className="inline-block" /></Link>
                <RelatorioHeader />

                <CadastrarVeiculoModalButton />
            </div>
            

            <Table />
          
        </main>
      </div>
  )
}
