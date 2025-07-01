import {Jost, Poppins} from "next/font/google"

export const jost = Jost({
    subsets:["latin"],
    display:"swap",
    weight:["200","300","400","700"],
    variable:"--font-jost",
})
export const poppins = Poppins({
    subsets:["latin"],
    display:"swap",
    weight:["200","300","400","700"],
    variable:"--font-poppins",
})
