export default function LinkButton({ className, children, ...rest }) {
    return (
        <a
            className={`
                px-6 py-3 lg:px-12 min-w-[163px] min-h-[48px] md:min-w-[212px] md:min-h-[63px] text-center flex justify-center items-center
                border-1 border-white-light sm:border-none sm:bg-main text-white-light 
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
