import {cn} from "@/lib/utils";

type ContainerProps = {
    className?: string;
    children: React.ReactNode;
}
const Container = ({children, className}: ContainerProps) => {
    return (
        <section className={cn("px-4 mb-12.5  md:px-10 lg:px-25 lg:mb-20 z-10", className)}>
            {children}
        </section>
    );
};

export default Container;