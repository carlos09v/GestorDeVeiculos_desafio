import * as Separator from "@radix-ui/react-separator";

const RelatorioHeader = () => (
	<div className="mx-[15px] w-full max-w-[400px] text-black">
		<div className="text-2xl font-medium leading-5">
			Relatório de Veículos
		</div>
		<div className="leading-5 mt-2">
        Faça a atualização dos veículos disponíveis.
		</div>
		<Separator.Root className="my-[15px] bg-black data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
		<div className="flex h-5 items-center">
			<div className="text-[15px] leading-5">Blog</div>
			<Separator.Root
				className="mx-[15px] bg-black data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
				decorative
				orientation="vertical"
			/>
			<div className="text-[15px] leading-5">Docs</div>
			<Separator.Root
				className="mx-[15px] bg-black data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
				decorative
				orientation="vertical"
			/>
			<div className="text-[15px] leading-5">Source</div>
		</div>
	</div>
);

export default RelatorioHeader;
