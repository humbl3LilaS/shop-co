/* typescript-eslint-disable no-implicit-any */
export type Writeable<T extends { [x: string]: any }, K extends string> = {
    [P in K]: T[P];
}