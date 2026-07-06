

'use client'

const Header = ({ onReset }: { onReset?: () => void }) => {
    return (
        <div>
            <div className="flex items-center justify-between border-2 border-[#3d3d3d] rounded-xl pb-4 m-2 mb-1 bg-[#232222] mt-2 z-[99]">
                <h1 className="text-xl font-bold px-4">Code Arena</h1>

                <button
                    className="p-2 m-4 border-2 rounded-xl hover:bg-white hover:text-black transition"
                    onClick={onReset}
                >
                    Reset Layout
                </button>
            </div>
        </div>
    )
}

export default Header;