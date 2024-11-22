

type FooterSubNavProps = {
    data: {
        title: string;
        navItems: string[];
    }
}

const FooterSubNav = ({data}: FooterSubNavProps) => {
    return (
        <nav>
            <h3 className={"mb-4 font-bold uppercase"}>{data.title}</h3>
            <ul className={"flex flex-col gap-y-4"}>
                {
                    data.navItems.map((item) =>
                                          <li key={item} className={"text-black/60"}>
                                              {item}
                                          </li>
                    )
                }
            </ul>
        </nav>
    );
};

export default FooterSubNav;