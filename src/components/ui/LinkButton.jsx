export default function LinkButton({ className, children, ...rest }) {
    return (
        <a
            className={`
                px-6 py-3 md:px-12 md:py-5 gap-2 
                bg-main text-white-light 
                uppercase font-bold text-sm md:text-lg 
                cursor-pointer rounded-[100px] no-underline tracking-wider
                transition-all duration-300 ease-out
                hover:!text-white-light hover:scale-105 hover:brightness-110 hover:shadow-[0_0_30px_rgba(2,62,138,0.6)]
                active:scale-100 active:brightness-100
                focus:outline-none focus:ring-4 focus:ring-main focus:ring-opacity-50 focus:scale-105
                motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus:scale-100
                ${className}
            `}
            {...rest}
        >
            {children}
        </a>
    )
}
