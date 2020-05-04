type Xor<A, B> = (B & { [P in keyof A]?: never }) | (A & { [P in keyof B]?: never });

export default Xor;
