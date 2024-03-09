declare namespace IHeader {
    interface INavigation {
        slug: string;
        title: string;
        additionalClasses?: string;
        target?: string;
    }
}

export default IHeader;